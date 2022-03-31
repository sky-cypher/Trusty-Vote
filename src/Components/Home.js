import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";

const Home = () => {

    // const promptList = ["Who is better ?"];
    const [promptList, changePromptList] = useState([])

    useEffect(() => {
        const getPrompts = async () => {
            changePromptList(await window.contract.getAllPrompts())
            console.log(await window.contract.getAllPrompts())
        }
        getPrompts()
    }, [])

    return (
        <Container>
            <Table style={{ margin: "5vh" }} striped bordered hover>
                <thead>
                    <tr>
                        <th> # </th>
                        <th> List of polls </th>
                        <th> Go to poll </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        promptList.map((el, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td> {el} </td>
                                    <td> {" "}<Button
                                        href='/PollingStation'
                                        onClick={() => localStorage.setItem('prompt', el)}>
                                        Go to poll </Button>
                                    </td>
                                </tr>
                            );
                        })
                    }

                </tbody>
            </Table>
        </Container>
    );
};

export default Home;
