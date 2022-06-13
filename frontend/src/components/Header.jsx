import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import style from "../Styles/Header.module.css";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import { Search } from "./Search";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        variant="dark"
        expand="lg"
        collapseOnSelect
        className={style.navbar}
      >
        <Container>
          <a href="/">
            <Navbar.Brand>INPT-SHOP</Navbar.Brand>
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Search/>
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link className={style.cart}>
                  <i className="fas fa-shopping-cart"></i>
                  Panier
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  {userInfo && userInfo.isAdmin && (
                    <>
                  <LinkContainer to="admin/userslist">
                    <NavDropdown.Item>Utilisateurs</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="admin/productslist">
                    <NavDropdown.Item>Produits</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="admin/orderslist">
                    <NavDropdown.Item>Commandes</NavDropdown.Item>
                  </LinkContainer>
                    </>
                )
              }
                  <NavDropdown.Item onClick={logoutHandler}>
                  Se déconnecter
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className={style.login}>
                    <i className="fas fa-user"></i>Se connecter
                  </Nav.Link>
                </LinkContainer>
              )}
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
