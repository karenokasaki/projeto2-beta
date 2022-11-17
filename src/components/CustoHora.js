import { useState } from "react";
import { Col, Form, InputGroup, ListGroup, Row } from "react-bootstrap";

function CustoHora(props) {
  const [custoHora, setCustoHora] = useState("");

  function handleMath(e) {
    setCustoHora(e.target.value);
  }
  return (
    <Row className="mb-1 align-items-center">
      <Col>
        <ListGroup.Item>
          {props.user.nome} - {props.user.cargo}
        </ListGroup.Item>
      </Col>
      <Col>
        <ListGroup.Item>
          <Row>
            <InputGroup>
              <InputGroup.Text>Horas desejadas</InputGroup.Text>
              <Form.Control value={custoHora} onChange={handleMath} />
              <InputGroup.Text>Custo R$</InputGroup.Text>
              <Form.Control
                value={
                  ((props.user.salario / 160) * custoHora).toFixed(0) + ",00"
                }
              />
            </InputGroup>
          </Row>
        </ListGroup.Item>
      </Col>
    </Row>
  );
}
export default CustoHora;
