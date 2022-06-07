import { TopBar } from "./myNavBar";
import {Container} from "react-bootstrap"
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
        <div className="App">
            <header className="App-header">
                <TopBar bg='#557B83' />
            </header>
            <Container fluid className='mx-auto my-3'>
                
            </Container>
        </div>
            )

}  
export {DefaultRoute,ExamListRoute}