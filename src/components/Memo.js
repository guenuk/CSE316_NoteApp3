import react, {useEffect, useState} from "react";
import React from "react";
import {getNotesAPIMethod} from "../api/client";

function Memo(props){

    const[id, setId] = useState(props.id);
    const[text, setText] = useState(props.text);
    const[date, setDate] = useState(props.lastUpdatedDate);
    const[currMemo, setCurrMemo] = useState(props.currMemo);

    useEffect(()=>{
        setId(props.id);
        setDate(props.lastUpdatedDate);
        setText(props.text);
        setCurrMemo(props.currMemo);
    },[props]);


    return (
        <li className="memoList" style={{padding:0, margin: 0, backgroundColor: id == currMemo ? 'rgb(229, 241, 253)' : 'transparent'}}>
            <button style={{backgroundColor: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer'}}
                    onClick={()=> props.selectNote(id)}>
                <p className= "memoPara">
                    <h2 className= "memoHead" style={{fontSize: 'small'}}>{text}</h2>
                    {date}
                </p>
            </button>
        </li>
    );
}
export default Memo;