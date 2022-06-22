'use strict';

const express = require('express');
const res = require('express/lib/response');
const morgan = require('morgan');
const { check, validationResult, param } = require("express-validator");
const dao = require('./dao');
const userDao = require('./user-dao');
const PORT = 3001;
const cors = require('cors');


const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');


const app = new express();
const port = 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));


passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await userDao.getUser(username, password)
  if (!user)
    return cb(null, false, 'Incorrect username or password.');

  return cb(null, user);
}));

passport.serializeUser((user, cb) => {
  cb(null, { id: user.id });
});


passport.deserializeUser((user, cb) => { 
  return cb(null, user);
 
});

const isLoggedIn = (req, res, next) => { // middleware da usare per check login
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Not authorized' });
}

app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));
app.use(express.json())


/*try{  code to add default exam
  dao.addDefaultExam();
}catch(err){
  console.log(err);
}*/

// GET APIs 

// Get list of all exams 
app.get('/api/exams', async (req, res) => {
  try {
    let list = await dao.listAllExam();
    return res.status(200).json(list).end();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: `Internal Server Error` }).end();
  }
});


// Get studyPlan exams
app.get("/api/studyPlan/:id/exams", async (req, res) => {
  let exList;
  try {
    exList = await dao.getExamsPlan(req.params.id);
    return res.status(200).json(exList).end();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: `Internal Server Error` }).end();
  }


})

// Get plan

app.get('/api/plan', isLoggedIn,
  async (req, res) => {
    let plan;
    try {
      plan = await dao.getPlanByUserId(req.user.id);
      if (plan) {
        return res.status(200).json(plan).end();
      }
      else {
        return res.status(404).json({ error: `Plan  not found.` }).end();
      }
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ error: `Internal Server Error` }).end();
    }



  })


// POST APIs 

// Create a new study plan 
app.post('/api/plan', isLoggedIn,
  [check("type").exists(),
  check("userId").exists().isNumeric()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: ' Validation of request body failed ' }).end()
    }
    try {
      await dao.NewPlan(req.body.type, req.body.userId);
      return res.status(201).json("201 created").end();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: `Internal Server Error` }).end();
    }
  });


// PUT APIs //
//modify study plan
app.put('/api/plan/:id/exams', isLoggedIn,
  [check("examsCode").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: ' Validation of request body failed ' }).end()
    }
    try {
      await dao.addExamPlan(req.body.examsCode, req.params.id);
      return res.status(200).json("OK").end();
    } catch (err) {
      console.log(err);
      if (err===422){
        return res.status(422).json({ error: `Validation error` }).end();
      }
      return res.status(500).json({ error: `Internal Server Error` }).end();
    }
  });


// DELETE APIs //

// Delete a plan given its id //
app.delete('/api/plan/:id', isLoggedIn,
  async (req, res) => {
    const id = req.params.id;
    try {
      const result = await dao.deletePlan(id);

      return res.status(204).end();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: `Internal Server Error` }).end();
    }
  });



// AUTHENTICATION

app.post('/api/sessions', passport.authenticate('local'), (req, res) => {
  res.status(201).json(req.user);
});

// GET /api/sessions/current
app.get('/api/sessions/current', isLoggedIn, (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else
    res.status(401).json({ error: 'Not authenticated' });
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