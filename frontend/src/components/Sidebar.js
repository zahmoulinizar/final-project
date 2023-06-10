import React from "react";
import { Link } from "react-router-dom";
import { Button, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutItem } from "../redux/slice/authSlice";
import profile from "../image/profile-icon-.jpg";

export default function Sidebar() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const username = useSelector((state) => state.auth.user?.userName);
  const userImg = useSelector((state) => state.auth.user?.image?.secure_url);
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutItem());
  };
  return (
    <header className="mb-14">
      <nav
        id="sidebarMenu"
        className="collapse d-lg-block sidebar collapse bg-white mt-4 pt-5 "
      >
        <div className="mt-4 border  border-bottom-4 justify-content-center flex-column align-items-center">
          <img src={userImg} alt="user pic" height="72" loading="lazy" />
          <h3>{username}</h3>
        </div>
        <div className="position-sticky">
          <div className="list-group list-group-flush mx-3 mt-4">
            <Link
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
            >
              <i className="fas fa-tachometer-alt fa-fw me-3"></i>
              <span>Main dashboard</span>
            </Link>
            <Link
              href="#"
              className="list-group-item list-group-item-action py-2 ripple active"
            >
              <i className="fas fa-chart-area fa-fw me-3"></i>
              <span>Webiste traffic</span>
            </Link>
            <Link
              to="/newProduct"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-lock fa-fw me-3"></i>
              <span>Products</span>
            </Link>
            <Link
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-chart-line fa-fw me-3"></i>
              <span>Analytics</span>
            </Link>
            <Link
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-chart-pie fa-fw me-3"></i>
              <span>SEO</span>
            </Link>
            <Link
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-chart-bar fa-fw me-3"></i>
              <span>Orders</span>
            </Link>
            <Link
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-globe fa-fw me-3"></i>
              <span>International</span>
            </Link>
            <Link
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-building fa-fw me-3"></i>
              <span>Partners</span>
            </Link>
            <Link
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-calendar fa-fw me-3"></i>
              <span>Calendar</span>
            </Link>
            <Link
              to="/allUsers"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-users fa-fw me-3"></i>
              <span>Users</span>
            </Link>
            <Link
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-money-bill fa-fw me-3"></i>
              <span>Sales</span>
            </Link>
          </div>
        </div>
      </nav>
      <nav
        id="main-navbar"
        className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">
            <img
              src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
              height="25"
              alt="MDB Logo"
              loading="lazy"
            />
          </Link>

          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="#">---------</Nav.Link>
            <Nav.Link href="#">---------</Nav.Link>
            <Nav.Link href="#">---------</Nav.Link>
            <Nav.Link href="#">---------</Nav.Link>
            <Nav.Link href="#">---------</Nav.Link>
            <Nav.Link href="#">---------</Nav.Link>
            <Nav.Link href="#">---------</Nav.Link>
            <Nav.Link href="#">---------</Nav.Link>
          </Nav>

          {auth.isLogin ? (
            <div className="navbar-nav ms-auto d-flex flex-row">
              <NavDropdown
                title={
                  <img
                    className="rounded-circle"
                    src={userImg}
                    alt="user pic"
                    height="32"
                    loading="lazy"
                  />
                }
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item className="dropdown-item" href="/Profile">
                  {username}
                </NavDropdown.Item>
                <NavDropdown.Item className="dropdown-item" href="/Profile">
                  My profile
                </NavDropdown.Item>
                <NavDropdown.Item className="dropdown-item" href="#">
                  Settings
                </NavDropdown.Item>
                <Button onClick={logoutHandler}>Log Out</Button>
              </NavDropdown>
            </div>
          ) : (
            <div>
              <Link to="/Login" className="m-3">
                Login
              </Link>{" "}
              <Link to="/register " className="m-3">
                Register{" "}
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
