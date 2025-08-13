import { Outlet } from "react-router-dom";
import Page from "../Page/Page";
import Container from "../Container/Container";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Layout.css";

function Layout({ onOpen, currentCity }) {
  return (
    <Page>
      <div className="layout">
        <Container>
          <Header onAddClothes={onOpen} currentCity={currentCity} />
          <main>
            <Outlet />
          </main>
          <Footer />
        </Container>
      </div>
    </Page>
  );
}

export default Layout;
