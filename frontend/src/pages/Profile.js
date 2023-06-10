import axios from 'axios';
import React, { useEffect, useState }  from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { updateUser } from '../redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import {Container} from 'react-bootstrap';


export default function Profile() {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [image ,setImage] = useState('')
  const [isEdit , setIsEdit] = useState(false)
  const user = {userName, password,image};
  const [users, setUsers] = useState([]);
  function getUsers() {
    axios
      .get("http://localhost:5500/user/Profile", {
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
  const  updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(user))
    setIsEdit(false)
    setUserName('')
    setPassword('')
    
  };
   const uploadHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    if(file){
      reader.readAsDataURL(file)
            reader.onloadend = () => {
              setImage(reader.result)
            }
    }else{
      setImage('')
    }
  }
 
  return (
   <Container className="mt-5 pt-5">
    <Card style={{ width: '25rem' }} className='me-auto'>
      <Card.Img variant="top" src={users.image?.secure_url} height={300} width={300} />
      <Card.Body>
        <Card.Title>Profile</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{users.userName}</ListGroup.Item>
        <ListGroup.Item>{users.email}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Button onClick={()=>setIsEdit(true)}>Update Profile</Button>
      </Card.Body>
      <div>
        {isEdit && (
          <Form className="m-4 p-3" style={{ width: '25rem' , height:'25rem' ,  borderRadius:'8px'}}>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>userName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter UserName"
              onChange={(e) => setUserName(e.target.value)}
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
          <Form.Group className="mb-3" controlId="formGroupImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept  = "image/"
              onChange={uploadHandler}
            />
          </Form.Group>
          <Button className="m-3" variant="primary" type="submit" onClick={updateHandler}>
            Edit
          </Button>
          </Form>
        )}
      </div>
    </Card>

   </Container>

)}
