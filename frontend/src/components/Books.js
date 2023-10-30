import {useState, useEffect} from "react";
import Category from "./Category";

const Books = () => {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [books, setBooks] = useState([])

    useEffect(() => {
        const getData = async() => {
            const response = await fetch(process.env.REACT_APP_BACKEND + "/api/categories", {method:"GET"})

            const data = await response.json()
            console.log(data)
            setCategories(data)
        }

        getData()
    }, [])

    useEffect(() => {
        if (selectedCategory === null)
        { return;}
        else {
            const getData = async() => {
                console.log("Get Books")
                const response = await fetch(process.env.REACT_APP_BACKEND + "/api/books/category/"+selectedCategory, {method:"GET"})

                const data = await response.json()
                console.log(data)
                setBooks(data)
            }
            getData()
        }
       
    }, [selectedCategory])

    const handleCategoryClick = (id) => {
        console.log(id)
        setSelectedCategory(id)
    }

    const handleBackClick =() => {
        setSelectedCategory(null)
        setBooks([])
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
        return (
            <div>
                <p>Selected Category: {categories.map(category => category._id === selectedCategory ? category.name : "")}</p>
                {books.map(book => <p key={book._id}>{book.name}</p>)}
                <button onClick={handleBackClick}>Back to Categories</button>
            </div>
        )
    }
}

export default Books;