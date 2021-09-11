import React, { Fragment } from "react";
import ProtobufPart from "./ProtobufPart";
//import { Table } from "semantic-ui-react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { bufferToPrettyHex } from "./hexUtils";

export function ProtobufDisplay(props) {
  const { value } = props;

  const parts = value.parts.map(part => {
    return <ProtobufPart part={part} />;
  });

  const leftOver = value.leftOver.length ? (
    <p>Left over bytes: {bufferToPrettyHex(value.leftOver)}</p>
  ) : null;

  return (
    <Row>
        <Row>
          <Row>
            <Col>Field Number</Col>
            <Col>Type</Col>
            <Col>Content</Col>
          </Row>
        </Row>

        <Row>{parts}</Row>
      {leftOver}
    </Row>
  );
}

export default ProtobufDisplay;
