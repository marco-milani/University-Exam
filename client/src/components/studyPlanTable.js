import { Col, Table, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { ArrowBarRight, Info, Stop } from 'react-bootstrap-icons';
import API from "../API"
import { useNavigate } from "react-router-dom";

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
                    {props.exams.map((e) => <ExamRow2 examPlan={props.examPlan} setExamPlan={props.setExamPlan} exam={e} key={e.code} n={props.nEnr.map((ne) => { if (ne.code == e.code) { return ne.n.n } })}> </ExamRow2>)}

                </tbody>
            </Table>

        </div>
    )

}

function ExamRow(props) {
    const [hidden2, setHidden2] = useState(false)
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
            <tr hidden={hidden2}>
                <td style={{ textAlign: "center" }}>{props.exam.code}</td>
                <td style={{ textAlign: "center" }}>{props.exam.name}</td>
                <td style={{ textAlign: "center" }}>{props.exam.credits}</td>
                <td style={{ textAlign: "center" }}>{props.n}</td>
                <td style={{ textAlign: "center" }}>{props.exam.max}</td>
                <td style={{ textAlign: "center" }}>
                    <Button style={{ borderRadius: "32px" }} variant={"light"} onClick={() => setHidden(!hidden)}><Info /></Button>{' '}
                    <Button style={{ borderRadius: "32px" }} variant={"success"} className="mt-2"
                        onClick={() => list.map((el) => {
                            if (el.code === props.exam.code) {
                                setHidden2(true);
                                setHidden(true);
                                props.setExamPlan(oldExams => [...oldExams, el]);
                            }
                        })}>

                        <ArrowBarRight/></Button>
                </td>
            </tr>
            <tr hidden={hidden}><td colSpan={3}>Preparatory course: {props.exam.preparation}</td><td colSpan={3}>Incompatible courses: {str}</td></tr>
        </>
    )

}


function MyPlan(props) {
    const navigate = useNavigate();
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
                    {props.examPlan.map((e) => <ExamRow examPlan={props.examPlan} setExamPlan={props.setExamPlan} exam={e} key={e.code} n={props.nEnr.map((ne) => { if (ne.code == e.code) { return ne.n.n } })}> </ExamRow>)}

                </tbody>
            </Table>
            <br /> <br /> <br />
            <Button variant="success" active>
                Save Plan
            </Button>{' '}
            <Button variant="danger" active onClick={() => { API.deletePlan(props.plan); props.setPlan(null); navigate("/") }}>
                Delete Plan
            </Button>

        </div>
    )

}

function ExamRow2(props) {

    const [hidden, setHidden] = useState(true)
    const [hidden2, setHidden2] = useState(false);
    let str = props.exam.incompatible.map(i => i.code2).join(", ");
    if (str === "") {
        str = "none";
    }
    if (props.exam.preparation === null) {
        props.exam.preparation = "none";
    }
    let buttonCheck = <Button style={{ borderRadius: "32px" }} variant={"success"} className="mt-2"
    onClick={() => list.forEach((el) => {
        if (el.code === props.exam.code) {
            setHidden2(true);
            setHidden(true);
            props.setExamPlan(oldExams => [...oldExams, el]);
        }
    })}>
    <ArrowBarRight/></Button>;

    let buttonblocked = <Button disabled style={{ borderRadius: "32px" }} variant={"danger"} className="mt-2"
        onClick={() => list.map((el) => {
            if (el.code === props.exam.code) {
                setHidden(true);
            }
        })}>
        <Stop/></Button>;

    let addButton = buttonCheck;
    if(props.exam.preparation!="none" && ! props.examPlan.map((x)=>x.code).includes(props.exam.preparation)){
        addButton=buttonblocked;
    }

    for(const planItem of props.examPlan){
            for(const i of props.exam.incompatible){
                if(i.code2===planItem.code){
                    addButton=buttonblocked;
                }
            }
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