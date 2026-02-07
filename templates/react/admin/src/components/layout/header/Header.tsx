import { useContext, useState } from "react";
import { FiAlignJustify, FiLogOut, FiUser } from "react-icons/fi";
import {
  Navbar,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Logo from "../Logo";
import { SidebarContext } from "../../../context/SidebarContext";
import { useAppDispatch } from "../../../hooks/redux";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../../services/authService";
import useUserResolver from "../../../resolvers/userResolver";
import { CustomSwal } from "../../../utils/CustomSwal";

type PropTypes = {
  showSidebar: boolean;
};

const Header = ({ showSidebar }: PropTypes) => {
  const { userData } = useUserResolver();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  authService.init(navigate, dispatch);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const { setShow } = useContext(SidebarContext);

  const handleLogout = async () => {
    const result = await CustomSwal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Do you want to logout?",
      confirmButtonText: "Logout",
    });
    if (result.isConfirmed) {
      authService.logout();
    }
  };

  return (
    <>
      <header className="container-fluid shadow py-2 position-sticky top-0 z-1 bg-primary-subtle">
        <Navbar>
          <div className="d-flex gap-3 align-items-center">
            {showSidebar && (
              <FiAlignJustify
                size={25}
                className="cursor-pointer d-block text-black-50"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
            <Logo />
          </div>
          <Nav className="align-items-center gap-2">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle
                caret={false}
                color="light"
                tag="span"
                className="cursor-pointer"
              >
                <img
                  src={userData?.image || "/images/avatar.png"}
                  width={40}
                  height={40}
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.onerror = null;
                    img.src = "/images/avatar.png";
                  }}
                  className="rounded-circle bg-warning object-fit-cover"
                />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  className="d-flex align-items-center border-bottom"
                  tag={Link}
                  to="/profile"
                >
                  <FiUser className="primary-orange me-2 fs-5" /> My Profile
                </DropdownItem>
                <DropdownItem
                  className="d-flex align-items-center"
                  onClick={handleLogout}
                >
                  <FiLogOut className="primary-orange me-2 fs-5" /> Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
