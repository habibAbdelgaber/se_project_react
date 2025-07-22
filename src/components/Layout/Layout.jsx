import Page from "../Page/Page";
import Container from "../Container/Container";
import Navbar from "../Navbar/Navbar";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import "./Layout.css";

function Layout({ children, onOpen }) {
  return (
    <Page>
      <div className="layout">
        <Container>
          <Navbar onAddClothes={onOpen} />
          <Main>{children}</Main>
          <Footer />
        </Container>
      </div>
    </Page>
  );
}

export default Layout;
