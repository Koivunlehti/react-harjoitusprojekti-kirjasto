import {Link} from "react-router-dom"

const NavigationBar = (props) => {
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
            </ul>
        </nav>
    )
}

export default NavigationBar