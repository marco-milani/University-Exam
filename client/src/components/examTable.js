import { useState } from 'react';
import {Col, Table, Button, Form} from 'react-bootstrap';
import {Info} from 'react-bootstrap-icons';
function ExamTable(props) {
    return (
        <div className="align">
            <Table striped>
                <thead className='h5'>
                    <tr>
                        <th style={{textAlign:"center"}}>Code</th>
                        <th style={{textAlign:"center"}}>Name</th>
                        <th style={{textAlign:"center"}}>Credits</th>
                        <th style={{textAlign:"center"}}>Enrolled students</th>
                        <th style={{textAlign:"center"}}>Max students</th>
                        <th style={{textAlign:"center"}}>Action</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: "#e6fae9" }}>
                    {props.exams.map((e)=><ExamRow exam={e} key={e.code} n={props.nEnr.map((ne)=>{if(ne.code==e.code){return ne.n.n}})}> </ExamRow>)}
                    
                </tbody>
            </Table>
            
        </div>
    )
}

function ExamRow(props) {
   const [hidden,setHidden]=useState(true)
   let str=props.exam.incompatible.map(i=>i.code2).join(", ");
   //props.exam.incompatible.map(i=>{str+=i.code2+"  "})
   if(str===""){
       str="none";
   }
   if(props.exam.preparation===null){
    props.exam.preparation="none";
   }
    return(
    <>
    <tr>
        <td style={{textAlign:"center"}}>{props.exam.code}</td>
        <td style={{textAlign:"center"}}>{props.exam.name}</td>
        <td style={{textAlign:"center"}}>{props.exam.credits}</td>
        <td style={{textAlign:"center"}}>{props.n}</td>
        <td style={{textAlign:"center"}}>{props.exam.max}</td>
        <td style={{textAlign:"center"}}><Button onClick={()=>setHidden(!hidden)}><Info/></Button> </td>
    </tr>
    <tr hidden={hidden}><td colSpan={3}>Preparatory course: {props.exam.preparation}</td><td colSpan={3}>Incompatible courses: {str}</td></tr>
    </>
    )
   
}
export {ExamTable}