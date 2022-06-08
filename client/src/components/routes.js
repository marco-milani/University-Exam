
import { Container } from "react-bootstrap"
import {ExamTable} from "./examTable"
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

}


export { DefaultRoute, ExamListRoute,LoginFormRoute }