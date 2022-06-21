
import { Container } from "react-bootstrap"
import { ExamTable, StudyPlanForm } from "./examTable"
import { LoginForm } from "./AuthComponents"
import { ExamList, MyPlan } from "./studyPlanTable";
import { Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
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
        <Row><Col style={{ textAlign: "center" }}>
          {props.loggedIn ? <StudyPlanForm user={props.user} plan={props.plan} getPlan={props.getPlan} setPlan={props.setPlan}></StudyPlanForm> : ""}

        </Col>
        </Row>
        <br />
        <br />
        <br />
        <Row><Col style={{ textAlign: "center" }}>
          <h1>Exam List</h1>
        </Col>
          <br />
          <br />
          <br />
        </Row>
        <ExamTable exams={props.exams} nEnr={props.nEnr}> </ExamTable>

      </Container>
    </>
  )

}

function LoginFormRoute(props) {
  return (
    <>
      <div className='m-5'>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <h1>Login</h1>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <LoginForm setMessage={props.setMessage} setLoggedIn={props.setLoggedIn} setUser={props.setUser} getPlan={props.getPlan} />
          </Col>
        </Row>
      </div>
    </>
  );

}

function StudyPlanRoute(props) {
  const navigate = useNavigate();

  return (
    <>
      <Container fluid className='mx-auto my-3'>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <h1>Exam List</h1>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <h1>Exams Chosen</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <ExamList exams={props.exams} plan={props.plan} getPlan={props.getPlan} examPlan={props.examPlan} setExamPlan={props.setExamPlan}></ExamList>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <MyPlan getPlan={props.getPlan} examPlan={props.examPlan} setExamPlan={props.setExamPlan} getExPlan={props.getExPlan} exams={props.exams} plan={props.plan} setPlan={props.setPlan} setMessage={props.setMessage}> </MyPlan>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <Button variant="danger" active onClick={() => { props.getPlan().then(navigate("/")) }}> Back</Button>
          </Col>
        </Row>
      </Container>
    </>
  )

}




export { DefaultRoute, ExamListRoute, LoginFormRoute, StudyPlanRoute }