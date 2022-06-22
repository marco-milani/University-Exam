import { Table, Button, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { useState } from "react";
import { ArrowBarLeft, ArrowBarRight, Info, LockFill } from 'react-bootstrap-icons';
import API from "../API"
import { useNavigate } from "react-router-dom";


function MyPlan(props) {
    const navigate = useNavigate();
    let credits = 0;
    props.examPlan.forEach((ep) => {
        credits += ep.credits;
    })
    let minCredits = 0;
    let maxCredits = 0;
    if (props.plan === null) {
        return <Spinner animation="grow" />
    }
    if (props.plan.type === "partTime") {
        minCredits = 20;
        maxCredits = 40;
    }
    if (props.plan.type === "FullTime") {
        minCredits = 60;
        maxCredits = 80;
    }

    let saveButton = <Button className="col-4" style={{ outline: "none", boxShadow: "none" }} variant="success" active onClick={
        () => {
            
                if (credits < minCredits) {
                    props.setMessage({ msg: "Not enough credits!", type: 'danger' });

                }
                else {
                    if (credits > maxCredits) {
                        props.setMessage({ msg: "Too many credits!", type: 'danger' });
                    } else {
                        API.updateExPlan(props.plan.id, props.examPlan)
                        .then(() =>{ 
                            props.setMessage({ msg: "Plan successfully saved", type: 'success' });
                            props.getPlan().then(() => navigate("/"));
                        } ).catch(()=>{
                            props.setMessage({ msg: "Server validation failed!", type: 'danger' });
                        });
                    }

                }
        }
    }>
        Save Plan
    </Button>


    return (
        <div className="align px-5" >
             <h1>Exams Chosen</h1>
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
                    {props.examPlan.map((e) => <ExamRow exams={props.exams} examPlan={props.examPlan} setExamPlan={props.setExamPlan} exam={e} key={e.code} n={e.n}> </ExamRow>)}

                </tbody>
            </Table>
            <br /> <br /> <br />
            {saveButton}
            <br />
            <Button className="col-4 mt-2" variant="danger" active onClick={() => { API.deletePlan(props.plan.id).then(()=>{props.getPlan().then(()=>navigate("/"))})}}>
                Delete Plan
            </Button>
            {' '}
            <Button className="col-4 mt-2" variant="danger" active onClick={() => {props.getPlan();}}>
                Cancel modification
            </Button>
            <br /><br />
            <label> <h2>Min Credits : {minCredits}  Max Credits : {maxCredits} </h2> </label>

            <br />
            <label> <h2>Tot Credits : {credits}</h2> </label>

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
                    <ButtonStudyPlan exam={props.exam} examPlan={props.examPlan} setExamPlan={props.setExamPlan} exams={props.exams} > </ButtonStudyPlan>
                </td>
            </tr>
            <tr hidden={hidden}><td colSpan={3}>Preparatory course: {props.exam.preparation}</td><td colSpan={3}>Incompatible courses: {str}</td></tr>
        </>
    )

}
function ButtonStudyPlan(props) {
    let buttonCheck = <Button style={{ borderRadius: "32px" }} variant={"success"} className="mt-2"
        onClick={() => {if(props.exam.max===props.exam.n){
            props.exams.forEach((e)=>{if(e.code===props.exam.code){
                e.special="Buffon";
            }})
        }
            props.setExamPlan((oldExams) => oldExams.filter(e => e.code !== props.exam.code))}}> <ArrowBarLeft /> </Button>;

    let addButton = buttonCheck;
    let buttonblocked = <OverlayTrigger overlay={<Tooltip id={props.exam.code}>Can't remove this course because it's obbligatory for a course you choose</Tooltip>}>
        <span className="d-inline-block">
            <Button disabled style={{ borderRadius: "32px", pointerEvents: 'none' }} variant={"danger"} className="mt-2">
                <LockFill /></Button>
        </span>
    </OverlayTrigger>;



    if (props.exam.preparation !== "none" && !props.examPlan.map((x) => x.code).includes(props.exam.preparation)) {
        addButton = buttonblocked;
    }

    if (props.examPlan.map((x) => x.preparation).includes(props.exam.code)) {
        addButton = buttonblocked;
    }
    return addButton;

}

function ExamList(props) {

    return (
        <div className="align px-5" >
             <h1>Exam List</h1>
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
                    {props.exams.map((e) => <ExamRow2 examPlan={props.examPlan} list={props.exams} setExamPlan={props.setExamPlan} exam={e} key={e.code} n={e.n}> </ExamRow2>)}

                </tbody>
            </Table>

        </div>
    )

}
function ExamRow2(props) { //row of exam table

    const [hidden, setHidden] = useState(true);
    let hidden2 = false;
    let str = props.exam.incompatible.map(i => i.code2).join(", ");
    if (str === "") {
        str = "none";
    }
    if (props.exam.preparation === null) {
        props.exam.preparation = "none";
    }
    let codes = props.examPlan.map((x) => x.code);
    if (codes.includes(props.exam.code)) {
        hidden2 = true;
    } else {
        hidden2 = false;
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

                    <ButtonExam exam={props.exam} list={props.list} examPlan={props.examPlan} setExamPlan={props.setExamPlan} setHidden={setHidden}> </ButtonExam>
                </td>
            </tr>
            <tr hidden={hidden}><td colSpan={3}>Preparatory course: {props.exam.preparation}</td><td colSpan={3}>Incompatible courses: {str}</td></tr>
        </>
    )

}


function ButtonExam(props) {

    let buttonCheck = <Button style={{ borderRadius: "32px" }} variant={"success"} className="mt-2"
        onClick={() => props.list.forEach((el) => {
            if (el.code === props.exam.code) {
                props.setHidden(true);
                props.setExamPlan(oldExams => [...oldExams, el]);
            }
        })}>
        <ArrowBarRight /></Button>;
    let flag; //used to set both error message
    let stri = "";// error message to display
    let addButton = buttonCheck;
    if (props.exam.preparation !== "none" && !props.examPlan.map((x) => x.code).includes(props.exam.preparation)) {
        flag = 1;
        stri = "Can't add this course because it needs a preparatory course to be chosen"

    }

    for (const planItem of props.examPlan) {
        for (const i of props.exam.incompatible) {
            if (i.code2 === planItem.code) {
                if (flag !== 1) {
                    stri = "Can't add this course because it's incompatible with other courses"
                }
                else {
                    stri = "Can't add this course because it's incompatible with other courses and needs a preparatory course to be chosen"
                }
                flag = 1;
            }
        }
    }
    if(props.exam.max===props.exam.n&&props.exam.special!=="Buffon"){
        flag=1;
        stri = "Can't add this course because this course has reached the max amount of students enrolled"
    }
    let buttonblocked = <OverlayTrigger overlay={<Tooltip id={props.exam.code}>{stri}</Tooltip>}>
        <span className="d-inline-block">
            <Button disabled style={{ borderRadius: "32px", pointerEvents: 'none' }} variant={"danger"} className="mt-2"
                onClick={() => props.list.forEach((el) => {
                    if (el.code === props.exam.code) {
                        props.setHidden(true);
                    }
                })}>
                <LockFill /></Button>
        </span>
    </OverlayTrigger>
    if (flag === 1) {
        addButton = buttonblocked;
    }
    return addButton;

}


export { ExamList, MyPlan }