/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

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

import gql from 'graphql-tag';
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { decodeProto, TYPES } from "../protobuf/protobufDecoder"
import { parseInput } from "../protobuf/hexUtils"

let deviceQuery = gql`
  query app($idaa: String!) {
    deviceRecords(
      where: { operator: $idaa }
      first: 20
      skip: 0
      orderBy: timestamp
      orderDirection: desc
    )
    {
      operator
      id
      timestamp
      signature
      raw
      imei
      gas
      realGas
    }
  }
`

function TypeToString(typeInt)
{
  let valueType = "";
  if (typeInt === TYPES.VARINT) {
    valueType = "VARINT"
  } else if (typeInt === TYPES.STRING) {
    valueType = "STRING"
  } else if (typeInt === TYPES.FIXED32) {
    valueType = "FIXED32"
  } else if (typeInt === TYPES.FIXED64) {
    valueType = "FIXED64"
  } else {
    valueType = "UNKNOWN"
  }
  return valueType
}

function PartsDisplay(props) {
  console.log(props.parts);
  //props.id} : Type:{valueType} {props.part} 
  return (<Col md="12">
    <Row><Col md="4">Index</Col><Col md="4">Type</Col><Col md="4">Value</Col></Row>
  { props.parts.parts.map( (p) => { return (<Row><Col md="4">{p.index}</Col><Col md="4">{TypeToString(p.type)}</Col><Col md="4">{p.value}</Col></Row>) }) }
  </Col>);
} 

function DeviceProfile(props) {
  //http://localhost:3000/admin/device-profile?idaa=0x2319fb270317ed97132f6e35ce831544d93a3920
  //0x1904bfcb93edc9bf961eead2e5c0de81dcc1d37d
  const { idaa } = useParams();
  const [searchString, setSearchString] = React.useState("");
  const { loading, error, data } = useQuery( deviceQuery, { variables: { idaa: idaa }});
  console.log( "idaa", idaa );

  const onSubmit = e => {
    if (e.key == "Enter")
    {
      console.log("ss", searchString.target.value);
      console.log("enter pressed");
      window.location.assign("/admin/device-profile/" + searchString.target.value);
    } 
    return false;
  };

  if (error) return <div className="content">{error}</div>;
  if (loading) return <div className="content">Loading...</div>;

  if (data.deviceRecords == 0)
  {
    return (
      <div className="content">
        <div className="content">No Device Records Found...</div>
        <Input
        placeholder="Search a Account ID... (e.g 0x1904bfcb93edc9bf961eead2e5c0de81dcc1d37d)"
        type="text"
        value={searchString.value}
        onChange={setSearchString}
        id="idaa"
        name="idaa"
        onKeyDown={onSubmit}
      />
     </div>
    );
  }

  return (
    <>
      <div className="content">
      <Input
        placeholder="Search a Account ID... (e.g 0x1904bfcb93edc9bf961eead2e5c0de81dcc1d37d)"
        type="text"
        value={searchString.value}
        onChange={setSearchString}
        id="idaa"
        name="idaa"
        onKeyDown={onSubmit}
      />
      <br />
        { data.deviceRecords.map((dr) => { 
        // console.log("da", da);
        return (<div key={dr.id}>
          <Row>
          <Col md="8"> 
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <p className="description">operator: {dr.operator}</p>
                  <p className="description">id: {dr.id}</p>
                  <p className="description">imei: {dr.imei}</p>
                  <p className="description">timestamp: {dr.timestamp}</p>
                  <p className="description">raw: {dr.raw}</p>
                </div>
              </CardBody>
              </Card>
              </Col>
              <Col md="4">
              <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <PartsDisplay parts={decodeProto(parseInput(dr.raw))}></PartsDisplay>
                </div>
              </CardBody>
              </Card>
              </Col>
              </Row>
        </div>);
      }) }
      
      </div>
    </>
  );
}

export default DeviceProfile;
