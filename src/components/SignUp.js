import react, {useEffect, useState} from "react";
import React from "react";
import {registerUserAPIMethod} from "../api/client";

function SignUp(props) {
    const [name, setName] = useState();
    const [email,setEmail] = useState();
    const [pw,setPw] = useState();
    const [signT, setSignT] = useState(props.signT);

    useEffect(() => {

    },[])

    useEffect(()=>{
        setSignT(props.signT)
    },[props])

    const testRegister = () => {
        const user1 = {
            "password" : pw,
            "email" : email,
            "name" : name
        }
        registerUserAPIMethod(user1).then();
    }

    let handleChange = (prop) => (event) => {
        if (prop === "name"){
            setName(event.target.value);

        }
        else if (prop === "email"){
            setEmail(event.target.value);

        }
        else if (prop === "pw"){
            setPw(event.target.value);

        }
    }

    return(
        <div className="signUp" style={{display: signT ? 'block': 'none'}}>
            <div className="signUp-content" >
                <form>
                    <li>
                        <div style={{display: 'flex' ,justifyContent: 'space-between'}}>
                            <h2>Sign Up</h2>
                            <button id="x" style={{border: 'none', background: 'transparent', justifyContent: 'space-between'}}>X</button>
                        </div>
                    </li>
                    <li id="name">
                        <p style={{margin: 0}}>Name</p>
                        <input type="text"
                               id="iName"
                               name="Name"
                               value = {name}
                               style={{width: '100%', alignItems: 'center'}}
                               onChange={handleChange("name")}></input>
                    </li>
                    <li id="email">
                        <p style={{margin: 0}}>Email</p>
                        <input type="text"
                               id="iEmail"
                               name="Email"
                               value = {email}
                               style={{width: '100%', alignItems: 'center'}}
                               onChange={handleChange("email")}></input>
                    </li>
                    <li id="password">
                        <p style={{margin: 0}}>Password</p>
                        <input type="text"
                               id="iPw"
                               name="pw"
                               value = {pw}
                               style={{width: '100%', alignItems: 'center'}}
                               onChange={handleChange("pw")}></input>
                    </li>
                    <li>
                        <button onClick={testRegister} type="submit" style={{width: '30%', height: '35px',border: 'none', borderRadius: '10px' ,backgroundColor: 'green',color: '#ffffff'}}>Save</button>
                    </li>
                </form>
            </div>
        </div>
    )
};
export default SignUp;
