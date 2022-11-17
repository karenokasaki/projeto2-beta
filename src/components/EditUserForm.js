import { Card, Row, Col, Button, Form } from "react-bootstrap";

function EditUserForm({
  form,
  setForm,
  setShowForm,
  handleChange,
  handleSubmit,
}) {
  return (
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
  );
}
export default EditUserForm;
