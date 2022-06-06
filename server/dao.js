'use strict';
/* Data Access Object (DAO) module for accessing exams */

const sqlite = require('sqlite3');
const {Exam} = require('./exam');
//const dayjs = require("dayjs");
const { resolve } = require('path');

const db = new sqlite.Database('studyPlan.db', err => {
  if (err) throw err;
});

exports.listAllExam = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM exam';

    db.all(sql, (err, rows) => {
      if (err) reject(err);
      else {
        const exams = rows.map(row =>
            new Exam(
                row.code,
                row.name,
                row.credits,
                row.max,
                row.preparation,
                row.description
            ))
        resolve(exams);
      }
    })
  });

}



exports.getExamByCode = (code) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM exam WHERE code=?';
    db.get(sql, code, (err, row) => {
      if (err) reject(err);
      else {
        if(row) {
          const exam = new Exam(
            row.code,
            row.name,
            row.credits,
            row.max,
            row.preparation,
            row.description
          )
          resolve(exam);
        }
        else {
          reject(row);
        }
      }
    })
  });

}

exports.addExamPlan = (exam,userId) => {
  return new Promise((resolve, reject) => {
        const sql = "INSERT INTO planExam(id,code) VALUES (?, ?)";
        const sql2="SELECT id from plan WHERE userId=?";
        const sql3= "UPDATE plan SET credits= credits + ? WHERE id=?"
        let planId;
        db.get(sql2, userId, (err, row) => {//prendo plan id
          if (err) reject(err);
          else {
            if(row) {
              planId=row.id;
            }
            resolve(planId);
          }
        });

        db.run(sql, [planId,exam.code], (err) => {// inserisco esame dentro piano di studio
          if (err)
            reject(err);
          else
            resolve(this.lastID);
        });
        db.run(sql3, [exam.credits,planId], (err) => { //aggiorno piano distudio con crediti dell'esame
          if (err)
            reject(err);
          else
            resolve(this.lastID);
        });
      }
  );

}//new plan(set type)

exports.NewPlan = (type,userId) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO plan(type,credits,userId) VALUES(?,?,?)";
    db.run(sql, [type,userId,0], (err) => {
      if (err)
        reject(err);
      else
         
        resolve(this.lastID)
    })
  });
}

//delete exam from plan

exports.deleteExamPlan = (exam,userId) => {
  return new Promise((resolve, reject) => {
        const sql = "DELETE FROM planExam WHERE code=? and id=?";
        const sql2="SELECT id from plan WHERE userId=?";
        const sql3= "UPDATE plan SET credits= credits - ? WHERE id=?"
        let planId;
        db.get(sql2, userId, (err, row) => {//prendo plan id
          if (err) reject(err);
          else {
            if(row) {
              planId=row.id;
            }
            resolve(planId);
          }
        });

        db.run(sql, [planId,exam.code], (err) => {// elimino esame dentro piano di studio
          if (err)
            reject(err);
          else
            resolve(this.lastID);
        });
        db.run(sql3, [exam.credits,planId], (err) => { //aggiorno piano distudio con crediti dell'esame
          if (err)
            reject(err);
          else
            resolve(this.lastID);
        });
      }
  );
}
exports.deletePlan=(id)=>{
  return new Promise((resolve,reject)=>{
    const sql="DELETE FROM plan WHERE id=?";
    db.run(sql, [id], (err) => {// elimino plan 
      if (err)
        reject(err);
      else
        resolve(this.lastID);
    });
  })
}

exports.login = (film,user) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT hash FROM users WHERE email=?";
    db.get(sql, [user.email], (err) => {
      if (err)
        reject(err);
      else{
          // TODO: resolve
          if(row) {
            let pwd=row.hash;
            //check pwd hash
          }
          resolve(planId);
        }
    })
  });
}

exports.addExam=(exam) =>{
  return new Promise((resolve,reject)=> {
    const sql="INSERT INTO exam(code,name,credits,max,preparation,description) VALUES(?,?,?,?,?,?)";
    db.run(sql,[exam.code,exam.name,exam.credits,exam.max,exam.preparation,exam.descriptiom],(err)=>{
      if(err)
        reject(err);
        else{
          resolve(this.lastID)
        }
    })
  })
}

exports.addDefaultExam=async ()=>{
  let exam=new Exam("02GOLOV","Architetture dei sistemi di elaborazione",12,null,null,null);
  await this.addExam(exam);
  let exam1=new Exam("02LSEOV","Computer architectures",12,null,null,null);
  await this.addExam(exam1);
  let exam2=new Exam("01SQJOV","Data Science and Database Technology",8,null,null,null);
  await this.addExam(exam2);
  let exam3=new Exam("01SQMOV","Data Science e Tecnologie per le Basi di Dati",8,null,null,null);
  await this.addExam(exam3);
  let exam4=new Exam("01SQLOV","Database systems",8,null,null,null);
  await this.addExam(exam4);
  let exam5=new Exam("01OTWOV","Computer network technologies and services",6,3,null,null);
  await this.addExam(exam5);
  let exam6=new Exam("02KPNOV","Tecnologie e servizi di rete",6,3,null,null);
  await this.addExam(exam6);
  let exam7=new Exam("01TYMOV","Information systems security services",12,null,null,null);
  await this.addExam(exam7);
  let exam8=new Exam("01UDUOV","Sicurezza dei sistemi informativi",12,null,null,null);
  await this.addExam(exam8);
  let exam9=new Exam("05BIDOV","Ingegneria del software",6,null,"02GOLOV",null);
  await this.addExam(exam9);
  let exam10=new Exam("04GSPOV","Software engineering",6,null,"02LSEOV",null);
  await this.addExam(exam10);
  let exam11=new Exam("01UDFOV","Applicazioni Web I",6,null,null,null);
  await this.addExam(exam11);
  let exam12=new Exam("01TXYOV","Web Applications I",6,3,null,null);
  await this.addExam(exam12);
  let exam13=new Exam("01TXSOV","Web Applications II",6,null,"01TXYOV",null);
  await this.addExam(exam13);
  let exam14=new Exam("02GRSOV","Programmazione di sistema",6,null,null,null);
  await this.addExam(exam14);
  let exam15=new Exam("01NYHOV","System and device programming",6,3,null,null);
  await this.addExam(exam15);
  let exam16=new Exam("01SQOOV","Reti Locali e Data Center",6,null,null,null);
  await this.addExam(exam16);
  let exam17=new Exam("01TYDOV","Software networking",7,null,null,null);
  await this.addExam(exam17);
  let exam18=new Exam("03UEWOV","Challenge",5,null,null,null);
  await this.addExam(exam18);
  let exam19=new Exam("01URROV","Computational intelligence",6,null,null,null);
  await this.addExam(exam19);
  let exam20=new Exam("01OUZPD","Model based software design",4,null,null,null);
  await this.addExam(exam20);
  let exam21=new Exam("01URSPD","Internet Video Streaming",6,2,null,null);
  await this.addExam(exam21);


}