import react, {useEffect, useState} from "react";
import React from "react";
import {getUsersAPIMethod, updateUsersAPIMethod} from "../api/client";

function Modal(props) {
    const [name, setName] = useState();
    const [email,setEmail] = useState();
    const [location,setLocation] = useState();
    const [profileToggle,setProfileToggle] = useState(props.profileToggle);

    useEffect(() => {
        getUsersAPIMethod().then( user => {
            setName(user[0].name);
            setEmail(user[0].email);
            setLocation(user[0].location);
        })
    },[])



    let handleChange = (prop) => (event) => {
        if (prop === "name"){
            setName(event.target.value);
            const newUser = {
                'name': event.target.value,
                'email' : email,
                'location' : location
            }
            getUsersAPIMethod().then(user => {
                const user1 = user[0];
                updateUsersAPIMethod(user1, newUser).then();
            })
        }
        else if (prop === "email"){
            setEmail(event.target.value);
            const newUser = {
                'name': name,
                'email' : event.target.value,
                'location' : location
            }
            getUsersAPIMethod().then(user => {
                const user1 = user[0];
                updateUsersAPIMethod(user1, newUser).then();
            })
        }
        else if (prop === "location"){
            setLocation(event.target.value);
            const newUser = {
                'name': name,
                'email' : email,
                'location' : event.target.value
            }
            getUsersAPIMethod().then(user => {
                const user1 = user[0];
                updateUsersAPIMethod(user1, newUser).then();
            })
        }
    }

    useEffect(()=>{
        setProfileToggle(props.profileToggle)
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
