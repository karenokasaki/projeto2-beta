import { useNavigate } from "react-router-dom";

import axios from "axios";
import { Card, Row, Col, Button } from "react-bootstrap";
import toast from "react-hot-toast";

function UserCard(props) {
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      await axios.delete(
        `https://ironrest.herokuapp.com/projeto2-teste-92/${props.userID}`
      );
      toast.success("Usuário deletado com sucesso!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado!");
    }
  }

  return (
    <Card className="text-center my-3" bg="light">
      <Card.Header>
        <Card.Title>{props.user.nome}</Card.Title>
        <Card.Subtitle className="text-muted">
          Data de admissão: {props.user.dataAdmissao}
        </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Card.Text>Email: {props.user.email}</Card.Text>
            <Card.Text>Telefone: {props.user.tel}</Card.Text>
            <Card.Text>Departamento: {props.user.departamento}</Card.Text>
          </Col>
          <Col>
            <Card.Text>Cargo: {props.user.cargo}</Card.Text>
            <Card.Text></Card.Text>
            <Card.Text>Status: {props.user.status}</Card.Text>
            <Card.Text>
              {props.user.active ? "Ativo na empresa" : "Não está ativo"}
            </Card.Text>
          </Col>
          <Col className="col-2">
            <img
              src={props.user.foto}
              alt="perfil"
              height={110}
              style={{
                borderRadius: "15px",
              }}
            />
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Row>
          <Col>
            <Button
              variant="info"
              onClick={() => props.setShowForm(!props.showForm)}
            >
              Editar funcionário
            </Button>
          </Col>
          <Col>
            <Button variant="danger" onClick={handleDelete}>
              Excluir funcionário
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}

export default UserCard;
