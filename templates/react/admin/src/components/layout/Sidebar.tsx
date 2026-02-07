import { useContext, useEffect, useState } from "react";
import {
  FiBookOpen,
  FiChevronDown,
  FiChevronUp,
  FiUsers,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import { SidebarContext } from "../../context/SidebarContext";
import type { IconType } from "react-icons";

type INavItems = {
  label: string;
  Icon?: IconType;
  url?: string;
  children?: INavItems[];
};

// update this demo tabs with actual one & delete its routes also from routes.ts
// you can add upto N number of nested children
const navItems: INavItems[] = [
  {
    label: "Courses",
    Icon: FiBookOpen,
    children: [
      { url: "/courses/all", label: "All Courses", Icon: FiBookOpen },
      { url: "/courses/add", label: "Add Course", Icon: FiBookOpen },
    ],
  },
  {
    label: "Users",
    url: "/users",
    Icon: FiUsers,
  },
];

const Sidebar = () => {
  const { show, setShow } = useContext(SidebarContext);
  const [openMenu, setOpenMenu] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleResize = () => {
      setShow(window.innerWidth >= 992);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setShow]);

  const toggleMenu = (key: string, level: number) => {
    setOpenMenu((prev) => {
      const next = { ...prev };

      // Close all menus at the same level
      Object.keys(next).forEach((k) => {
        if (k.includes(`-${level}-`) && k !== key) {
          next[k] = false;
        }
      });

      // Toggle current menu
      next[key] = !prev[key];

      return next;
    });
  };

  const closeLevelMenus = (level: number) => {
    setOpenMenu((prev) => {
      const next = { ...prev };

      Object.keys(next).forEach((key) => {
        if (key.includes(`-${level}-`)) {
          next[key] = false;
        }
      });

      return next;
    });
  };

  const renderNavItems = (items: INavItems[], level = 0) =>
    items.map((item, index) => {
      const hasChildren = item.children?.length;
      const menuKey = `${item.label}-${level}-${index}`;

      return (
        <NavItem key={menuKey} className={`ms-${level * 3}`}>
          {hasChildren ? (
            <>
              <Nav
                className={`sidebar-link cursor-pointer ${openMenu[menuKey] && "active"}`}
                onClick={() => toggleMenu(menuKey, level)}
              >
                <div className="d-flex justify-content-between">
                  <div>
                    {item.Icon && <item.Icon className="me-3" />}
                    {item.label}
                  </div>
                  <span>
                    {openMenu[menuKey] ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
              </Nav>

              {openMenu[menuKey] && (
                <Nav className="d-block">
                  {renderNavItems(item.children!, level + 1)}
                </Nav>
              )}
            </>
          ) : (
            <NavLink
              to={item.url!}
              className="sidebar-link"
              onClick={() => closeLevelMenus(level)}
            >
              {item.Icon && <item.Icon className="me-3" />}
              {item.label}
            </NavLink>
          )}
        </NavItem>
      );
    });

  return (
    <section className={`sidebar ${show ? "show" : ""}`}>
      <Nav className="d-block">{renderNavItems(navItems)}</Nav>
    </section>
  );
};

export default Sidebar;
