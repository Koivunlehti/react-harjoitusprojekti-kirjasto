import {useNavigate} from "react-router-dom";
import {useState} from "react";

import loginService from "../services/logins"

const Login = (props) => {
    const [loginInfo, setLoginInfo] = useState({"name":"","password":""});
    const navigate = useNavigate();

    if(props.isLoggedIn.user)
        navigate("/");

    const click = (event) => {
        event.preventDefault();
        if (event.target.name === "register") {
            loginService.register(loginInfo)
            .then((user) => {
                console.log(user)
            })
            .catch((error) => {
                console.log(error)
            })
        } else {
            loginService.login(loginInfo)
            .then((user) => {
                props.login(user)
                console.log(user)
                sessionStorage.setItem("user",JSON.stringify(user))
                navigate("/");
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

    const onChange = (event) => {
        setLoginInfo((info) => {
            return {
                ...info,
                [event.target.name]:event.target.value
            }
        })
    }

    return (
        <div className="container">
            <form >
                <h3>Login</h3>
                <div className="mb-3">
                    <label className="form-label" htmlFor="name">Username</label>
                    <input className="form-control" type="text" id="name" name="name" onChange={onChange} value={loginInfo.username}></input>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input className="form-control" type="password" id="password" name="password" onChange={onChange} value={loginInfo.password}></input>
                </div>
                <div className="d-flex">
                    <button className="btn btn-outline-success flex-fill" onClick={click} name="login">Login</button>
                    <button className="btn btn-outline-primary flex-fill" onClick={click} name="register">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Login