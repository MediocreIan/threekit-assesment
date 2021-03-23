import React, {useState, useEffect} from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Display = ({savedData}) =>
{
    const [data, setData] = useState(savedData);

    useEffect(() => {setData(savedData)}, [savedData]);

    return (
        <div style={{width:'300px'}}>
            <Accordion>
                {Object.keys(savedData).map((key,i) =>
                {
                    console.log(i)
                    console.log("current is", savedData[key])
                    return (
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey={`${i}`}>
                                    {key}
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={`${i}`}>
                                <Card.Body>
                                    <p>notes:{savedData[key].notes}</p>
                                    <p>condition: {savedData[key].condition}</p>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    )
                })}
            </Accordion>

        </div>

    );
}
export default Display;
