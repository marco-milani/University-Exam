import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from "../API";
function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const navigate = useNavigate();


  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      props.setLoggedIn(true);
      props.setMessage({ msg: `Welcome, ${user.name} ${user.surname} !`, type: 'success' });
      props.setUser(user);
      navigate("/");
    } catch (err) {

      props.setMessage({ msg: "Wrong username or password", type: 'danger' });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = { username, password };
    handleLogin(credentials);

  };

  return (
    <Row className="justify-content-center">
      <Col align="left" sm={4}>
        <br />
        <Form onSubmit={handleSubmit} style={{ padding: '10%', backgroundColor: '#e6fae9' }}>
          <Form.Group controlId='username'>
            <Form.Label>email</Form.Label>
            <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} required={true} />
          </Form.Group>
          <br />
          <Form.Group controlId='password'>
            <Form.Label>password</Form.Label>
            <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true}
              minLength={6} />
          </Form.Group >
          <br />

          <Button className="col-3 offset-3" variant="success" type="submit">Login</Button>{' '}

          <Button className="col-3" variant="danger" active onClick={() => navigate('/')}>
            Back
          </Button>
        </Form>
      </Col>
    </Row>
  )
}


export { LoginForm };