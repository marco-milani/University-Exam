import {Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {Link} from 'react-router-dom'
function TopBar(props) {
    const userColor = '#39AEA9';
    return (
        <Navbar style={{backgroundColor: props.bg}} expand="lg"
                className="justify-content-center align-content-center mh-10" sticky="top">
          <Container style={{paddingTop: '0.2%', marginLeft: '3vw', marginRight: '3vw'}}>
            <Navbar.Brand as={Link} to='/'>
              <span style={{color: 'white', marginLeft: '1em', fontSize: 25}}>Study Plan</span></Navbar.Brand>
            <Nav className="m-auto">
              <Form className="d-flex">
                <FormControl
                    type="search"
                    size='sm'
                    htmlSize={60}
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant={'outline-dark'}>Search</Button>
              </Form>
            </Nav>
  
            <Button className='rounded-circle'
                    style={{border:0, size: 50, padding: 0, alignContent: true, backgroundColor:userColor}}>
            </Button>
  
          </Container>
        </Navbar>
    );
  }

  export{TopBar}