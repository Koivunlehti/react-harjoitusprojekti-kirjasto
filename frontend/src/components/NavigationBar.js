import {Link} from "react-router-dom"

const NavigationBar = (props) => {
    return (
        <nav>
            <h3>Library</h3>
            <ul>
                <li>
                    <Link to="/">Homepage</Link>
                </li>
                <li>
                    <Link to="/books">Books</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavigationBar