import '../App.css';
import {useEffect, useState} from "react";
import {deleteNotesAPIMethod, getNotesAPIMethod, postNoteAPIMethod, updateNotesAPIMethod} from "../api/client";
import Modal from "./Modal";
import React from 'react'
import ReactDom from 'react-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import useWindowDimensions from "./UseWindowDimensions";
import Memo from "./Memo";

function Main() {

    const [notes, setNotes] = useState([]);
    const [currMemo, setCurrMemo] = useState(-1);
    const [searchKey, setSearchKey] = useState("");
    const [backToggle, setbackToggle] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false);
    const [searchToggle, setSearchToggle] = useState(false); //false when searchKey.length == 0
    const [renderEffect, setRenderEffect] = useState(false);

    //init val from server
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
    }
    let handleChange2 = (e) => {
        setSearchKey(e.target.value);
    }

    const selectNote = (i) => {
        setCurrMemo(i);
        setbackToggle(!backToggle);
    }

    const addNote = () => {
        setSearchKey("");
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
        const newItem = {
            num: uidGen(),
            lastUpdatedDate: todayD,
            text: nText
        };
        const newArr = [...notes.slice(0, findNoteIndex(currMemo)), ...notes.slice(findNoteIndex(currMemo)+1), newItem];
        setNotes(newArr);

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
    const filterItems = (arr, query) => {
        return arr.filter(el => el.text.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    }

    let sorted = notes.sort(function (a,b) {
        return b["num"] - a["num"]
    })

    console.log(sorted)
    console.log(filterItems(sorted, "1"));
    sorted.map((note) => {
        console.log(note);
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
                    <li>
                        <div className="searchTab">
                            <button>
                                <span className="material-icons">search</span>
                            </button>
                            <label style={{fontWeight: 'small'}}>Search all notes: </label>
                            <input type="text"
                                   id="iSearch"
                                   name="Search"
                                   value = {searchKey}
                                   style={{border: 'none'}}
                                   onChange={handleChange2}>
                            </input>
                        </div>
                    </li>
                    <li className= "memos">
                        <ul style={{padding:0, margin: 0}}>
                            {(searchKey.length !== 0)?
                                //search enabled
                                ((filterItems(sorted, searchKey))?filterItems(sorted, searchKey).map(memo => (
                                    <Memo
                                        lastUpdatedDate={memo.lastUpdatedDate}
                                        text={memo.text}
                                        id={memo.num}
                                        selectNote = {selectNote}
                                        currMemo = {currMemo}
                                    />)) : <></>):
                                //search disabled
                                ((sorted)?sorted.map(memo => (
                                    <Memo
                                        lastUpdatedDate={memo.lastUpdatedDate}
                                        text={memo.text}
                                        id={memo.num}
                                        selectNote = {selectNote}
                                        currMemo = {currMemo}
                                    />
                                )):<></>)
                            }


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

export default Main;
