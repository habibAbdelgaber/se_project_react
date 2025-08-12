import { Outlet } from "react-router-dom";
import Page from "../Page/Page";
import Container from "../Container/Container";
import Navbar from "../Navbar/Navbar";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import "./Layout.css";

function Layout({ onOpen, currentCity }) {
  return (
    <Page>
      <div className="layout">
        <Container>
          <Navbar onAddClothes={onOpen} currentCity={currentCity} />
          <Main>
            <Outlet />
          </Main>
          <Footer />
        </Container>
      </div>
    </Page>
  );
}

export default Layout;
