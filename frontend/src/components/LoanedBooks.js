import {useState, useEffect} from "react";
import bookService from "../services/books"
import BookRow from "./BookRow";

import {useNavigate} from "react-router-dom";

const LoanedBooks = (props) => {
    const [loanedBooks, setLoanedBooks] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        if(!props.isLoggedIn.user)
            navigate("/");

        bookService.getByLoaningUser(props.isLoggedIn.user)
        .then(books => {
            setLoanedBooks(books)
        })
        .catch((error) =>{
            console.log(error)
        })

    },[]);

    const returnBookHandler = (id) => {
        bookService.returnBook(id, props.isLoggedIn.token)
        .then((book) =>{
            setLoanedBooks(loanedBooks.filter(book => book._id !== id))
        })
        .catch((error) => {
            console.log(error)
        })
        
    }

    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th><h3>Loaned Books</h3></th>
                    </tr>
                </thead>
                <tbody>
                    {loanedBooks.length === 0 ? 
                    <tr><td><p>No loaned books</p></td></tr> : 
                    loanedBooks.map(book => <BookRow key={book._id} book={book} onClick={returnBookHandler}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default LoanedBooks