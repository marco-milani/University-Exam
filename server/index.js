'use strict';

const express = require('express');
const res = require('express/lib/response');
const morgan = require('morgan');
const {check, validationResult} = require("express-validator");
const dao = require('./dao');
const PORT = 3001;
const cors = require('cors');


// init express
const app = new express();
const port = 3001;

app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
try{
  dao.addDefaultExam();
}catch(err){
  console.log(err);
}

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


// Get exam element given its id //
app.get('/api/exams/:id',
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


    //TO DO login 

// POST APIs //

// Create a new study plan //
app.post('/api/plan',
    [check("type").exists(),
      check("userId").exists().isNumeric()],
    async (req, res) => {
      const errors = validationResult(req);
      console.log(errors);
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
//TO DO capire come voglio fare aggiungere esami-> uno per volta da qui o passare lista qui 
/*app.put('/api/films/:id',
    [check("title").exists(),
      check("favorite").exists(),
      check("watchdate").exists(),
      check("rating").exists().isNumeric(),
      check("user").exists()],
    async (req, res) => {
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({error: ' Validation of request body failed '}).end()
      }
      const id = req.params.id;
      try {
          await dao.updateFilm(req.body,id);
        return res.status(200).json("OK").end();
      } catch (err) {
        console.log(err);
        return res.status(500).json({error: `Internal Server Error`}).end();
      }
    });*/


// DELETE APIs //

// Delete a film given its id //
app.delete('/api/plan/:id',
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

//TO DO api delete exam from exam plan

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});