import react, {useEffect, useState} from "react";
import React from "react";
import {getUsersAPIMethod, updateUsersAPIMethod, uploadImageToCloudinaryAPIMethod} from "../api/client";

function Modal(props) {
    const [name, setName] = useState();
    const [email,setEmail] = useState();
    const [location,setLocation] = useState();
    const [profile, setProfile] = useState();
    const [profileToggle,setProfileToggle] = useState(props.profileToggle);

    useEffect(() => {
        getUsersAPIMethod().then( user => {
            setName(user[0].name);
            setEmail(user[0].email);
            setLocation(user[0].location);
            setProfile(user[0].image);
        })
    },[])


    const removeImage = () => {
        setProfile("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
        updateUsersAPIMethod("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg").then();

        //user 연동 필요
    }

    const handleImageSelected = (event) => {
        console.log("New File Selected");
        if (event.target.files && event.target.files[0]) {

            const selectedFile = event.target.files[0];
            console.dir(selectedFile);

            const formData = new FormData();
            const unsignedUploadPreset = 'e9uuow7f'
            formData.append('file', selectedFile);
            formData.append('upload_preset', unsignedUploadPreset);

            console.log("Cloudinary upload");
            uploadImageToCloudinaryAPIMethod(formData).then((response) => {
                console.log("Upload success");
                console.dir(response);
                //update user
                const temp = {image: response.url}
                updateUsersAPIMethod(temp).then(()=>{
                    setProfile(response.url);
                })
            });
        }
    }



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

    const pClose = (e) => {
        e.preventDefault();
        props.setPT(false);
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
                                     src = {profile}
                                     style={{width: '40px', borderRadius: '50%'}}
                                />
                                {/*<label htmlFor="file-upload" className="custom-file-upload">*/}
                                {/*    Choose new Image*/}
                                {/*</label>*/}
                                {/*<input id="file-upload" type="file" name = "image" accept="image/*" id="cloudinary" onChange={handleImageSelected}/>*/}
                                <input id="file-upload" className="custom-file-upload" placeholder="Choose New Image" type="file" name="image" accept="image/*" id="cloudinary" onChange={handleImageSelected}/>
                                <button onClick={removeImage} type="button">Remove Image</button>
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
                                <button onClick={props.logout} className="logout" type="button">Logout</button>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
};
export default Modal;
