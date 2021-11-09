import React, {useEffect, useState} from 'react'
import '../App.css';
import useWindowDimensions from "./UseWindowDimensions";
import SignUp from "./SignUp";

function Login(){

    const [email, setEmail] = useState();
    const [pw, setPw] = useState();
    const [signT, setSignT] = useState();

    useEffect(() => {
        setSignT(signT);
    },[signT])

    const GetWidth = () => {
        const {width, height} = useWindowDimensions();
        return width;
    };
    console.log(signT)

    let width = GetWidth();

    let handleChange = (prop) => (event) => {
        if (prop === "email"){
            setEmail(event.target.value);
        }
        else if (prop === "pw"){
            setPw(event.target.value);
        }
        else if (prop === 'signT'){
            setSignT(true);
        }
    }

    return (
        <div className='loginPage'>
            <ul style={{listStyle: 'none' , padding: 0}}>
                <h1 style={{textAlign: 'center'}}>
                    Notes
                </h1>
                <h2 style={{textAlign: 'center'}}>
                    Organize all your thoughts in one place.
                </h2>

                <li>
                    <div className='login-content'>
                        <form style = {{textAlign: 'center'}}>
                            <li id="email">
                                <p style={{margin: 0, textAlign: 'left'}}>Email</p>
                                <input type="text"
                                       id="iEmail"
                                       name="Email"
                                       value = {email}
                                       style={{width: '100%' ,height: '20px'}}
                                       onChange={handleChange("email")}></input>
                            </li>
                            <li id="password">
                                <p style={{margin: 0, textAlign: 'left'}}>Password</p>
                                <input type="text"
                                       id="iPw"
                                       name="pw"
                                       value = {pw}
                                       style={{width: '100%', height: '20px'}}
                                       onChange={handleChange("pw")}></input>
                            </li>

                            <li>
                                <button type="submit" style={{width: '100%', height: '35px',border: 'none', borderRadius: '10px' ,backgroundColor: 'rgb(58, 99, 197)',color: '#ffffff'}}>Log in</button>
                            </li>
                            <hr></hr>

                        </form>
                        <li style ={{paddingTop:20, textAlign: 'center'}}>
                            <button onClick={handleChange('signT')} style={{alignItems: 'center', width: '30%', height: '35px',border: 'none', borderRadius: '10px' ,backgroundColor: 'green',color: '#ffffff'}}>Create New Account</button>
                        </li>
                    </div>
                </li>
            </ul>
            <SignUp signT={signT}></SignUp>
        </div>

    );
}

export default Login;