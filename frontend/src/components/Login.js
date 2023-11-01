import {useNavigate} from "react-router-dom";

const Login = (props) => {
    const navigate = useNavigate();

    if(props.isLoggedIn)
        navigate("/");

    const click = (event) => {
        event.preventDefault();
        props.login(true);
        sessionStorage.setItem("loggedIn", "true")
        navigate("/");
    }

    return (
        <form >
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username"></input>
            <label htmlFor="password">Password</label>
            <input type="text" id="password" name="password"></input>
            <button onClick={click}>Login</button>
            <button onClick={click}>Register</button>
        </form>
    )
}

export default Login