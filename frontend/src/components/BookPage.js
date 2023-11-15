import {useState, useEffect, useReducer} from "react";

import Category from "./Category";
import Book from "./Book";
import BookDetails from "./BookDetails";
import Message from "./Message";

import categoryService from "../services/categories"
import bookService from "../services/books"

import messageReducer from "../reducers/messageReducer";
import categoryReducer from "../reducers/categoryReducer";

const BookPage = (props) => {

    const [categories, categoriesDispatch] = useReducer(categoryReducer,[])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [message, messageDispatch] = useReducer(messageReducer, {"success":true, "message":""});

    // Get Categories
    useEffect(() => {
        categoryService.getAll()
        .then(categories => {
            categoriesDispatch({"type":"create", "categories":categories})
            console.log("Get categories:", categories);
        })
        .catch((error) => {
            console.log(error)
            show_message(false,"Cannot get categories", error.response.data)
        })
    }, [])

    // Get Books in selected category
    useEffect(() => {
        if (selectedCategory === null)
            return;
        bookService.getByCategoryId(selectedCategory._id)
        .then(books => {
            setBooks(books);
            console.log("Get books:", books);
        })
        .catch((error) => {
            console.log(error)
            show_message(false,"Cannot get books", error.response.data)
        })
    }, [selectedCategory])

    // A function for showing messages
    const show_message = (is_success, message_text, error_data) => {
        if(is_success)
            messageDispatch({"type":"success", "success":is_success, "message":message_text})
        else
            messageDispatch({"type":"failed", "success":is_success, "message":message_text, "data":error_data})
        setTimeout(() => {
            messageDispatch({})}, 5000)
    }

    // Select category button click
    const handleCategoryClick = (category) => {
        setSelectedCategory(category)
    }

    // Return back to categories button click
    const handleBackClick = () => {
        setSelectedCategory(null)
        setBooks([])
    }

    // Open details of the book button click
    const handleBookDetailsClick = (book) => {
        setSelectedBook(book)
    }

    // Loaning books button click
    const handleBookDetailsLoanClick = (loanedBook) => {
        bookService.loanBook(loanedBook._id, props.isLoggedIn.token)
        .then(() => {
            let updatedBook = loanedBook
            updatedBook.loaned = props.isLoggedIn.user
            setBooks(books.map(book => book.id === loanedBook._id ? updatedBook : book))
            show_message(true,"Book has been loaned successfully")
        })
        .catch((error) => {
            console.log(error)
            show_message(false,"Cannot loan this book", error.response.data)
        })
    }

    // Return back from book details button click
    const handleBookDetailsBackClick = () => {
        setSelectedBook(null)
    }

    if (selectedCategory === null) {
        return (
            <div className="container">
                <h3>Book Categories:</h3>
                <Message message={message} />
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {categories.map(category => <Category key={category._id} category={category} handleClick={handleCategoryClick}/>)}
                </div>
            </div>
        )
    }
    else {
        if (selectedBook !== null) {
            return (
                <div className="container">
                    <Message message={message} />
                    <BookDetails book={selectedBook} category={selectedCategory.name} handleClick={handleBookDetailsBackClick} loanBookHandler={handleBookDetailsLoanClick} isLoggedIn={props.isLoggedIn}/>
                </div>
            )
        }
        else {
            return (
                <div className="container">
                    <h3 className="mb-3">Selected Category: {selectedCategory.name}</h3>
                    <Message message={message} />
                    {
                        books.length > 0 ?
                            <div className="row row-cols-1 row-cols-md-4 g-4">
                                {books.map(book => <Book key={book._id} book={book} handleClick={handleBookDetailsClick}/>)}
                            </div> : 
                            <p>Sorry, no books in this category yet...</p>
                    }
                    <button className="btn btn-outline-primary mt-3"onClick={handleBackClick}>Back to Categories</button>
                </div>
            )
        }
    }
}

export default BookPage;