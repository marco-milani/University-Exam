import { Col, Table, Button, Form,OverlayTrigger,Tooltip, Alert} from 'react-bootstrap';
import { useEffect, useState } from "react";
import { ArrowBarRight, Info, Stop } from 'react-bootstrap-icons';
import API from "../API"
import { useNavigate } from "react-router-dom";
//TO DO : gestione nStudents , save plan->[check on max number of students,check on credits!!!,save plan on db]
let list
function ExamList(props) {
    list = props.exams;

    return (
        <div className="align px-5" >
            <Table striped >
                <thead className='h5'>
                    <tr>
                        <th style={{ textAlign: "center" }}>Code</th>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>Credits</th>
                        <th style={{ textAlign: "center" }}>Enrolled students</th>
                        <th style={{ textAlign: "center" }}>Max students</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: "#e6fae9" }}>
                    {props.exams.map((e) => <ExamRow2 examPlan={props.examPlan} setExamPlan={props.setExamPlan} exam={e} key={e.code} n={e.n}> </ExamRow2>)}

                </tbody>
            </Table>

        </div>
    )

}

function ExamRow(props) { //row of my plan
    const [hidden, setHidden] = useState(true)
    let str = props.exam.incompatible.map(i => i.code2).join(", ");
    if (str === "") {
        str = "none";
    }
    if (props.exam.preparation === null) {
        props.exam.preparation = "none";
    }
    let buttonblocked = <OverlayTrigger overlay={<Tooltip id={props.exam.code}>Can't remove this course because it's obbligatory for a course you choose</Tooltip>}>
     <span className="d-inline-block">
      <Button disabled style={{ borderRadius: "32px",pointerEvents: 'none' }} variant={"danger"} className="mt-2">
        <Stop/></Button>
     </span>
    </OverlayTrigger>;

    
    
    if(props.exam.preparation!="none" && ! props.examPlan.map((x)=>x.code).includes(props.exam.preparation)){
        addButton=buttonblocked;
    }
    let buttonCheck = <Button style={{ borderRadius: "32px" }} variant={"success"} className="mt-2"
    onClick={() =>props.setExamPlan((oldExams) => oldExams.filter(e => e.code!=props.exam.code))}> <ArrowBarRight/></Button>;

    let addButton = buttonCheck;

    if( props.examPlan.map((x)=>x.preparation).includes(props.exam.code)){
        addButton=buttonblocked;
    }

    return (
        <>
            <tr>
                <td style={{ textAlign: "center" }}>{props.exam.code}</td>
                <td style={{ textAlign: "center" }}>{props.exam.name}</td>
                <td style={{ textAlign: "center" }}>{props.exam.credits}</td>
                <td style={{ textAlign: "center" }}>{props.n}</td>
                <td style={{ textAlign: "center" }}>{props.exam.max}</td>
                <td style={{ textAlign: "center" }}>
                    <Button style={{ borderRadius: "32px" }} variant={"light"} onClick={() => setHidden(!hidden)}><Info /></Button>{' '}
                    {addButton}
                </td>
            </tr>
            <tr hidden={hidden}><td colSpan={3}>Preparatory course: {props.exam.preparation}</td><td colSpan={3}>Incompatible courses: {str}</td></tr>
        </>
    )

}


function MyPlan(props) {
    const navigate = useNavigate();

    let credits=0;
    props.examPlan.forEach((ep)=>{
        credits+=ep.credits;
    })

    const planType=props.plan ? props.plan.type : "";
    let saveButton=<Button variant="success" active onClick={
        ()=>{
            if(planType=="fullTime"){
                if(credits<60){
                    <Alert>Not Enough Credits </Alert>
                }
                else{
                    if(credits>80){

                    }else{
                        //delete all exam in study plan
                        // save plan
                    }

                }
                
            }
            else{
                if(planType=="partTime"){
                    if(credits<20){
                        <Alert>Not Enough Credits </Alert>
                    }
                    else{
                        if(credits>40){
    
                        }else{
                            //check enrolled
                            // save plan
                        }
    
                    }

                }else{
                    <Alert></Alert>
                    // problema con planType non ancora recuperato
                }
                

            }
        }
    }>
                Save Plan
            </Button>


    return (
        <div className="align px-5" >
            <Table striped >
                <thead className='h5'>
                    <tr>
                        <th style={{ textAlign: "center" }}>Code</th>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>Credits</th>
                        <th style={{ textAlign: "center" }}>Enrolled students</th>
                        <th style={{ textAlign: "center" }}>Max students</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: "#e6fae9" }}>
                    {props.examPlan.map((e) => <ExamRow examPlan={props.examPlan} setExamPlan={props.setExamPlan} exam={e} key={e.code} n={e.n}> </ExamRow>)}

                </tbody>
            </Table>
            <br /> <br /> <br />
            {saveButton}
            {' '}
            <Button variant="danger" active onClick={() => { API.deletePlan(props.plan.id); props.setPlan(null); navigate("/") }}>
                Delete Plan
            </Button>
            <br /><br />
            <label> <h2>Tot Credits : {credits}</h2> </label>

        </div>
    )

}

function ExamRow2(props) { //row of exam table

    const [hidden, setHidden] = useState(true);
    let hidden2=false;
    //const [hidden2, setHidden2] = useState(false);
    let str = props.exam.incompatible.map(i => i.code2).join(", ");
    if (str === "") {
        str = "none";
    }
    if (props.exam.preparation === null) {
        props.exam.preparation = "none";
    }
    let codes = props.examPlan.map((x)=>x.code);
    if(codes.includes(props.exam.code)){
        console.log(true);
        hidden2=true;
    }else{
        console.log(false);
        hidden2=false; 
    }



    let buttonCheck = <Button style={{ borderRadius: "32px" }} variant={"success"} className="mt-2"
    onClick={() => list.forEach((el) => {
        if (el.code === props.exam.code) {
            //setHidden2(true);
            setHidden(true);
            props.setExamPlan(oldExams => [...oldExams, el]);
        }
    })}>
    <ArrowBarRight/></Button>;
    let flag; //used to set both error message
    let stri="";// error message to display
    let addButton = buttonCheck;
    if(props.exam.preparation!="none" && ! props.examPlan.map((x)=>x.code).includes(props.exam.preparation)){
        flag=1;
        stri="Can't add this course becouse it needs a preparatory course to be chosen"
       
    }

    for(const planItem of props.examPlan){
            for(const i of props.exam.incompatible){
                if(i.code2===planItem.code){
                    if(flag!==1){
                        stri="Can't add this course becouse it's incompatible with other courses"
                    }
                    else{
                        stri="Can't add this course becouse it's incompatible with other courses and needs a preparatory course to be chosen"
                    }
                    flag=1;
                }
            }
    }
    let buttonblocked = <OverlayTrigger overlay={<Tooltip id={props.exam.code}>{stri}</Tooltip>}>
        <span className="d-inline-block">
    <Button disabled style={{ borderRadius: "32px",pointerEvents: 'none'  }} variant={"danger"} className="mt-2"
        onClick={() => list.map((el) => {
            if (el.code === props.exam.code) {
                setHidden(true);
            }
        })}>
        <Stop/></Button>
        </span>
        </OverlayTrigger>
    if(flag===1){
        addButton=buttonblocked;
    }

    return (
        <>
            <tr hidden={hidden2}>
                <td style={{ textAlign: "center" }}>{props.exam.code}</td>
                <td style={{ textAlign: "center" }}>{props.exam.name}</td>
                <td style={{ textAlign: "center" }}>{props.exam.credits}</td>
                <td style={{ textAlign: "center" }}>{props.n}</td>
                <td style={{ textAlign: "center" }}>{props.exam.max}</td>
                <td style={{ textAlign: "center" }}>
                    <Button style={{ borderRadius: "32px" }} variant={"light"} onClick={() => setHidden(!hidden)}><Info /></Button>{' '}

                    {addButton}
                </td>
            </tr>
            <tr hidden={hidden}><td colSpan={3}>Preparatory course: {props.exam.preparation}</td><td colSpan={3}>Incompatible courses: {str}</td></tr>
        </>
    )

}



export { ExamList, MyPlan }