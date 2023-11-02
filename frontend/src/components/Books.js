import {useState, useEffect} from "react";

import Category from "./Category";
import Book from "./Book";
import BookDetails from "./BookDetails";

import categoryService from "../services/categories"
import bookService from "../services/books"

const Books = (props) => {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)

    // Get Categories
    useEffect(() => {
        categoryService.getAll()
        .then(categories => {
            setCategories(categories);
            console.log("Get categories:", categories);
        })
    }, [])

    useEffect(() => {
        if (selectedCategory === null)
            return;
        bookService.getByCategoryId(selectedCategory)
        .then(books => {
            setBooks(books);
            console.log("Get books:", books);
        })
    }, [selectedCategory])

    // Select category button click
    const handleCategoryClick = (id) => {
        setSelectedCategory(id)
    }

    // Return back to categories button click
    const handleBackClick = () => {
        setSelectedCategory(null)
        setBooks([])
    }

    // Open details of the book
    const handleBookDetailsClick = (book) => {
        setSelectedBook(book)
    }

    const handleBookDetailsLoanClick = (loanedBook) => {
        bookService.loanBook(loanedBook._id, props.isLoggedIn.token)
        .then(() => {
            let updatedBook = loanedBook
            updatedBook.loaned = props.isLoggedIn.user
            setBooks(books.map(book => book.id === loanedBook._id ? updatedBook : book))
        })
        .catch((error) => {
            console.log(error)
        })
    }

    // Return back from book details
    const handleBookDetailsBackClick = () => {
        setSelectedBook(null)
    }

    if (selectedCategory === null) {
        return (
            <div>
                {categories.map(category => <Category key={category._id} category={category} handleClick={handleCategoryClick}/>)}
                <p>{selectedCategory}</p>
            </div>
        )
    }
    else {
        if (selectedBook !== null) {
            return (
                <div>
                    <BookDetails book={selectedBook} handleClick={handleBookDetailsBackClick} loanBookHandler={handleBookDetailsLoanClick} isLoggedIn={props.isLoggedIn}/>
                </div>
            )
        }
        else {
            return (
                <div>
                    <p>Selected Category: {categories.map(category => category._id === selectedCategory ? category.name : "")}</p>
                    {books.map(book => <Book key={book._id} book={book} handleClick={handleBookDetailsClick}/>)}
                    <button onClick={handleBackClick}>Back to Categories</button>
                </div>
            )
        }
    }
}

export default Books;