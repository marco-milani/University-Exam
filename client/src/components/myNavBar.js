import { Button, Container, Form, FormControl, Nav, Navbar, NavLink, NavItem } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css"
import { Link,Navigate, useNavigate } from 'react-router-dom'
function TopBar(props) {
    const navigate=useNavigate();
    return (
        <Navbar style={{ backgroundColor: props.bg }} expand="lg" sticky="top">
            <Container >
                <Navbar.Brand>
                    <span style={{ color: 'white', marginLeft: '1em', fontSize: 25 }}>Study Plan</span>
                </Navbar.Brand>
                <Nav>
                    <NavItem className="">
                        <Button variant="light" active onClick={()=>navigate('/login')}>
                            Login
                        </Button>
                    </NavItem>
                </Nav>
            </Container>
        </Navbar>
    );
}

export { TopBar }