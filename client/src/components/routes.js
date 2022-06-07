
import { Container } from "react-bootstrap"
function DefaultRoute() {
    return (
        <Container className='App'>
            <h1><b>404</b> Page not found </h1>
            <h2>This is not the route you are looking for!</h2>
        </Container>
    );
}

function ExamListRoute() {

    return (
        <>
            
            <Container fluid className='mx-auto my-3'>
            
            </Container>
        </>
    )

}
export { DefaultRoute, ExamListRoute }