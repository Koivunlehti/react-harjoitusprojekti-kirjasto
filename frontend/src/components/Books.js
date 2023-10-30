import {useState, useEffect} from "react";
import axios from "axios"

import Category from "./Category";
import Book from "./Book";
import BookDetails from "./BookDetails";

const Books = () => {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
 
    // Get Categories
    useEffect(() => {
        const getData = async() => {
            axios.get(process.env.REACT_APP_BACKEND + "/api/categories")
            .then(response => {
                setCategories(response.data)
                console.log("Get categories:", response.data)
            })
        }
        getData()
    }, [])
    
    // Get books of selected category
    useEffect(() => {
        if (selectedCategory === null)
        { 
            return
        }
        else {
            const getData = async() => {
                axios.get(process.env.REACT_APP_BACKEND + "/api/books/category/" + selectedCategory)
                .then(response => {
                    setBooks(response.data)
                    console.log("Get books:", response.data)
                })
            }
            getData()
        }
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
                    <BookDetails book={selectedBook} handleClick={handleBookDetailsBackClick}/>
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