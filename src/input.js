import './App.css';
import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Display from './Display'
import Modal from 'react-bootstrap/Modal'
import ProgressBar from 'react-bootstrap/ProgressBar'



function Input({onMount})
{
    const [selected, setSelected] = useState("");
    const [data, setData] = useState({});
    const [savedData, setSavedData] = useState({})
    const [show, setShow] = useState(false);

    const handleClose = () => setSelected('');



    useEffect(() =>
    {
        onMount([selected, setSelected, savedData, setSavedData],);
        if (Object.keys(savedData).length === 0 && JSON.parse(localStorage.getItem('savedData'))) {
            setSavedData(JSON.parse(localStorage.getItem('savedData')))
        }
    }, [onMount, selected, savedData]);

    let handleSaveClick = (ev) =>
    {
        if (savedData[selected]) {
            if (savedData[selected].notes && !data.notes) {
                let temp = data
                temp.notes = savedData[selected].notes
                setData(temp)
            }
            if (savedData[selected].condition && !data.condition) {
                let temp = data
                temp.condition = savedData[selected].condition
                setData(temp)
            }
        }
        if (data.notes && data.condition) {
            let temp = savedData;
            temp[selected] = data
            setSavedData(temp)
            setData({})
            setSelected("")
            localStorage.setItem("savedData", JSON.stringify(savedData))
        }
    }

    let handleSubmit = (e) =>
    {
        console.log('submit')
        localStorage.removeItem('savedData')
        setSavedData({})
    }

    return (
        <div style={{flex: '1'}}>
            <div>
                {Object.keys(savedData).length < 18 ? <ProgressBar now={(Object.keys(savedData).length / 18) * 100} label={`${Object.keys(savedData).length}/18`}/> : <Button onClick={() => handleSubmit()}>Submit</Button>}
                <Display savedData={savedData} ></Display>
            </div>
            <Modal show={selected} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selected}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlSelect2" >
                            <Form.Label>General quality of the part</Form.Label>
                            <Form.Control as="select" multiple onChange={(ev) =>
                            {
                                let temp = data;
                                temp.condition = ev.target.value
                                setData(temp)
                            }}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Notes</Form.Label >
                            <Form.Control as="textarea" rows={3} onChange={(ev) =>
                            {
                                let temp = data;
                                temp.notes = ev.target.value
                                setData(temp)
                            }} defaultValue={savedData[selected] ? savedData[selected].notes : data.notes} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={(ev) =>
                    {
                        handleSaveClick(ev)
                    }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Input;
