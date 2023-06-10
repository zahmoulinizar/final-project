import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";

export default function GetAllUser() {
  const [users, setUsers] = useState([]);
  function getUsers() {
    axios
      .get("http://localhost:5500/user/allUsers", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((Response) => {
        setUsers(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getUsers();
  }, []);
  return (
      <Container>
      <ListGroup className="text-center bg-info">
        <h1>List of users</h1>
      </ListGroup>
      <ListGroup className=" my-2  p-3 bg-black text-white">
        <Row>
          <Col sm={1}>Index</Col>
          <Col sm={2}>UserName</Col>
          <Col sm={3}>Email</Col>
          <Col sm={2}>Phone</Col>
          <Col sm={2}>Role</Col>
          <Col sm={1}>image</Col>
        </Row>
      </ListGroup>

      {users.map((user, index) => (
        <ListGroup key={user._id} className="my-2 ">
          <ListGroup.Item className="bg-secondary">
            <Row>
              <Col className="text-center" sm={1}>
                {index + 1}
              </Col>
              <Col sm={2}>{user.userName}</Col>
              <Col  sm={3}>{user.email}</Col>
              <Col sm={2}>+216 52 368 662</Col>
              <Col sm={2}>{user.role}</Col>
              <Col sm={1}><img  src={user.image?.secure_url} alt=""  height="72" loading="lazy"/></Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      ))}
    </Container>
    
  );
}
