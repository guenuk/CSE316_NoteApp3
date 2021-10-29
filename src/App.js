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

function App() {

    // testcode
    let test = [
        {id: 6, lastUpdatedDate: "10/28/2021", text: "New Note"},
        {id: 4, lastUpdatedDate: "8/17/2021", text: "This is a note with a long line of text"},
        {id: 2, lastUpdatedDate: "8/10/2021", text: "CSE316"},
        {id: 0, lastUpdatedDate: "7/16/2021", text: "CSE416"},
    ];

    // getNotesAPIMethod().then((note) => {
    //     localStorage.setItem('NOTE', JSON.stringify(note));
    // })

    const [notes, setNotes] = useState([]);
    // const [notes, setNotes] = useState(test);
    const [currMemo, setCurrMemo] = useState(-1);
    const [backToggle, setbackToggle] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false);

    const [renderEffect, setRenderEffect] = useState(false);

    useEffect(()=>{
        getNotesAPIMethod().then((note) => {
            setNotes(note);
        })
    },[]);


    //for rerendering
    useEffect(()=> {
        getNotesAPIMethod().then((note) => {
            setNotes(note);
        })
    },[renderEffect])

    // useEffect(()=> {
    //     getNotesAPIMethod().then((note) => {
    //         setNotes(note);
    //     })
    // },[currMemo])

    // helpers

    const uidGen = () => {
        let curr = JSON.parse(localStorage.getItem('UID'));
        localStorage.setItem('UID', curr+1);
        return curr;
    }

    const findNote = (id) => {
        let i =0;
        // let result = -1;
        let result = ""
        notes.map(note => {
            if(note.num == id){
                result = notes[i].text;
            }
            i++;
        })
        return result;
    }
    const findNoteIndex = (num) => {
        let i =0;
        let result = -1;
        notes.map(note => {
            if(note.num == num){
                result = i;
                return result;
            }
            i++;
        })
        return result;
    }

    const GetWidth = () => {
        const {width, height} = useWindowDimensions();
        return width;
    };
    let width = GetWidth();

    // essentials

    let handleChange = (e) => {
        editNote(e.target.value);
        // setNotes(JSON.parse(localStorage.getItem('NOTE')));
    }

    const selectNote = (i) => {
      setCurrMemo(i);
    }

    const addNote = () => {
        const today = new Date();
        const todayD = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
        const newItem = {
            num: uidGen(),
            lastUpdatedDate: todayD,
            text: 'New Note'
        };
        console.log(notes,'post START');
        const newArr = [...notes, newItem];
        setNotes(newArr);
        setCurrMemo(newItem.num);
        postNoteAPIMethod(newItem).then(()=>{
            console.log(notes,'post END');
        });
    };

    const editNote = (nText) => {
        const today = new Date();
        const todayD = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
        // console.log(currMemo)
        // console.log(findNoteIndex(currMemo));
        // console.log(notes);
        // getNotesAPIMethod().then((note)=> {
        //     console.log(note);
        // })
        // setRenderEffect(!renderEffect);
        console.log(currMemo)

        const newItem = {
            num: uidGen(),
            lastUpdatedDate: todayD,
            text: nText
        };
        const newArr = [...notes.slice(0, findNoteIndex(currMemo)), ...notes.slice(findNoteIndex(currMemo)+1), newItem];
        setNotes(newArr);

        // notes[findNoteIndex(newItem.num)] = newItem;
        // setRenderEffect(!renderEffect)

        getNotesAPIMethod().then((note)=> {
            const findIndex = (num) => {
                let i =0;
                let result = -1;
                note.map(n => {
                    if(n.num == num){
                        result = i;
                        return result;
                    }
                    i++;
                })
                return result;
            }
            console.log(currMemo);
            console.log(findIndex(currMemo));
            updateNotesAPIMethod(note[findIndex(currMemo)], newItem).then({
            })
        })
        setCurrMemo(newItem.num);
    };

    const deleteNote = () => {
        if(currMemo != -1){
            const newArr = [...notes.slice(0, findNoteIndex(currMemo)), ...notes.slice(findNoteIndex(currMemo)+1)];
            setNotes(newArr);

            getNotesAPIMethod().then((note) => {
                const findIndex = (num) => {
                    let i =0;
                    let result = -1;
                    note.map(n => {
                        if(n.num == num){
                            result = i;
                            return result;
                        }
                        i++;
                    })
                    return result;
                }
                deleteNotesAPIMethod(note[findIndex(currMemo)]).then(()=>{
                    setCurrMemo(-1);
                });
            })
        }


    }

    console.log(notes);
    let tempC = currMemo;
    let temp = findNote(currMemo);
    let sorted = notes.sort(function (a,b) {
        return b["num"] - a["num"]
    })
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

                    <button onClick={()=> deleteNote()}>
                        <span className="material-icons">delete_outline</span>
                    </button>
                </div>
            </li>
            <li className= "memos">
                <ul style={{padding:0, margin: 0}}>
                    {/*{(notes)?notes.map(memo => (*/}
                    {/*    <Memo*/}
                    {/*          date={memo.lastUpdatedDate}*/}
                    {/*          text={memo.text}*/}
                    {/*          id={memo.num}*/}
                    {/*          selectNote = {selectNote}*/}
                    {/*          currMemo = {currMemo}*/}
                    {/*    />*/}
                    {/*)):<></>}*/}
                    {(sorted)?sorted.map(memo => (
                        <Memo
                            lastUpdatedDate={memo.lastUpdatedDate}
                            text={memo.text}
                            id={memo.num}
                            selectNote = {selectNote}
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
                    <button onClick={() => addNote()}>
                        <span className="material-icons">note_add</span>
                    </button>
                </div>
            </li>
            <li className= "memoInput" style={{display: 'flex'}}>
                <div className="memo" >
                    <input type="text"
                           onChange={handleChange}
                           value={currMemo==-1? "": findNote(currMemo)}
                           style={{visibility: 'visible', border: 'none'}}>
                    </input>
                </div>
                <div className="markDown" style={{padding:0, margin: 0 }}>
                    <ReactMarkdown children={currMemo == -1 ? "":findNote(currMemo)} remarkPlugins={[remarkGfm]} />
                </div>
            </li>
        </ul>
      </div>
        <Modal profileToggle = {profileToggle}></Modal>
    </div>
  );
}

export default App;
