import React,  { Component } from 'react';
import { Navbar, Nav, Form, NavDropdown} from 'react-bootstrap';

class Navigation extends Component{
    render(){
        return(
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed = "top">
                  <Navbar.Brand href="#home">Alumnet</Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                      <Nav.Link href="#deets">Login</Nav.Link>
                      <Nav.Link eventKey={2} href="#memes">
                        Sign up
                      </Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navigation;