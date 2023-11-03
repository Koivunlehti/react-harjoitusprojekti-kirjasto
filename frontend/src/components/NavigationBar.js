import {Link} from "react-router-dom"
import loginService from "../services/logins"

const NavigationBar = (props) => {

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

    if (props.isLoggedIn.user) {
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <h3 className="navbar-brand">Library</h3>
                <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Homepage</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/books">Books</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/loaned">Loaned Books</Link>
                    </li>
                    {props.isLoggedIn.admin ? <li> <Link className="nav-link" to="/admin">Admin stuff</Link> </li> : <></>}        
                    <li className="nav-item">
                        <button onClick={logout}>Logout</button>
                    </li>
                </ul>
            </nav>
        )
    } else {
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <h3 className="navbar-brand">Library</h3>
                <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Homepage</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/books">Books</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavigationBar