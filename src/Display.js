import React, {useState, useEffect} from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


const Display = ({savedData}) =>
{

    return (
        <>
            <Accordion style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}>
                {Object.keys(savedData).map((key, i) =>
                {
                    return (
                        <Card style={{
                            width: "50%",
                            backgroundColor: '#e3eff4'
                        }} key={i}>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey={`${i}`}>
                                    {key}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={`${i}`}>
                                <Card.Body>
                                    <div>
                                        <h5 style={{textAlign: 'left', fontSize: "10px", borderBottom: "1px solid #d4d2d2"}}>Notes</h5>
                                        <p style={{textAlign: "left", fontSize: '14px'}}>{savedData[key].notes}</p>
                                    </div>
                                    <div>
                                        <h5 style={{textAlign: 'left', fontSize: "10px", borderBottom: "1px solid #d4d2d2"}}>Condition</h5>
                                        <p style={{textAlign: "left", fontSize: "14px"}}>{savedData[key].condition}</p>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    )
                })}
            </Accordion>
        </>

    );
}
export default Display;
