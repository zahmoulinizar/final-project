import React, { useState } from "react";
import {Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerItem } from "../redux/slice/authSlice";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function Register() {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const user = {userName, email, password, image};

  const registerHandler = () => {
    dispatch(registerItem(user));
    setUserName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Container fluid className="me-auto" style={{ width: '50rem' }}>
      <Form className="m-4 p-3" style={{ width: '25rem' , height:'25rem' ,  borderRadius:'8px'}} enctype="multipart/form-data">
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>userName</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter UserName"
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupImage">

        <Form.Label>Image</Form.Label>
        <Form.Control type="file" class="form-control-file" value={image} onChange={(e) => setImage(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="m-3" variant="primary" type="submit" onClick={registerHandler}>
          Sign Up
        </Button>
        <Link to="/login">Login</Link>
        </Form>
      </Container>
  );
}

export default Register;
