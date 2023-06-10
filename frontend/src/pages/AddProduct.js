import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useDispatch } from "react-redux";
import { AddProd, deleteProd } from "../redux/slice/ProdSlice";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function AddProduct() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false);
  const product = { name, brand, desc, price, image };

  const [products, setProducts] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showProd, setShowProd] = useState(false);
  const [clikedId, setClickedId] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const handleProdClose = () => setShowProd(false);
  const handleProdShow = (id) => {
    setClickedId(id);
    setShowProd(true);
  };

  //add product

  const CreateProdHandler = () => {
    dispatch(AddProd(product));
    handleClose();
    setIsOpen(false);
  };
  // uplaod image
  const uploadHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage("");
    }
  };
  // getting all products
  function getProducts() {
    axios
      .get("http://localhost:5500/prod/allProd")
      .then((Response) => {
        setProducts(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getProducts();
    if (isOpen === false) {
      window.location.reload();
    }
  }, [isOpen]);

  // delete product
  const deleteProdHandler = (id) => {
    dispatch(deleteProd(id));
    setClickedId(id);
  };
  return (
    <Container className="mt-5 pt-5 d-flex flex-column align-items-start">
      <Button variant="primary" onClick={handleShow} className="mb-5">
        new product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product creating </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="product Name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="product Brand"
                autoFocus
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>description</Form.Label>
              <Form.Control
                type="text"
                placeholder="product Description"
                autoFocus
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="product price"
                autoFocus
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/"
                placeholder="product Brand"
                autoFocus
                onChange={uploadHandler}
              />
            </Form.Group>
            <img src={image} alt="" height={32} width={32} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={CreateProdHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Brand</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Update</th>
            <th>Delete</th>
            <th>view</th>
          </tr>
        </thead>
        {products.map((product, index) => (
          <tbody key={product._id}>
            <tr>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.desc}</td>
              <td>{product.price} $</td>
              <td>
                <img
                  src={product.image.url}
                  alt="product pic"
                  height="72"
                  loading="lazy"
                />
              </td>
              <td>
                <Button className="btn btn-secondary">Update</Button>
              </td>
              <td>
                <Button
                  className="btn btn-danger"
                  href="/newProduct"
                  onClick={() => deleteProdHandler(product._id)}
                >
                  Delete
                </Button>
              </td>
              <td>
                <>
                  <Link
                    variant="primary"
                    onClick={() => handleProdShow(product._id)}
                  >
                    View
                  </Link>

                  {product._id === clikedId && (
                    <Modal show={showProd} onHide={handleProdClose} size="xl">
                      <Modal.Header closeButton>
                        <Modal.Title>{product.name}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Card
                          size="xl"
                       
                        >
                          <Row>
                            <Col>
                              <Card.Img
                                variant="left"
                                src={product.image.url}
                                height={600}
                      
                              />
                            </Col>
                            <Col>
                              <Card.Body>
                                <Card.Text>Brand : {product.brand}</Card.Text>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.price} $</Card.Text>
                                <Card.Text>{product.desc}</Card.Text>
                              </Card.Body>
                            </Col>
                          </Row>
                        </Card>
                      </Modal.Body>
                    </Modal>
                  )}
                </>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </Container>
  );
}
