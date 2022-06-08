import { TopBar } from "./components/myNavBar";
import './App.css';
import API from "./API.js";
import {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultRoute, ExamListRoute } from "./components/routes"

function App() {
  const [exams, setExams] = useState([]);



  useEffect(() => {  
    const getExams = async() => {

    const _exams = await API.getAllExam();
    setExams(_exams);
    console.log("qui");
  }
    getExams();
   
  }, []);

  //const list= API.getAllExam();
  //console.log(list);
  console.log(exams);
  return (
    <BrowserRouter>
    <TopBar bg='#557B83' />
      <Routes>
        <Route path='*' element={<DefaultRoute />} />
        <Route path='/' element={<ExamListRoute exams={exams}/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App;
