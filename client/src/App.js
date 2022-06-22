import { TopBar } from "./components/myNavBar";
import './App.css';
import API from "./API.js";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DefaultRoute, ExamListRoute, LoginFormRoute, StudyPlanRoute } from "./components/routes"
import { Alert, Row, Spinner } from "react-bootstrap";
function App() {
  const [exams, setExams] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false); //used to handle log in
  const [message, setMessage] = useState('');// used by alert
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
  const [examPlan, setExamPlan] = useState([]);
  const [loading, setLoading] = useState(true);

  const getExams = async () => {

    const _exams = await API.getAllExam();
    setExams(_exams);
  }

  useEffect(() => {
    const checkAuth = async () => {
      try{
         const user = await API.getUserInfo();
         setUser(user);
      }catch(err){
        setLoggedIn(false);
        return;
      }
      setLoggedIn(true);
      
    };
    setLoading(true);
    checkAuth()
      .catch((e) => { setLoggedIn(false); setUser(null) });

  }, []);


  const handleLogout = async () => {
    try{
       await API.logOut();
    }catch(err){
      console.log(err);
    }
   
    setLoggedIn(false);
    setUser(null);
    setMessage('');
    setPlan(null);
    setExamPlan([]);
  };

  async function getPlan() {
    setLoading(true);
    try{
      await getExams();
    
    if (loggedIn) {
      const _plan = await API.getPlan();
            setPlan(_plan);
            await getExPlan(_plan);
    }
    else {
      setPlan(null);
    }
  }catch(err){
    console.log(err);
    }
    setLoading(false);
  }
  useEffect(() => {
    getPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const getExPlan = async (_plan) => {
    if (loggedIn && _plan != null) {
      let explan
      try{
        explan = await API.getExPlan(_plan.id);
      }
      catch(err){
        
      }
      
      setExamPlan(explan);
    }
    else {
      setExamPlan([]);
    }
  }
  if (loading) {
    return <Spinner animation="grow" />
  }

  return (
    <BrowserRouter>
      <TopBar bg='#557B83' loggedIn={loggedIn} logout={handleLogout} />
      {message && <Row>
        <Alert className="sticky-sm-top col-4 offset-4 shadow rounded mt-1" variant={message.type} style={{ textAlign: "center", position: "fixed" }} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
      </Row>}
      <Routes>
        <Route path='*' element={<DefaultRoute />} />
        <Route path='/' element={<ExamListRoute setMessage={setMessage} exams={exams} loggedIn={loggedIn} user={user} plan={plan} getPlan={getPlan} />} />
        <Route path="/login" element={loggedIn ? <Navigate replace to='/studyPlan' /> : <LoginFormRoute setMessage={setMessage} setLoggedIn={setLoggedIn} setUser={setUser} getPlan={getPlan}></LoginFormRoute>} />
        <Route path="/studyplan" element={loggedIn ? <StudyPlanRoute exams={exams} user={user} plan={plan} setPlan={setPlan} getPlan={getPlan} examPlan={examPlan} setExamPlan={setExamPlan} getExPlan={getExPlan} setMessage={setMessage}></StudyPlanRoute> :
          <Navigate replace to='/login' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
