import { useState } from 'react';
import { Col, Table, Button, Form } from 'react-bootstrap';
import { Border, Info } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import API from "../API.js";

const fontSize = 18;

function ExamTable(props) {
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
                    {props.exams.map((e) => <ExamRow exam={e} key={e.code} n={e.n}> </ExamRow>)}

                </tbody>
            </Table>

        </div>
    )
}

function ExamRow(props) {
    const [hidden, setHidden] = useState(true)
    let str = props.exam.incompatible.map(i => i.code2).join(", ");
    //props.exam.incompatible.map(i=>{str+=i.code2+"  "})
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
                <td style={{ textAlign: "center" }}><Button style={{ borderRadius: "32px" }} variant={/*"success"*/"light"} onClick={() => setHidden(!hidden)}><Info /></Button> </td>
            </tr>
            <tr hidden={hidden}><td colSpan={3}>Preparatory course: {props.exam.preparation}</td><td colSpan={3}>Incompatible courses: {str}</td></tr>
        </>
    )

}



function StudyPlanForm(props) {
    const navigate=useNavigate();
    const [hidden, setHidden] = useState(false)
    const [type,setType]=useState("FullTime");
    const handleSubmit =async (event) => {
        event.preventDefault();
       
        const sp={
            type:type,
            credits:0,
            userId:props.user.id 
        }
        await API.newPlan(sp);
        await props.getPlan();
        navigate("/studyPlan");
    }
    let Bonucci;
    if(props.plan!==null){
        Bonucci=<Button variant="success" hidden={hidden} onClick={() => navigate("/studyPlan")}> Modify Study Plan </Button>
    }
    else{
        
        Bonucci=<>
        <Button variant="success" hidden={hidden} onClick={() => setHidden(!hidden)}> New Study Plan </Button>
        <Form className='col-4 offset-4' style={{ textAlign: "center" }} onSubmit={handleSubmit} hidden={!hidden}> 
        <Form.Label>Select type of study plan</Form.Label>
            <Form.Select aria-label="studyplan choose Chiellini top player"  onChange={event => setType(event.target.value)}> 
                <option defaultValue={true} value="fullTime">Full time</option>
                <option value="partTime">Part time</option>
            </Form.Select>
            <br/>
            <Button className='col-2' variant="success" type="submit" style={{ fontSize: fontSize }}>Save</Button>
      &nbsp;
        <Button className='col-2' variant="danger" style={{ fontSize: fontSize }} onClick={() => setHidden(!hidden)}>Cancel</Button>
        </Form>
        </>
    }
    return (
        <>
        {Bonucci}
        </>
    )


}
export { ExamTable, StudyPlanForm }