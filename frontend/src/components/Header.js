import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown, Col, Row } from "react-bootstrap";
import SearchBox from "./SearchBox";
import 'font-awesome/css/font-awesome.min.css';
import { logout } from "../actions/userActions";



const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (

    <header>
      <div className="container-fluid bg-green">
      <section className="container">
    <div className="row">
    <Col md={6}>
          <div className="top-bar">
            <div className="top-contact">
           
            <p className="border-r pr-3">  <i className="fas fa-envelope"></i> vproshop@gmail.conm</p>
            <p className="pl-3"><i className="fas fa-user" aria-hidden="true"></i> proshop@gmail.conm</p>
            </div>
            
          </div>
           </Col>
       
           <Col md={6} className="top_social_icons">
           <a> <i className="fa fa-facebook"></i> </a>
           <a><i className="fas fa-twitter"></i></a>
           <a><i className="fas fa-instagram"></i></a>
           <a><i className="fas fa-google"></i></a>
           </Col>
    </div>
           
    </section>
      </div>
      <div className="row">
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        collapseOnSelect
        fixed="top"
      >
      
        <Container fluid>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Col md={5}>
          <Route render={({ history }) => <SearchBox history={history} />} />
          </Col>
        
          <Col md={4}>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src="/uploads/turning-point-logo.png"
                width="100%"
                height="auto"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
          </LinkContainer>
          </Col>

          <Col md={3}>
          <Navbar.Collapse id="basic-navbar-nav">
           
            <Nav className="ml
            -auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/bulkorderlist">
                    <NavDropdown.Item>Bulk Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
          </Col>
         
         
        </Container>
        
      </Navbar>
      </div>
    </header>
  );
};

export default Header;
