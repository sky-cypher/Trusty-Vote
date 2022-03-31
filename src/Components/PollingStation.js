import React, { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";

const PollingStation = () => {

    // const optionList = ["Putin", "Biden"];
    const [optionList, changeOptionList] = useState([])
    // const title = 'Who is Better?';
    const prompt = localStorage.getItem('prompt')
    const [didVote, changeDidVote] = useState(false)
    const [selected, changeSelected] = useState(-1)

    useEffect(() => {
        const getInfo = async () => {
            changeOptionList(await window.contract.getOptions({ prompt: prompt }))
            console.log(await window.contract.getOptions({ prompt: prompt }))

            let didUserVote = await window.contract.didParticipate({
                prompt: prompt,
                user: window.accountId
            })
            changeDidVote(didUserVote)
        }
        getInfo()
    }, [])

    const handleInputChange = (e) => {
        changeSelected(e.target.value)
    }

    const addVote = async () => {
        console.log(selected)
        if (selected >= 0) {
            await window.contract.addVote({
                prompt: prompt,
                index: selected
            }).catch((e) => console.log("addVote " + selected + e));

            await window.contract.recordUser({
                prompt: prompt,
                user: window.accountId
            }).catch((e) => console.log("recordUser " + e));

            changeDidVote(true)
        }
    }

    return (
        <Container
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '20px',
                height: '70vh',
            }}>
            <Form style={{
                margin: '1em',
                padding: '2rem',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
            }} >

                <div className='title text-center'>
                    <h3>{prompt}</h3>
                </div>
                <fieldset disabled={didVote}>
                    <Form.Group>
                        {
                            optionList.map((option, index) => {
                                return (
                                    <Form.Check
                                        key={index}
                                        type='radio'
                                        label={option}
                                        value={index}
                                        name='optradio'
                                        onChange={handleInputChange}
                                        style={{ margin: '.5em' }}
                                        className='justify-content-center'
                                    />

                                )
                            })
                        }
                    </Form.Group>
                </fieldset>
                <div className='text-center' >
                    {didVote
                        ? <Button variant="primary"
                            className="btn-success"
                            style={{ margin: '.5em' }} >
                            View Results
                        </Button>

                        : <Button variant="primary"
                            onClick={addVote}
                            style={{ margin: '.5em' }} >
                            Cast Vote
                        </Button>
                    }
                </div>
            </Form>
        </Container>
    )
};

export default PollingStation;
