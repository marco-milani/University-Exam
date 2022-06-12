
import { Container } from "react-bootstrap"
import {ExamTable, StudyPlanForm} from "./examTable"
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
            <Row><Col style={{textAlign:"center"}}>
               {props.loggedIn ? <StudyPlanForm></StudyPlanForm> : ""}
                
                </Col>
                </Row>
                <br/>
              <br/>
              <br/>
              <Row><Col style={{textAlign:"center"}}>
              <h1>Exam List</h1>
              </Col>
              <br/>
              <br/>
              <br/>
               </Row>
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
              <Col style={{textAlign:"center"}}>
                <MyPlan> </MyPlan>
              </Col>
            </Row>
          </Container>
      </>
  )

}




export { DefaultRoute, ExamListRoute,LoginFormRoute,StudyPlanRoute }