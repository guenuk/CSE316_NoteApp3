import react, {useEffect, useState} from "react";
import React from "react";

function Modal(props) {
    const [name, setName] = useState();
    const [email,setEmail] = useState();
    const [location,setLocation] = useState();


    let handleChange = (prop) => (event) => {
        if (prop === "name"){
            setName(event.target.value);
            localStorage.setItem('iName', event.target.value);
        }
        else if (prop === "email"){
            setEmail(event.target.value);
            localStorage.setItem('iEmail', event.target.value);
        }
        else if (prop === "location"){
            setLocation(event.target.value);
            localStorage.setItem('iLocation', event.target.value);
        }
    }
    useEffect(()=>{
        setEmail(localStorage.getItem('iEmail'));
        setName(localStorage.getItem('iName'));
        setLocation(localStorage.getItem('iLocation'));
    },[])

    return(
        <div>
            <li id="name">
                <p style={{margin: 0}}>Name</p>
                <input type="text"
                       id="iName"
                       name="Name"
                       value = {name}
                       onChange={handleChange("name")}></input>
            </li>
            <li id="email">
                <p style={{margin: 0}}>Email</p>
                <input type="text"
                       id="iEmail"
                       name="Email"
                       value = {email}
                       onChange={handleChange("email")}></input>
            </li>
            <li id="location">
                <p style={{margin: 0}}>Location</p>
                <input type="text"
                       id="iLocation"
                       name="Location"
                       value = {location}
                       onChange={handleChange("location")}></input>
            </li>
        </div>
    )
};
export default Modal;
