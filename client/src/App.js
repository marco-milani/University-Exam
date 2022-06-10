import { TopBar } from "./components/myNavBar";
import './App.css';
import API from "./API.js";
import {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultRoute, ExamListRoute, LoginFormRoute } from "./components/routes"
import { Alert, Container, Row } from "react-bootstrap";
function App() {
  const [exams, setExams] = useState([]);
  const [enrolled, setCount]= useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

  
  useEffect(() => {  
    const getExams = async() => {

    const _exams = await API.getAllExam();
    setExams(_exams);
  }
    getExams();
   
  }, []);

  useEffect(() => {  
    const getCount = async() => {

    const enr = await API.getCountEnrolled();
    setCount(enr);
  }
    getCount();
   
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      await API.getUserInfo(); // we have the user info here
      setLoggedIn(true);
    };
      checkAuth()
          .catch((e) => console.log(e));
  }, []);

  /*useEffect(() => {
    if (loggedIn)
      getFilms()
          .catch((e) => console.log(e));
  }, [loggedIn]);*/
  
  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({msg: `Welcome, ${user.name}!`, type: 'success'});
    } catch (err) {
      console.log(err);
      setMessage({msg: err, type: 'danger'});
    }
  };

  return (
    <BrowserRouter>
    <TopBar bg='#557B83' />
    {message && <Row>
        <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
      </Row>}
      <Routes>
        <Route path='*' element={<DefaultRoute />} />
        <Route path='/' element={<ExamListRoute exams={exams} nEnr={enrolled}/>}/>
        <Route path="/login" element={<LoginFormRoute login={handleLogin}></LoginFormRoute>}></Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App;
