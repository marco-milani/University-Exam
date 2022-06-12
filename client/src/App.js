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
  const [user, setUser] = useState(null);

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
      .catch((e) => setLoggedIn(false));
      
  }, []);

  useEffect(() => {
    if (loggedIn)
      console.log(loggedIn);
  }, [loggedIn]);

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUser(null);
    setMessage('');
    

  };



  return (
    <BrowserRouter>
      <TopBar bg='#557B83' loggedIn={loggedIn} logout={handleLogout}/>
      {message && <Row>
        <Alert variant={message.type}  onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
      </Row>}
      <Routes>
        <Route path='*' element={<DefaultRoute />} />
        <Route path='/' element={<ExamListRoute exams={exams} nEnr={enrolled} loggedIn={loggedIn} user={user}/>} />
        <Route path="/login" element={loggedIn ?  <Navigate replace to='/studyPlan' /> : <LoginFormRoute setMessage={setMessage} setLoggedIn={setLoggedIn} setUser={setUser}></LoginFormRoute>} />
        <Route path="/studyplan" element={loggedIn ?<StudyPlanRoute exams={exams} nEnr={enrolled} user={user}></StudyPlanRoute> : 
        <Navigate replace to='/login' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
