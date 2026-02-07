import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./header/Header";
import { Col, Row } from "reactstrap";
import Sidebar from "./Sidebar";
import { SidebarContextProvider } from "../../context/provider/SidebarContextProvider";

type PropTypes = {
  showSidebar?: boolean;
};

const Layout = ({ showSidebar = true }: PropTypes) => {
  return (
    <SidebarContextProvider>
      <section className="vh-100 bg-primary-main">
        <Header showSidebar={showSidebar} />
        <div
          className="container-fluid p-0 overflow-hidden"
          style={{ height: "calc(100vh - 72px)" }}
        >
          <Row className="g-0 h-100">
            {showSidebar && (
              <Col sm="auto">
                <Sidebar />
              </Col>
            )}
            <Col className="h-100">
              <main className="p-lg-4 p-2  overflow-auto h-100">
                <Outlet />
              </main>
            </Col>
          </Row>
        </div>
        <ScrollRestoration />
      </section>
    </SidebarContextProvider>
  );
};

export default Layout;
