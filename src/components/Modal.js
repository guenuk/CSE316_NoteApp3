import react, {useEffect, useState} from "react";
import React from "react";

function Modal(props) {
    const [name, setName] = useState();
    const [email,setEmail] = useState();
    const [location,setLocation] = useState();
    const [profileToggle,setProfileToggle] = useState(props.profileToggle);



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
        setProfileToggle(props.profileToggle)
        console.log('useEffect')
    },[props])

    const pClose = () => {
        setProfileToggle(false)
    }

    console.log(profileToggle);

    return(
        <div className="modal" style={{display: profileToggle ? 'block': 'none'}}>
            <div className="modal-content">
                <form className="pForm">
                    <ul className="pList">
                        <li>
                            <div className="pTab">
                                <h2>Edit Profile</h2>
                                <button id="x" onClick={pClose}>X</button>
                            </div>
                        </li>
                        <li>
                            <div className="pTab">
                                <img className="avatar"
                                     src="./profile.JPG"
                                     style={{width: '40px', borderRadius: '50%'}}
                                />
                                <button type="button">Choose New Image</button>
                                <button type="button">Remove Image</button>
                            </div>
                        </li>
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
                        <li>
                            <div className="pTab3">
                                <button className="save" type="submit">Save</button>
                                <button className="logout" type="button">Logout</button>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
};
export default Modal;
