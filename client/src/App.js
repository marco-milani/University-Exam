import { TopBar } from "./components/myNavBar";
import './App.css';
import API from "./API.js";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route,useNavigate,Navigate } from 'react-router-dom';
import { DefaultRoute, ExamListRoute, LoginFormRoute,StudyPlanRoute } from "./components/routes"
import { Alert, Container, Row } from "react-bootstrap";
function App() {
  const [exams, setExams] = useState([]);
  const [enrolled, setCount] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  

  const getExams = async () => {

    const _exams = await API.getAllExam();
    setExams(_exams);
  }
  useEffect(() => {

    getExams();

  }, []);

  useEffect(() => {
    const getCount = async () => {

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
      getExams().catch((e) => console.log(e));
  }, [loggedIn]);*/


  return (
    <BrowserRouter>
      <TopBar bg='#557B83' loggedIn={loggedIn}/>
      {message && <Row>
        <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
      </Row>}
      <Routes>
        <Route path='*' element={<DefaultRoute />} />
        <Route path='/' element={<ExamListRoute exams={exams} nEnr={enrolled} />} />
        <Route path="/login" element={<LoginFormRoute setMessage={setMessage} setLoggedIn={setLoggedIn}></LoginFormRoute>} />
        <Route path="/studyplan" element={loggedIn ?<StudyPlanRoute exams={exams} nEnr={enrolled}></StudyPlanRoute> : 
        <Navigate replace to='/login' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
