import { TopBar } from "./components/myNavBar";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultRoute, ExamListRoute } from "./components/routes"

function App() {
  return (
    <BrowserRouter>
    <TopBar bg='#557B83' />
      <Routes>
        <Route path='*' element={<DefaultRoute />} />
        <Route path='/' element={<ExamListRoute />}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App;
