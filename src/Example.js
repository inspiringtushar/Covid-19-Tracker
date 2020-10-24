import React from "react";
import { Accordion, Button, Card } from "react-bootstrap";

function Example(props) {
  return (
    <div>
      <Accordion defaultActiveKey="a">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="a">
              Click me!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="a">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="b">
              Click me!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="b">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}

export default Example;
