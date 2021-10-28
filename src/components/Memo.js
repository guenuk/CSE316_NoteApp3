import react, {useEffect, useState} from "react";
import React from "react";

function Memo(props){

    const[id, setId] = useState(props.id);
    const[text, setText] = useState(props.text);
    const[date, setDate] = useState(props.lastUpdatedDate);


    return (
        <li className="memoList" style={{padding:0, margin: 0, backgroundColor: id == props.currMemo ? 'rgb(229, 241, 253)' : 'transparent'}}>
            <button style={{backgroundColor: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer'}}>
                    {/*onClick={()=> props.selectNote(id)}>*/}
                <p className= "memoPara">
                    <h2 className= "memoHead" style={{fontSize: 'small'}}>{props.text}</h2>
                    {props.date}
                </p>
            </button>
        </li>
    );
}
export default Memo;