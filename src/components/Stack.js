import { Card, Form } from "react-bootstrap";

function Stack({ user, isLoading, handleStack }) {
  const stack = ["JS", "HTML", "CSS", "MongoDB", "Express", "NodeJS", "React"];

  return (
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
  );
}

export default Stack;
