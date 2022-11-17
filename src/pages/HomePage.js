import axios from "axios";
import { useState, useEffect } from "react";
import {
  Table,
  Container,
  Button,
  Form,
  ProgressBar,
  FloatingLabel,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalCreateUser from "../components/ModalCreateUser";
import Relatorios from "../components/Relatorios";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      const response = await axios.get(
        "https://ironrest.herokuapp.com/projeto2-teste-92"
      );
      setIsLoading(false);
      setUsers(response.data);
    }
    fetchUsers();
  }, [reload]);

  function handleChange(e) {
    setSearch(e.target.value);
  }

  return (
    <div>
      <h1 className="my-3">Dashboard</h1>

      <Container>
        <FloatingLabel
          controlId="floatingInput"
          label="Pesquise pelo Nome / Status / Cargo ou Departamento"
          className="mb-3"
        >
          <Form.Control
            placeholder="Pesquise pelo nome / status / cargo ou departamento"
            value={search}
            onChange={handleChange}
          />
        </FloatingLabel>

        <Table striped bordered hover variant="light-dark" className="mt-2">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Task</th>
              <th>Progresso</th>
              <th>Status</th>

              <th>Departamento</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              users
                .filter(
                  (user) =>
                    user.nome.toLowerCase().includes(search.toLowerCase()) ||
                    user.status.toLowerCase().includes(search.toLowerCase()) ||
                    user.departamento
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    user.cargo.toLowerCase().includes(search.toLowerCase())
                )
                .map((user) => {
                  return (
                    <tr className={user.active ? "" : "table-danger"}>
                      <td>{user.nome}</td>
                      <td>{user.task}</td>
                      <td>
                        <ProgressBar
                          now={user.progresso}
                          label={`${user.progresso}%`}
                          variant="info"
                          animated
                        />
                      </td>
                      <td>{user.status}</td>
                      <td>{user.departamento}</td>
                      <td>
                        <Link to={`/user/${user._id}`}>
                          <Button variant="info" size="sm">
                            Ver
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>

        <ModalCreateUser setReload={setReload} reload={reload} />

        <Relatorios users={users} />
      </Container>
    </div>
  );
}

export default HomePage;
