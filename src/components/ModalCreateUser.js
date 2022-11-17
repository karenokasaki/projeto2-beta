import { Button, Modal, Form, Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function ModalCreateUser({ setReload, reload }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    salario: "",
    email: "",
    tel: "",
    departamento: "",
    stack: [],
    dataAdmissao: "",
    active: true,
    cargo: "",
    task: "",
    progresso: "",
    foto: "",
    taskCompletadas: [],
  });

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
      await axios.post(
        "https://ironrest.herokuapp.com/projeto2-teste-92",
        form
      );
      setReload(!reload);
      setShowModal(false);
      setForm({
        nome: "",
        salario: "",
        email: "",
        tel: "",
        departamento: "",
        stack: [],
        dataAdmissao: "",
        active: true,
        cargo: "",
        task: "",
        progresso: "",
        foto: "",
        taskCompletadas: [],
      });
      toast.success("Funcionário criado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado. Por favor tente novamente!");
    }
  }

  console.log(form);

  return (
    <>
      <Button
        variant="success"
        onClick={() => setShowModal(!showModal)}
        className="mb-3"
      >
        + Cadastrar novo funcionário
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Formulário de Criação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Nome do funcionário</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Insira o nome completo do funcionário"
                    name="nome"
                    autoFocus
                    onChange={handleChange}
                    value={form.name}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Cargo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Insira o cargo do funcionário"
                    name="cargo"
                    onChange={handleChange}
                    value={form.cargo}
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
                    onChange={handleChange}
                    value={form.tel}
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
                    onChange={handleChange}
                    value={form.email}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Salário</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Insira o valor da remuneração mensal"
                    name="salario"
                    onChange={handleChange}
                    value={form.salario}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Departamento</Form.Label>
                  <Form.Select name="departamento" onChange={handleChange}>
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
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" onChange={handleChange}>
                    <option>Selecione uma opção</option>
                    <option value="Disponível">Disponível</option>
                    <option value="Alocado">Alocado</option>
                    <option value="De Férias">De férias</option>
                    <option value="De Licença">De Licença</option>
                  </Form.Select>
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
                <Form.Group className="mb-3">
                  <Form.Label>Foto</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Insira url da foto"
                    name="foto"
                    autoFocus
                    onChange={handleChange}
                    value={form.foto}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="mb-3 d-flex justify-content-between">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
          <Form.Group>
            <Form.Check
              name="active"
              type="checkbox"
              label="Funcionário ativo na empresa"
              checked={form.active}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="success" onClick={handleSubmit}>
            Criar novo funcionário
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateUser;
