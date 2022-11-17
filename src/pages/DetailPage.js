import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Form,
  Offcanvas,
  ListGroup,
  Badge,
} from "react-bootstrap";
import toast from "react-hot-toast";
import UserCard from "../components/UserCard";
import EditUserForm from "../components/EditUserForm";
import Stack from "../components/Stack";

function DetailPage() {
  const { userID } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({});
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showOffCanva, setShowOffCanva] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(
        `https://ironrest.herokuapp.com/projeto2-teste-92/${userID}`
      );
      setIsLoading(false);
      setUser(response.data);
      setForm(response.data);
    }
    fetchUser();
  }, [reload, userID]);

  function handleChange(e) {
    if (e.target.name === "active") {
      setForm({ ...form, active: e.target.checked });
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const clone = { ...form };
      delete clone._id;

      await axios.put(
        `https://ironrest.herokuapp.com/projeto2-teste-92/${userID}`,
        clone
      );

      setReload(!reload);
      toast.success("Funcionário alterado com sucesso!");
      setShowForm(false);
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado!");
    }
  }

  async function handleStack(e) {
    try {
      let clone = { ...user };

      if (e.target.checked === true) {
        clone.stack.push(e.target.name);
      }

      if (e.target.checked === false) {
        const index = clone.stack.indexOf(e.target.name);
        clone.stack.splice(index, 1);
      }

      delete clone._id;

      await axios.put(
        `https://ironrest.herokuapp.com/projeto2-teste-92/${userID}`,
        clone
      );
      setReload(!reload);
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado!");
    }
  }

  async function handleStatus(e) {
    try {
      await axios.put(
        `https://ironrest.herokuapp.com/projeto2-teste-92/${userID}`,
        { status: e.target.value }
      );
      setReload(!reload);
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado!");
    }
  }

  async function handleTaskCompletada(e) {
    e.preventDefault();
    //checa se a task não está vazia
    if (!form.task) {
      return;
    }
    try {
      const clone = { ...user };
      delete clone._id;

      clone.taskCompletadas.push(clone.task);
      clone.task = "";
      clone.progresso = "";
      clone.status = "Disponível";

      await axios.put(
        `https://ironrest.herokuapp.com/projeto2-teste-92/${userID}`,
        clone
      );
      setReload(!reload);
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado!");
    }
  }

  async function handleDeleteTask(index) {
    try {
      let clone = { ...user };

      clone.taskCompletadas.splice(index, 1);

      delete clone._id;

      await axios.put(
        `https://ironrest.herokuapp.com/projeto2-teste-92/${userID}`,
        clone
      );
      setReload(!reload);
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado!");
    }
  }

  return (
    <>
      <Container className="my-5">
        {!showForm && (
          <UserCard
            user={user}
            showForm={showForm}
            setShowForm={setShowForm}
            userID={userID}
          />
        )}

        {showForm && (
          <EditUserForm
            form={form}
            setForm={setForm}
            setShowForm={setShowForm}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}

        <Row>
          <Col className="col-4">
            <Stack
              isLoading={isLoading}
              user={user}
              handleStack={handleStack}
            />
          </Col>
          <Col>
            {/* STATUS */}
            <Card bg="light">
              <Card.Header>
                <Card.Title>Status</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  {!isLoading && (
                    <Form.Select
                      name="status"
                      onChange={handleStatus}
                      defaultValue={form.status}
                    >
                      <option>Selecione uma opção</option>
                      <option value="Disponível">Disponível</option>
                      <option value="Alocado">Alocado</option>
                      <option value="De Férias">De férias</option>
                      <option value="De Licença">De Licença</option>
                    </Form.Select>
                  )}
                </Form.Group>
              </Card.Body>
            </Card>

            {/* TASK */}
            <Card bg="light mt-3">
              <Card.Header>
                <Card.Title>Task</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Escreva qual a task em que você está trabalhando"
                    name="task"
                    value={form.task}
                    onChange={handleChange}
                    className="mb-3"
                  />
                  <Form.Range
                    min="0"
                    max="100"
                    value={form.progresso}
                    onChange={handleChange}
                    name="progresso"
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Button onClick={handleSubmit} variant="outline-info">
                      Atualizar Task
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={handleTaskCompletada}
                      variant="outline-success"
                    >
                      Concluir Task
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => setShowOffCanva(true)}
                      variant="outline-dark"
                    >
                      Tasks Finalizadas{" "}
                      <Badge bg="secondary">
                        {user.taskCompletadas && user.taskCompletadas.length}
                      </Badge>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Offcanvas
        show={showOffCanva}
        onHide={() => setShowOffCanva(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tarefas Completas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            {!isLoading &&
              user.taskCompletadas
                .map((task, index) => {
                  return (
                    <ListGroup.Item className="d-flex justify-content-between">
                      {task}
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDeleteTask(index)}
                      >
                        x
                      </Button>
                    </ListGroup.Item>
                  );
                })
                .reverse()}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default DetailPage;
