import { TopBar } from "./components/myNavBar";
import './App.css';
import API from "./API.js";
import {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultRoute, ExamListRoute } from "./components/routes"

function App() {
  const [exams, setExams] = useState([]);
  const [enrolled, setCount]= useState([]);

  
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
  
  return (
    <BrowserRouter>
    <TopBar bg='#557B83' />
      <Routes>
        <Route path='*' element={<DefaultRoute />} />
        <Route path='/' element={<ExamListRoute exams={exams} nEnr={enrolled}/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App;
