
import { Container } from "react-bootstrap"
import {ExamTable} from "./examTable"
import {LoginForm} from "./AuthComponents"
import { ExamList,MyPlan} from "./studyPlanTable";
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
              <Col style={{textAlign:"center"}}>
                <h1>Login</h1>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col>
                <LoginForm setMessage={props.setMessage} setLoggedIn={props.setLoggedIn}/>
              </Col>
            </Row>
          </div>
        </>
    );

}

function StudyPlanRoute(props) {
  return (
      <>     
          <Container fluid className='mx-auto my-3'>
            <Row>
              <Col style={{textAlign:"center"}}>
              <h1>Exam List</h1>
              </Col>
              <Col style={{textAlign:"center"}}>
              <h1>Exams Chosen</h1>
              </Col>
            </Row>
            <Row>
              <Col>
              <ExamList exams={props.exams} nEnr={props.nEnr}> </ExamList>
              </Col>
              <Col>
                <MyPlan> </MyPlan>
              </Col>
            </Row>
          </Container>
      </>
  )

}




export { DefaultRoute, ExamListRoute,LoginFormRoute,StudyPlanRoute }