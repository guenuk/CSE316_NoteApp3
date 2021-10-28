import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {getNotesAPIMethod} from "./api/client";
import Modal from "./components/Modal";
import React from 'react'
import ReactDom from 'react-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import useWindowDimensions from "./components/UseWindowDimensions";
import Memo from "./components/Memo";

function App() {

    // testcode
    let test = [
        {id: 999, lastUpdatedDate: "10/28/2021", text: "New Note"},
        {id: 999, lastUpdatedDate: "8/17/2021", text: "This is a note with a long line of text"},
        {id: 999, lastUpdatedDate: "8/10/2021", text: "CSE316"},
        {id: 999, lastUpdatedDate: "7/16/2021", text: "CSE416"},
    ];

    const [notes, setNotes] = useState(test);
    const [currMemo, setCurrMemo] = useState(0);
    const [backToggle, setbackToggle] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false);

    useEffect(()=>{

    },[]);

    const GetWidth = () => {
        const {width, height} = useWindowDimensions();
        return width;
    };
    let width = GetWidth();


  return (
    <div className="App" style= {{display:'flex'}}>
      <div className="class1" style={!(backToggle || width>500) ? {display: 'none'} : (backToggle && width<=500) ? {width: '100%', height: '100%'} :{visibility: 'visible'}}>
        <ul className="tabs" style={{margin: 0, padding: 0}}>
            <li>
                <div className="menuTab" style={{display: 'flex'}}>
                    <button onClick={() => setProfileToggle(true)}>
                        <img src= {"./profile.JPG"} style={{width: '40px', borderRadius: '50%'}}/>
                    </button>

                    <button>
                        <p style={{fontWeight: "bold"}}>My Notes</p>
                    </button>

                    <button>
                        <span className="material-icons">delete_outline</span>
                    </button>
                </div>
            </li>
            <li className= "memos">
                <ul style={{padding:0, margin: 0}}>
                    {(notes)?notes.map(memo => (
                        <Memo
                              date={memo.lastUpdatedDate}
                              text={memo.text}
                              id={memo.id}
                              // selectNote = {selectNote}
                              currMemo = {currMemo}
                        />
                    )):<></>}
                </ul>
            </li>
        </ul>
      </div>
      <div className="class2" style={backToggle && width<=500 ? {display: 'none'}: {visibility: 'visible'}}>
        <ul style={{margin: 0, padding: 0}}>
            <li>
                <div className="menuTab2" style={{display: 'flex'}}>
                    <button className="back" style={{visibility: width<500 ? 'visible':'hidden'}} onClick={()=> setbackToggle(!backToggle)}>
                        <span className="material-icons">arrow_back</span>
                    </button>
                    <button>
                        <span className="material-icons">note_add</span>
                    </button>
                </div>
            </li>
            <li className= "memoInput" style={{display: 'flex'}}>
                <div className="memo" >
                    <input type="text"
                           // onChange={handleChange}
                           value={currMemo == -1 ? "":notes[currMemo].text}
                           style={{visibility: 'visible', border: 'none'}}>
                    </input>
                </div>
                <div className="markDown" style={{padding:0, margin: 0 }}>
                    <ReactMarkdown children={currMemo == -1 ? "":notes[currMemo].text} remarkPlugins={[remarkGfm]} />
                </div>
            </li>
        </ul>
      </div>
        <Modal profileToggle = {profileToggle}></Modal>
    </div>
  );
}

export default App;
