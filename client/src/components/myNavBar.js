function TopBar(props) {
    const userColor = '#39AEA9';
    return (
        <Navbar style={{backgroundColor: props.bg}} expand="lg"
                className="justify-content-center align-content-center mh-10">
          <Container style={{paddingTop: '0.2%', marginLeft: '3vw', marginRight: '3vw'}}>
            <Navbar.Brand as={Link} to='/'>
              <img src={logo} alt={"App logo"} height={40} width={40} style={{marginBottom: '3%'}}/>
              <span style={{color: 'white', marginLeft: '1em', fontSize: 25}}>Film Library</span></Navbar.Brand>
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