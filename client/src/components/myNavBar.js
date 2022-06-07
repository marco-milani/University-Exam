import { Button, Container, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom'
function TopBar(props) {
    return (
        <Navbar style={{ backgroundColor: props.bg }} expand="lg"
            className="justify-content-center align-content-center mh-10" sticky="top">
            <Container style={{ paddingTop: '0.2%', marginLeft: '3vw', marginRight: '3vw' }}>
            <Nav.Item>
                <Navbar.Brand>
                    <span style={{ color: 'white', marginLeft: '1em', fontSize: 25 }}>Study Plan</span></Navbar.Brand>
                    
                </Nav.Item>
                <Nav.Item className="d-flex">
                    <Button variant="outline-primary" size="lg" active>
                        Login
                    </Button>
                    </Nav.Item>
            </Container>
        </Navbar>
    );
}

export { TopBar }