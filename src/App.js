import './App.css';
import {useEffect, useState} from "react";
import {deleteNotesAPIMethod, getNotesAPIMethod, postNoteAPIMethod, updateNotesAPIMethod} from "./api/client";
import Modal from "./components/Modal";
import React from 'react'
import ReactDom from 'react-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import useWindowDimensions from "./components/UseWindowDimensions";
import Memo from "./components/Memo";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";

const NoMatch = ({location}) => (
    <div>
        <strong>Error!</strong> No route found matching:
        <div>
            <code>{location.pathname}</code>
        </div>
    </div>
);

function App() {
    const [logIn, setLogIn] = useState();
    const [currUser, setCurrUser] = useState();

    useEffect(() =>{
        setLogIn(logIn)
    }, [logIn])
    useEffect(() =>{
        setCurrUser(currUser)
    }, [currUser])

    return (
        <BrowserRouter>
            <div className="App">
                {(logIn)
                    ?<Main setLogin ={setLogIn}
                           currUser = {currUser}></Main>
                    : <Login logIn = {logIn}
                             setCurrUser = {setCurrUser}
                           setLogin = {setLogIn}></Login>}
            </div>
        </BrowserRouter>
    );
}

export default App;
