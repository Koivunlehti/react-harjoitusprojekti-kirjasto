import {useNavigate} from "react-router-dom";
import {useState, useReducer} from "react";

import loginService from "../services/logins"
import Message from "./Message";

import messageReducer from "../reducers/messageReducer";

const Login = (props) => {
    const [loginInfo, setLoginInfo] = useState({"name":"","password":""});
    const navigate = useNavigate();
    const [message, messageDispatch] = useReducer(messageReducer, {"success":true, "message":""});

    if(props.isLoggedIn.user)
        navigate("/");

    const show_message = (is_success, message_text, error_data) => {
        if(is_success)
            messageDispatch({"type":"success", "success":is_success, "message":message_text})
        else
            messageDispatch({"type":"failed", "success":is_success, "message":message_text, "data":error_data})
        setTimeout(() => {
            messageDispatch({})}, 5000)
    }

    const click = (event) => {
        event.preventDefault();
        if (event.target.name === "register") {
            loginService.register(loginInfo)
            .then((user) => {
                show_message(true,"Registeration completed succesfully")
                console.log(user)
            })
            .catch((error) => {
                console.log(error)
                show_message(false,"Registeration failed", error.response.data)
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
                show_message(false, "Login failed", error.response.data)
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
            <div className="pt-4">
                <Message message={message}></Message>
            </div>
        </div>
    )
}

export default Login