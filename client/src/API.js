const { Exam } = require("./exam");

const BASE_URL = "http://localhost:3001";

const getAllExam = async () => {
    const response = await fetch(`${BASE_URL}/api/exams`);
    const examJSON = await response.json();
    if (response.ok) {
      return examJSON.map(e => new Exam(e.code,e.name,e.credits,e.max,e.preparation,null));
    } else throw examJSON;
  };


  const API={
      getAllExam
  }
  export default API;