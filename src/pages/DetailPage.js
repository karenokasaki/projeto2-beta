import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";

function DetailPage() {
  const { userID } = useParams();
  const navigate = useNavigate();

  const stack = ["JS", "HTML", "CSS", "MongoDB", "Express", "NodeJS", "React"];

  const [user, setUser] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({});
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  /*   const [task, setTask] = useState({
    assunto: "",
    progresso: "",
  }); */

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

  async function handleDelete() {
    try {
      await axios.delete(
        `https://ironrest.herokuapp.com/projeto2-teste-92/${userID}`
      );
      toast.success("Usuário deletado com sucesso!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado!");
    }
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
        clone.stack.splice(clone.stack.indexOf(e.target.name), 1);
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

  /* function handleTask(e) {
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  async function handleTaskSubmit(e) {
    try {
      await axios.put(
        `https://ironrest.herokuapp.com/projeto2-teste-92/${userID}`,
        task
      );
      toast.success("Task atualizada!");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado!");
    }
  } */

  return (
    <>
      <Container className="my-5">
        {!showForm && (
          <Card className="text-center my-3" bg="light">
            <Card.Header>
              <Card.Title>{user.nome}</Card.Title>
              <Card.Subtitle className="text-muted">
                Data de admissão: {user.dataAdmissao}
              </Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Text>Email: {user.email}</Card.Text>
                  <Card.Text>Telefone: {user.tel}</Card.Text>
                  <Card.Text>Departamento: {user.departamento}</Card.Text>
                </Col>
                <Col>
                  <Card.Text>Cargo: {user.cargo}</Card.Text>
                  <Card.Text></Card.Text>
                  <Card.Text>Status: {user.status}</Card.Text>
                  <Card.Text>
                    {user.active ? "Ativo na empresa" : "Não está ativo"}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-muted">
              <Row>
                <Col>
                  <Button variant="info" onClick={() => setShowForm(!showForm)}>
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
        )}

        {showForm && (
          <Card className="text-center my-3" bg="light">
            <Card.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Nome do funcionário</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Insira o nome completo do funcionário"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Data de admissão</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Insira o valor da remuneração mensal"
                        name="dataAdmissao"
                        value={form.dataAdmissao}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Número de telefone</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Insira o número de telefone para contato com DDD"
                        name="tel"
                        value={form.tel}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Endereço de e-mail</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Insira o endereço de e-mail válido para contato"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Remuneração por mês</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Insira o valor da remuneração mensal"
                        name="salario"
                        value={form.salario}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Departamento</Form.Label>
                      <Form.Select
                        name="departamento"
                        onChange={handleChange}
                        defaultValue={form.departamento}
                      >
                        <option>Selecione uma opção</option>
                        <option value="People">People</option>
                        <option value="Front-end">Front-end</option>
                        <option value="Back-end">Back-end</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Financeiro">Financeiro</option>
                        <option value="Marketing">Marketing</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Row>
                    <Col className="d-flex align-items-center justify-content-center">
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          label="Funcionário ativo na empresa"
                          name="active"
                          onChange={handleChange}
                          checked={form.active}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Row>
              </Form>
            </Card.Body>
            <Card.Footer className="bg-white">
              <Row>
                <Col>
                  <Button variant="info" onClick={() => setShowForm(false)}>
                    Voltar
                  </Button>
                </Col>
                <Col>
                  <Button variant="success" onClick={handleSubmit}>
                    Salvar Alterações
                  </Button>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        )}

        <Row>
          <Col className="col-4">
            <Card bg="light">
              <Card.Header>
                <Card.Title>Stack</Card.Title>
              </Card.Header>
              <Card.Body>
                {!isLoading &&
                  stack.map((element) => {
                    return (
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          label={element}
                          name={element}
                          onChange={handleStack}
                          checked={user.stack.includes(element)}
                        />
                      </Form.Group>
                    );
                  })}
              </Card.Body>
            </Card>
          </Col>
          <Col>
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
                  />
                  <Form.Range
                    min="0"
                    max="100"
                    step="10"
                    value={form.progresso}
                    onChange={handleChange}
                    name="progresso"
                  />
                </Form.Group>
                <Button onClick={handleSubmit}>Atualizar</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DetailPage;
