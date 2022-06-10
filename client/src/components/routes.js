
import { Container } from "react-bootstrap"
import {ExamTable} from "./examTable"
import {LoginForm} from "./AuthComponents"
import {Form, Button, Row, Col} from 'react-bootstrap';
function DefaultRoute() {
    return (
        <Container className='App'>
            <h1><b>404</b> Page not found </h1>
            <h2>This is not the route you are looking for!</h2>
        </Container>
    );
}

function ExamListRoute(props) {
    return (
        <>     
            <Container fluid className='mx-auto my-3'>
                <ExamTable exams={props.exams} nEnr={props.nEnr}> </ExamTable>
            </Container>
        </>
    )

}

function LoginFormRoute(props){
    return (
        <>
          <div className='m-5'>
            <Row>
              <Col>
                <h1>Login</h1>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col>
                <LoginForm login={props.login}/>
              </Col>
            </Row>
          </div>
        </>
    );

}


export { DefaultRoute, ExamListRoute,LoginFormRoute }