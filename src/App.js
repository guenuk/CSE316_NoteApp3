import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {getNotesAPIMethod} from "./api/client";
import Modal from "./components/Modal";
import React from 'react'
import ReactDom from 'react-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function App() {

    const [notes, setNotes] = useState();
    const [currMemo, setCurrMemo] = useState();
    const [backToggle, setbackToggle] = useState();

    useEffect(()=>{

    },[]);

  return (
    <div className="App" style= {{display:'flex'}}>
      <div className="class1">
        <ul>
            <li className="menuTab">
                <div style={{display: 'flex'}}>
                    <button>
                        <img className="avatar"
                             src="./profile.JPG"
                        />
                    </button>

                    <button>
                        <h1 className="logo">My Notes</h1>
                    </button>

                    <button>
                        <span className="material-icons">delete_outline</span>
                    </button>
                </div>
            </li>
            <li className= "memos">
                <ul>
                    {/*여기 메모들 iterate*/}
                </ul>
            </li>
        </ul>
      </div>
      <div className="class2">
        <ul>
            <li className="menuTab2">
                <div style={{display: 'flex'}}>
                    <button className="back">
                        <span className="material-icons">arrow_back</span>
                    </button>
                    <button>
                        <span className="material-icons">note_add</span>
                    </button>
                </div>
            </li>
            <li className= "memoInput">
                <div>
                    <input/>
                </div>
                <div className="markDown">
                    <ReactMarkdown>HIHI</ReactMarkdown>
                </div>
            </li>
        </ul>
      </div>

    </div>
  );
}

export default App;
