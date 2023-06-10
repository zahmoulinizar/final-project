import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginItem } from "../redux/slice/authSlice";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const user = {email, password };
  console.log(user)
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.isLogin) {navigate("/Profile")};
  }, [auth.isLogin, navigate]);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginItem(user));
    setEmail('')
    setPassword('')
  };
  return (
    <Container fluid className="me-auto" style={{ width: '50rem' }}>
      <Form className="m-4 p-3" style={{ width: '25rem' , height:'25rem' ,  borderRadius:'8px'}}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="m-3" variant="primary" type="submit" onClick={loginHandler}>
          Sign In
        </Button>
        <Link to="/forget" className="m-3">Forget Password</Link>
        <Link to="/register ">Register </Link>
      </Form>
      </Container>
 
            
  );
}
