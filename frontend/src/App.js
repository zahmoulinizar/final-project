// import "./App.css";
import Home from "./pages/home";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Forgetpass from "./pages/Forgetpass";
import Profile from "./pages/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./redux/slice/authSlice";
import GetAllUser from "./pages/GetAllUser";
import { Col, Row } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import AddProduct from "./pages/AddProduct";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  });
  return (
    <div className="">
      <Row>
        <Col sm={2} >
          <Sidebar />
        </Col>
        <Col>
          {" "}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Forget" element={<Forgetpass />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/allUsers" element={<GetAllUser />} />
            <Route path="/newProduct" element={<AddProduct/>} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
}

export default App;
