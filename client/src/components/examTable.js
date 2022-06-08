import {Col, Table, Button, Form} from 'react-bootstrap';

function ExamTable(props) {
    console.log(props);
    return (
        <div className="align">
            <Table striped>
                <thead className='h5'>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Credits</th>
                        <th>Enrolled students</th>
                        <th>Max students</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: "#e6fae9" }}>
                   
                    {props.exams.map((e)=><ExamRow exam={e} key={e.code}> </ExamRow>)}
                    
                </tbody>
            </Table>
            
        </div>
    )
}

function ExamRow(props) {
   
    return(
    <tr>
        <td>{props.exam.code}</td>
        <td>{props.exam.name}</td>
        <td>{props.exam.credits}</td>
        <td>{props.exam.n}</td>
        <td>{props.exam.max}</td>
    </tr>
    )
}
export {ExamTable}