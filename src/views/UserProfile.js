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

//account( id: "0x1904bfcb93edc9bf961eead2e5c0de81dcc1d37d")
let accountQuery = gql`
    query app ($idaa:String!) {
        account( id: $idaa )
        {
          id
          name
          avatar
        }
    }
`

function UserProfile(props) {
  console.log("idaa", props);
  console.log("idaa-search", props.location.search);

  let searchString = props.location.search.length > 6 ? props.location.search.substring(6) : "0x1904bfcb93edc9bf961eead2e5c0de81dcc1d37d";

  console.log("idaa-search-string", searchString);
  const { loading, error, data } = useQuery( accountQuery, { variables: { idaa: searchString }});
  console.log("data", data);

  if (error) return <div className="content">{error}</div>;
  if (loading) return <div className="content">Loading...</div>;

  return (
    <>
      <div className="content">
        <Row>
          <Col md="4"> 
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  {/* <a href="#pablo" onClick={(e) => e.preventDefault()}> */}
                    <img
                      alt="..."
                      className="avatar"
                      src={data.account.avatar}
                    />
                    <h5 className="title">{data.account.name}</h5>
                  {/* </a> */}
                  <p className="description">{data.account.id}</p>
                </div>
              </CardBody>
              {/* <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter> */}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
