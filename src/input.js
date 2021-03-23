import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Display({onMount})
{
    const [selected, setSelected] = useState("");
    const [data, setData] = useState({});
    const [savedData, setSavedData] = useState({})


    useEffect(() =>
    {
        onMount([selected, setSelected, savedData, setSavedData],);
    }, [onMount, selected,savedData]);


    return (
        //change to bootstrap component
        <div style={{display:"flex", flexDirection:"column"}}>
            {selected}
            <Form>
                <Form.Group controlId="exampleForm.ControlSelect2" >
                    <Form.Label>General quality of the part</Form.Label>
                    <Form.Control as="select" multiple onChange={(ev) =>
                    {
                        let temp = data;
                        temp.condition = ev.target.value
                        setData(temp)
                        console.log(data)
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
                        console.log(data)
                    }} value={data.notes} />
                    <Button onClick={(ev) => {
                        let temp = savedData;
                        temp[selected] = data
                        setSavedData(temp)
                        console.log(savedData)
                        setData({})
                    }}>Save</Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default Display;
