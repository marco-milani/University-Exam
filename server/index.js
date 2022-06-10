'use strict';

const express = require('express');
const res = require('express/lib/response');
const morgan = require('morgan');
const {check, validationResult} = require("express-validator");
const dao = require('./dao');
const userDao = require('./user-dao');
const PORT = 3001;
const cors = require('cors');

// Passport-related imports
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');


// init express
const app = new express();
const port = 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));


// Passport: set up local strategy
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await userDao.getUser(username, password)
  if (!user)
    return cb(null, false, 'Incorrect username or password.');

  return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) { // this user is id + email + name
  return cb(null, user);
  // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
});

const isLoggedIn = (req, res, next) => { // middleware da usare per check login
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}

app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));



/*try{  code to add default exam
  dao.addDefaultExam();
}catch(err){
  console.log(err);
}*/

// GET APIs //

// Get list of all exams //
app.get('/api/exams', async (req, res) => {
  try {
    let list = await dao.listAllExam();
    return res.status(200).json(list).end();
  } catch (err) {
    console.log(err);
    return res.status(500).json({error: `Internal Server Error`}).end();
  }
});


// Get exam element given its code //
app.get('/api/exams/:code',
    async (req, res) => {
      const code = req.params.code;
      try {
        let exam = await dao.getExamByCode(code);
        if (exam)
          return res.status(200).json(exam).end();
        else
          return res.status(404).json({error: `Exam Code ${code} not found.`}).end();
      } catch (err) {
        console.log(err);
        return res.status(500).json({error: `Internal Server Error`}).end();
      }
    });


    app.get('/api/students/exams',
    async (req, res) => {
      let exams;
      try{
        exams= await dao.listAllExam();
      }
      catch(err){
        return res.status(500).json({error: `Internal Server Error`}).end();
      }
      let enrolled=[];
      for(const e of exams){
        let number
        try{
          number=await dao.NstudentsEnrolled(e.code);
        }
        catch(err){
          return res.status(500).json({error: `Internal Server Error`}).end();
        }
        const val={
          code : e.code,
          n: number
        };
        enrolled.push(val); 
      }
      return res.status(200).json(enrolled).end();
    });


    

// POST APIs //

// Create a new study plan //
app.post('/api/plan',
    [check("type").exists(),
      check("userId").exists().isNumeric()],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({error: ' Validation of request body failed '}).end()
      }
      try {
        await dao.NewPlan(req.body.type,req.body.userId);
        return res.status(201).json("201 created").end();
      } catch (err) {
        console.log(err);
        return res.status(500).json({error: `Internal Server Error`}).end();
      }
    });


// PUT APIs //

app.put('/api/plan/exams',
    [check("exams").exists(),
      check("userId").exists()],
    async (req, res) => {     
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({error: ' Validation of request body failed '}).end()
      }
      try {
          await dao.addExamPlan(req.body.exams,req.body.userId);
        return res.status(200).json("OK").end();
      } catch (err) {
        console.log(err);
        return res.status(500).json({error: `Internal Server Error`}).end();
      }
    });

    app.put('/api/plan/exams/remove',
    [check("exams").exists(),
      check("userId").exists()],
    async (req, res) => {     
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({error: ' Validation of request body failed '}).end()
      }
      try {
          await dao.deleteExamPlan(req.body.exams,req.body.userId);
        return res.status(200).json("OK").end();
      } catch (err) {
        console.log(err);
        return res.status(500).json({error: `Internal Server Error`}).end();
      }
    });

// DELETE APIs //

// Delete a plan given its id //
app.delete('/api/plan/:id',isLoggedIn,
    async (req, res) => {
        const id = req.params.id;
        try {
        const result = await dao.deletePlan(id);
        if(result)
            return res.status(204).end();
        else
            return res.status(404).json({error: `PlanId ${id} not found.`}).end();
      } catch (err) {
        console.log(err);
        return res.status(500).json({error: `Internal Server Error`}).end();
      }
    });



    // AUTHENTICATION

app.post('/api/sessions', passport.authenticate('local'), (req, res) => {
  console.log(req.body);
  res.status(201).json(req.user);
});

// GET /api/sessions/current
app.get('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else
    res.status(401).json({error: 'Not authenticated'});
});

// DELETE /api/session/current
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.end();
  });
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});