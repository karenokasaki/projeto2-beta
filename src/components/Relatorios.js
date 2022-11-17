import { useState } from "react";
import { Card, Container, Nav, Row, Col, ListGroup } from "react-bootstrap";
import CustoHora from "./CustoHora";

function Relatorios({ users }) {
  const stack = ["JS", "HTML", "CSS", "MongoDB", "Express", "NodeJS", "React"];

  const [select, setSelect] = useState("");

  function handleClick(e) {
    setSelect(e.target.name);
  }

  return (
    <Container className="mb-5">
      <h2>Stack</h2>
      <Card>
        <Row>
          <Col>
            <Card.Header bg="dark">
              <Card.Title className="mb-0">
                <Nav fill justify variant="tabs">
                  {stack.map((element) => {
                    return (
                      <Nav.Item>
                        <Nav.Link
                          as="button"
                          name={element}
                          onClick={handleClick}
                        >
                          {element}
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })}
                </Nav>
              </Card.Title>
            </Card.Header>
          </Col>
        </Row>
        <Card.Footer>
          <ListGroup>
            {users &&
              users
                .filter((user) => user.stack.includes(select))
                .map((user) => {
                  return <CustoHora user={user} />;
                })}
          </ListGroup>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default Relatorios;
