/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
// import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  const { user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Grocery Lists</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="../../list/new">
              <Nav.Link>New List</Nav.Link>
            </Link>
            <Link passHref href="../../items">
              <Nav.Link>Items</Nav.Link>
            </Link>
          </Nav>
          <Link passHref href="../../profile">
            <Nav.Link>
              <img
                src={user.photoURL}
                alt="userURL"
                className="img"
                width="50px"
                height="50px"
              />
            </Nav.Link>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
