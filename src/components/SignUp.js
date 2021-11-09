import react, {useEffect, useState} from "react";
import React from "react";

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
            <div className="signUp-content">
                <form>
                    <ul>
                        <li>
                            <div>
                                <h2>Sign Up</h2>
                                <button id="x" >X</button>
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
                        <li id="password">
                            <p style={{margin: 0}}>Password</p>
                            <input type="text"
                                   id="iPw"
                                   name="pw"
                                   value = {pw}
                                   onChange={handleChange("pw")}></input>
                        </li>
                        <li>
                            <div>
                                <button type="submit">Save</button>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
};
export default SignUp;
