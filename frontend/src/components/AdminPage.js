import {useState, useEffect} from "react"

import CategoryRow from "./CategoryRow"
import Book from "./Book"

import categoryService from "../services/categories"
import bookService from "../services/books"

const AdminPage = (props) => {
    
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    const [catName, setCatName] = useState("");

    useEffect(() => {
        categoryService.getAll()
        .then(categories => {
            setCategories(categories);
            console.log("Get categories:", categories);
        })
        .catch ((error) => {
            console.log("Cannot get categories", error)
        })
    }, [])

    useEffect(() => {
        bookService.getAll()
        .then(books => {
            setBooks(books);
            console.log("Get books:", books);
        })
        .catch ((error) => {
            console.log("Cannot get books", error)
        })
    }, [])

    const onChangeNewCat = (event) => {
        setCatName(event.target.value)
    }

    const handleCategoryAddNew = () =>{

        categoryService.createCategory({"name":catName}, props.isLoggedIn.token)
        .then((category) => {
            setCategories(categories.concat(category))
            setCatName("")
        })
        .catch((error) => {
            console.log(error)
        })
    }
    const handleCategoryUpdate = (id, name) =>{
        categoryService.updateCategory(id, {"name":name}, props.isLoggedIn.token)
        .then((updatedCategory) => {
            setCategories(categories.map(category => category._id === updatedCategory._id ? updatedCategory : category))
        })
        .catch((error) => {
            console.log(error)
        })
        
    }
    const handleCategoryDelete = (id) =>{
        categoryService.deleteCategory(id, props.isLoggedIn.token)
        .then((deletedCategory) => {
            setCategories(categories.filter(category => category._id !== id))
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
        <h2>Adminpage</h2>
        <table>
            <thead>
                <tr>
                    <th>Categories</th>
                </tr>
            </thead>       
            <tbody>
                {categories.map(category => <CategoryRow key={category._id} category={category} handleCategoryUpdate={handleCategoryUpdate} handleCategoryDelete={handleCategoryDelete} admin={props.isLoggedIn.admin}/>)}
            </tbody>
        </table>
        <input type="text" id="category" name="category" onChange={onChangeNewCat} value={catName}></input>
        <button onClick={handleCategoryAddNew}>Add new category</button>
        <br />
        <p>Books</p>
        {books.map(book => <Book key={book._id} book={book} handleClick={handleCategoryUpdate}/>)}
        <br />
        <button>Add new</button>
        </>
    )
}

export default AdminPage