import "regenerator-runtime/runtime";
import React from "react";
import { login, logout } from "./utils";
import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, Button, Alert } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import Home from "./Components/Home";
import PollingStation from "./Components/PollingStation";
import NewPoll from "./Components/NewPoll";
import Results from "./Components/Results";

//import getConfig from "./config";
//const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {

    return (
        <Router>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Trusty-vote</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto"></Nav>
                        <Nav>
                            <Nav.Link href="/NewPoll">New Poll</Nav.Link>
                            <Nav.Link onClick={window.accountId === "" ? login : logout}>
                                {window.accountId === "" ? "Login" : window.accountId}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {
                window.accountId === ""
                    ? <Alert variant="info">
                        <Alert.Heading>Login First</Alert.Heading>
                        <p>
                            You need to be logged in first to use this app
                        </p>
                        <hr />
                        <Button
                            variant='primary'
                            type='submit'
                            onClick={login}>
                            Login
                        </Button>
                    </Alert>

                    : <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/PollingStation" element={<PollingStation />} />
                        <Route path="/NewPoll" element={<NewPoll />} />
                        <Route path="/Results" element={<Results />} />
                    </Routes>
            }
        </Router>
    );
}
