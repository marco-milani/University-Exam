import { Button, Container, Nav, Navbar, NavItem } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from 'react-router-dom'
function TopBar(props) {
    const navigate = useNavigate();
    return (
        <Navbar style={{ backgroundColor: props.bg }} expand="lg" sticky="top">
            <Container >
                <Navbar.Brand>
                    <span style={{ color: 'white', marginLeft: '1em', fontSize: 25 }}>Study Plan</span>
                </Navbar.Brand>
                <Nav>
                    <NavItem className="">
                        {props.loggedIn ?
                            <Button variant="light" active onClick={() => { props.logout(); navigate("./") }}>
                                logout
                            </Button> :
                            <Button variant="light" active onClick={() => navigate('/login')}>
                                login
                            </Button>}
                    </NavItem>
                </Nav>
            </Container>
        </Navbar>
    );
}

export { TopBar }