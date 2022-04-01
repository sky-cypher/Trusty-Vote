import React, { useState, useRef } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";

const NewPoll = () => {

    const [inputList, setinputList] = useState(["", ""]);
    const promptRef = useRef()

    const sendToBlockchain = async () => {
        const prompt = promptRef.current.value
        await window.contract.addPrompt({ prompt: prompt })
        await window.contract.addOptionArray({
            prompt: prompt,
            options: inputList
        })
        window.location.replace(window.location.href + "/../")
    }

    const handleinputchange = (e, index) => {
        const { value } = e.target;
        const list = [...inputList];
        list[index] = value;
        setinputList(list);

    }

    const handleremove = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setinputList(list);
    }

    const handleaddclick = () => {
        setinputList([...inputList, ""]);
    }

    return (
        <Container style={{ marginTop: '10px' }}>
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        ref={promptRef}
                        placeholder='Enter the title'>
                    </Form.Control>
                </Form.Group>
                {
                    inputList.map((_option, index) => {
                        return (
                            <div key={index}>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Option {index + 1}</Form.Label>
                                    <Row>
                                        <Col>
                                            <Form.Control
                                                placeholder={'Enter option ' + (index + 1)}
                                                onChange={option => handleinputchange(option, index)}>
                                            </Form.Control>
                                        </Col>

                                        <Col
                                            md={{ span: 1, offset: 1 }}
                                            sm={{ span: 1, offset: 1 }} >
                                            <Button
                                                className='btn-danger'
                                                onClick={() => handleremove(index)}>
                                                Remove
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </div>
                        )
                    })
                }
                <Button variant='secondary'
                    className='btn-success'
                    onClick={handleaddclick}>
                    Add option
                </Button>{' '}
                <Button variant='primary'
                    onClick={sendToBlockchain}>
                    Submit
                </Button>

            </Form>
        </Container>
    )
};

export default NewPoll;
