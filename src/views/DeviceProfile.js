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

function DeviceProfile(props) {
  //http://localhost:3000/admin/device-profile?idaa=0x2319fb270317ed97132f6e35ce831544d93a3920
  let searchString = props.location.search.length > 6 ? props.location.search.substring(6) : "0x1904bfcb93edc9bf961eead2e5c0de81dcc1d37d";

  const { loading, error, data } = useQuery( deviceQuery, { variables: { idaa: searchString }});
  console.log( "data", data );

  if (error) return <div className="content">{error}</div>;
  if (loading) return <div className="content">Loading...</div>;

  if (data.deviceRecords == 0) return <div className="content">No Records Found...</div>;

  return (
    <>
      <div className="content">
        { data.deviceRecords.map((dr) => { 
        // console.log("da", da);
        return (<div key={dr.id}>
          <Row>
          <Col> 
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
                  {/* <p className="description">signature: {dr.signature}</p> */}
                  <p className="description">raw: {dr.raw}</p>
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
