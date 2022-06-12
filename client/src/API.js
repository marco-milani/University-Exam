const { Exam } = require("./exam");

const BASE_URL = "http://localhost:3001";

const getAllExam = async () => {
    const response = await fetch(`${BASE_URL}/api/exams`);
    const examJSON = await response.json();
    if (response.ok) {
      return examJSON.map(e => new Exam(e.code,e.name,e.credits,e.max,e.preparation,e.incompatible));
    } else throw examJSON;
  };

  const getCountEnrolled = async () => {
    const response = await fetch(`${BASE_URL}/api/students/exams`);
    const enrolledJSON = await response.json();
    if (response.ok) {
      return enrolledJSON;
    } else throw enrolledJSON;
  };


  const logIn = async (credentials) => {
    const response = await fetch(`${BASE_URL}/api/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    console.log(response);
    if(response.ok) {
      const user = await response.json();
      return user;
    }
    else {
      const errDetails = await response.text();
      throw errDetails;
    }
  };
  
  const getUserInfo = async () => {
    const response = await fetch(BASE_URL + '/api/sessions/current', {
      credentials: 'include',
    });
    const user = await response.json();
    if (response.ok) {
      return user;
    } else {
      throw user;  // an object with the error coming from the server
    }
  };
  
  const logOut = async() => {
    const response = await fetch(BASE_URL + '/api/sessions/current', {
      method: 'DELETE',
      credentials: 'include'
    });
    if (response.ok)
      return null;
  }
  const API={
      getAllExam,
      getCountEnrolled,
      logIn,
      getUserInfo,
      logOut

  }
  export default API;