import { Button, Container, Form, FormControl, Nav, Navbar, NavLink, NavItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom'
function TopBar(props) {
    return (
        <Navbar style={{ backgroundColor: props.bg }} expand="lg" sticky="top">
            <Container >
                <Navbar.Brand>
                    <span style={{ color: 'white', marginLeft: '1em', fontSize: 25 }}>Study Plan</span>
                </Navbar.Brand>
                <Nav>
                    <NavItem className="">
                        <NavLink variant="outline-primary" size="lg" active>
                            Login
                        </NavLink>
                    </NavItem>
                </Nav>
            </Container>
        </Navbar>
    );
}

export { TopBar }