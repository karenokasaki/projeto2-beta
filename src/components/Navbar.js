import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand as="div">
            <img
              alt=""
              src="https://avatars.githubusercontent.com/u/4854004?s=280&v=4"
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{" "}
            Ironhak Enap 92
          </Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
}

export default NavBar;
