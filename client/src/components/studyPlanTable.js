import {Col, Table, Button, Form} from 'react-bootstrap';
import { useEffect, useState } from "react";
import {ArrowBarRight, Info} from 'react-bootstrap-icons';

/*const [plan, setPlan] = useState([]);
const getPlan = async () => {

    const _plan = await API.getAllExam();
    setPlan(_plan);
  }
  useEffect(() => {

    getPlan();

  }, []);*/
  let planExams=[];
  let exChosen;
  let list
function ExamList(props){
    list=props.exams;
    
    return(
        <div className="align px-5" >
            <Table striped >
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
    const[hidden2,setHidden2]=useState(false);
    let str=props.exam.incompatible.map(i=>i.code2).join(", ");
    if(str===""){
        str="none";
    }
    if(props.exam.preparation===null){
     props.exam.preparation="none";
    }
     return(
     <>
     <tr hidden={hidden2}>
         <td style={{textAlign:"center"}}>{props.exam.code}</td>
         <td style={{textAlign:"center"}}>{props.exam.name}</td>
         <td style={{textAlign:"center"}}>{props.exam.credits}</td>
         <td style={{textAlign:"center"}}>{props.n}</td>
         <td style={{textAlign:"center"}}>{props.exam.max}</td>
         <td style={{textAlign:"center"}}>
             <Button style={{borderRadius:"32px"}} variant={"light"} onClick={()=>setHidden(!hidden)}><Info/></Button>{' '}
             <Button style={{borderRadius:"32px"}} variant={"success"} className="mt-2"
                onClick={()=>list.map((el)=>{if(el.code===props.exam.code){
                    exChosen=el;
                    setHidden2(true);
                    setHidden(true);
                }
                })}>
                 
                 <ArrowBarRight/></Button>
        </td>
     </tr>
     <tr hidden={hidden}><td colSpan={3}>Preparatory course: {props.exam.preparation}</td><td colSpan={3}>Incompatible courses: {str}</td></tr>
     </>
     )
    
 }


function MyPlan(props){
    return(
        <div className="align px-5" >
        <Button variant="success" active>
                            Save Plan
                        </Button>{' '} 
                         <Button variant="danger" active >
                         Delete Plan
         </Button>
         <br/> <br/> <br/>
         <Table striped >
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
                    
                    
                </tbody>
            </Table>

        
        </div>
    )

}
export{ExamList,MyPlan}