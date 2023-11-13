import {useState, useEffect} from "react";
import bookService from "../services/books"
import BookRow from "./BookRow";
import Message from "./Message";

import {useNavigate} from "react-router-dom";

const LoanedBooks = (props) => {
    const [loanedBooks, setLoanedBooks] = useState([])
    const [message, setMessage] = useState({"success":true, "message":""})

    const navigate = useNavigate();

    const show_message = (is_success, message_text, error_data) => {
        if(!is_success)
            if (error_data.Message)
                setMessage({"success":is_success, "message":`${message_text}: ${error_data.Message}`})
            else
                setMessage({"success":is_success, "message":`${message_text}: ${error_data.error}`})
        else
            setMessage({"success":is_success, "message":message_text})        
        setTimeout(() => {
            setMessage({"success":true, "message":""})
        }, 5000)
    }

    useEffect(() => {
        if(!props.isLoggedIn.user)
            navigate("/");

        bookService.getByLoaningUser(props.isLoggedIn.user)
        .then(books => {
            setLoanedBooks(books)
        })
        .catch((error) =>{
            console.log(error)
            show_message(false, "Cannot get loaned books", error.response.data)
        })

    },[]);

    const returnBookHandler = (id) => {
        bookService.returnBook(id, props.isLoggedIn.token)
        .then((book) =>{
            setLoanedBooks(loanedBooks.filter(book => book._id !== id))
            show_message(true, "Book has been returned")
        })
        .catch((error) => {
            console.log(error)
            show_message(false, "Returning book failed", error.response.data)
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
            <Message message={message}/>
        </div>
    )
}

export default LoanedBooks