import React from "react";
//import { Table } from "semantic-ui-react";
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
import { decodeProto, TYPES, typeToString } from "./protobufDecoder";
import { decodeFixed32, decodeFixed64 } from "./protobufPartDecoder";
import ProtobufDisplay from "./ProtobufDisplay";

function ProtobufVarintPart(props) {
  const { value } = props;

  return value;
}

function ProtobufStringPart(props) {
  const { value } = props;

  // TODO: Support repeated field

  const decoded = decodeProto(value);
  if (value.length > 0 && decoded.leftOver.length === 0) {
    return <ProtobufDisplay value={decoded} />;
  } else {
    return value.toString();
  }
}

function ProtobufFixed64Part(props) {
  const { value } = props;
  const decoded = decodeFixed64(value);

  return decoded.map(d => (
    <span>
      As {d.type}: {d.value}
      <br />
    </span>
  ));
}

function ProtobufFixed32Part(props) {
  const { value } = props;
  const decoded = decodeFixed32(value);

  return decoded.map(d => (
    <span>
      As {d.type}: {d.value}
      <br />
    </span>
  ));
}

function getProtobufPart(part) {
  switch (part.type) {
    case TYPES.VARINT:
      return <ProtobufVarintPart value={part.value} />;
    case TYPES.STRING:
      return <ProtobufStringPart value={part.value} />;
    case TYPES.FIXED64:
      return <ProtobufFixed64Part value={part.value} />;
    case TYPES.FIXED32:
      return <ProtobufFixed32Part value={part.value} />;
    default:
      return "Unknown type";
  }
}

function ProtobufPart(props) {
  const { part } = props;

  const stringType = typeToString(part.type);

  return (
    <Row>
      <Col>{part.index}</Col>
      <Col>{stringType}</Col>
      <Col>{getProtobufPart(part)}</Col>
    </Row>
  );
}

export default ProtobufPart;
