import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Container, Button, Form } from "react-bootstrap";
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
  console.log(users);
  return (
    <div>
      <h1 className="my-3">Dashboard</h1>

      <Container>
        <Form.Control
          placeholder="Pesquise pelo nome / status / cargo ou departamento"
          value={search}
          onChange={handleChange}
        />

        <Table striped bordered hover variant="light-dark">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Task</th>
              <th>%</th>
              <th>Status</th>
              <th>Cargo</th>
              <th>Departamento</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              users
                .filter(
                  (user) =>
                    user.nome
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase()) ||
                    user.status
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase()) ||
                    user.departamento
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase()) ||
                    user.cargo
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase())
                )
                .map((user) => {
                  return (
                    <tr className={user.active ? "" : "table-danger"}>
                      <td>{user.nome}</td>
                      <td>{user.task}</td>
                      <td>{user.progresso}</td>
                      <td>{user.status}</td>
                      <td>{user.cargo}</td>
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
      </Container>

      <ModalCreateUser setReload={setReload} reload={reload} />

      <Relatorios />
    </div>
  );
}

export default HomePage;
