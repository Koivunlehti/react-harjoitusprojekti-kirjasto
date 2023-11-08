import {Link, useNavigate} from "react-router-dom"
import loginService from "../services/logins"

const NavigationBar = (props) => {
    const navigate = useNavigate();

    const logout = () => {
        loginService.logout(props.isLoggedIn.token)
        .then(() => {
            props.login({})
            sessionStorage.removeItem("user")
        })
        .catch((error) => {
            console.log(error)
        })
        
    }

    const login = () => {
        navigate("/login")
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container-fluid d-flex justify-content-start">
                <h3 className="navbar-brand">Library</h3>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Homepage</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/books">Books</Link>
                    </li>
                        {props.isLoggedIn.user ? <li className="nav-item"><Link className="nav-link" to="/loaned">Loaned Books</Link></li> : <></> }
                        {props.isLoggedIn.admin ? <li className="nav-item"><Link className="nav-link" to="/admin">Admin stuff</Link></li> : <></>}     
                </ul>
            </div>
            <div className="container-fluid d-flex justify-content-center">
                {props.isLoggedIn.user ? <span className="navbar-text"><strong>Hello {props.isLoggedIn.user}!</strong></span>: <></>}
            </div>
            <div className="">
                {props.isLoggedIn.user ? 
                    <button className="btn btn-outline-danger me-2" type="button" onClick={logout}>Logout</button> : 
                    <button className="btn btn-outline-success me-2" type="button" onClick={login}>Login</button>}
            </div>
        </nav>
    )
}

export default NavigationBar