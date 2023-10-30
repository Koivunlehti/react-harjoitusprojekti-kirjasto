import {useState, useEffect} from "react";
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
            const response = await fetch(process.env.REACT_APP_BACKEND + "/api/categories", {method:"GET"})

            const data = await response.json()
            console.log("Get categories:", data)
            setCategories(data)
        }

        getData()
    }, [])
    
    // Get books of selected category
    useEffect(() => {
        if (selectedCategory === null)
        { return;}
        else {
            const getData = async() => {
                const response = await fetch(process.env.REACT_APP_BACKEND + "/api/books/category/" + selectedCategory, {method:"GET"})

                const data = await response.json()
                console.log("Get books:", data)
                setBooks(data)
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