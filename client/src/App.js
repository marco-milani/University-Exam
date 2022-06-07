
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultRoute, ExamListRoute } from "./components/routes"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<DefaultRoute />} />
        <Route path='/' element={<ExamListRoute />}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App;
