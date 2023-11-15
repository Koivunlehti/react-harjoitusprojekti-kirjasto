import {useState, useEffect, useReducer} from "react"
import {useNavigate} from "react-router-dom";

import CategoryRow from "./CategoryRow"
import BookRow from "./BookRow"
import Message from "./Message";

import categoryService from "../services/categories"
import bookService from "../services/books"

import messageReducer from "../reducers/messageReducer";
import categoryReducer from "../reducers/categoryReducer";

const AdminPage = (props) => {
    
    const navigate = useNavigate();
    
    const [categories, categoriesDispatch] = useReducer(categoryReducer,[])
    const [books, setBooks] = useState([]);
    const [category, setCategory] = useState({"name":"","description":""});
    const [book, setBook] = useState({
        "name":"",
        "writer":"",
        "publisher":"",
        "year":"",
        "page_amount":"",
        "category_id":"",
        "description":"",
        "loaned":""
    });
    const [message, messageDispatch] = useReducer(messageReducer, {"success":true, "message":""});
    

    // Get all categories
    useEffect(() => {
        if(!props.isLoggedIn.user)
            navigate("/");

        categoryService.getAll()
        .then(categories => {
            categoriesDispatch({"type":"create", "categories":categories})
            console.log("Get categories:", categories);
        })
        .catch ((error) => {
            console.log("Cannot get categories", error)
            show_message(false,"Cannot get categories", error.response.data)
        })
    }, [])

    // Get all books
    useEffect(() => {
        bookService.getAll()
        .then(books => {
            setBooks(books);
            console.log("Get books:", books);
        })
        .catch ((error) => {
            console.log("Cannot get books", error)
            show_message(false,"Cannot get books", error.response.data)
        })
    }, [])

    // Categories input fields onChange handler
    const onChangeNewCat = (event) => {
        setCategory((category) => {
            return {
                ...category,
                [event.target.name]:event.target.value
            }
        })
    }

    // A function for showing messages 
    const show_message = (is_success, message_text, error_data) => {
        if(is_success)
            messageDispatch({"type":"success", "success":is_success, "message":message_text})
        else
            messageDispatch({"type":"failed", "success":is_success, "message":message_text, "data":error_data})
        setTimeout(() => {
            messageDispatch({})}, 5000)
    }

    // Books input fields onChange handler
    const onChangeNewBook = (event) => {
        setBook((book) => {
            return {
                ...book,
                [event.target.name]:event.target.value
            }
        })
    }

    // Adding new categories button click
    const handleCategoryAddNew = () =>{
        categoryService.createCategory(category, props.isLoggedIn.token)
        .then((category) => {
            categoriesDispatch({"type":"add", "category":category})
            setCategory({
                name:"",
                description:""})
            show_message(true, "New category added successfully")
        })
        .catch((error) => {
            console.log(error)
            show_message(false, "Adding new category failed", error.response.data)
        })
    }

    // Updating categories button click
    const handleCategoryUpdate = (id, category) =>{
        categoryService.updateCategory(id, category, props.isLoggedIn.token)
        .then((updatedCategory) => {
            categoriesDispatch({"type":"update", "category":{"_id":id,"name":category.name,"description":category.description,"__v":0}})
            show_message(true, "Category updated successfully")
        })
        .catch((error) => {
            console.log(error)
            show_message(false, "Updating category failed", error.response.data)
        })
    }

    // Deleting categories button click
    const handleCategoryDelete = (id) =>{
        categoryService.deleteCategory(id, props.isLoggedIn.token)
        .then((deletedCategory) => {
            categoriesDispatch({"type":"delete", "id":id})
            show_message(true, "Category deleted successfully")
        })
        .catch((error) => {
            console.log(error)
            show_message(false, "Deleting category failed", error.response.data)
        })
    }

    // Adding new books button click
    const handleBookAddNew = () => {
        bookService.createBook(book, props.isLoggedIn.token)
        .then((newBook) => {
            setBooks(books.concat(newBook))
            setBook(
            {
                "name":"",
                "writer":"",
                "publisher":"",
                "year":"",
                "page_amount":"",
                "category_id":"",
                "description":"",
                "loaned":""
            })
            show_message(true, "New book added successfully")
        })
        .catch((error) => {
            console.log(error)
            show_message(false, "Adding new book failed", error.response.data)
        })
    }

    // Updating books button click
    const handleBookUpdate = (id, book) => {
        bookService.updateBook(id, book, props.isLoggedIn.token)
        .then((updatedBook) => {
            setBooks(books.map(book => book._id === updatedBook._id ? updatedBook : book))
            show_message(true, "Book updated successfully")
        })
        .catch((error) => {
            console.log(error)
            show_message(false, "Updating book failed", error.response.data)
        })
    }

    // Deleting books button click
    const handleBookDelete = (id) => {
        bookService.deleteBook(id, props.isLoggedIn.token)
        .then((deletedBook) => {
            setBooks(books.filter(book => book._id !== id))
            show_message(true, "Book deleted successfully")
        })
        .catch((error) => {
            console.log(error)
            show_message(false, "Deleting book failed", error.response.data)
        })
    }

    return (
        <div className="container">
            <h3>Admin</h3>
            <hr></hr>
            <h4>Manage categories:</h4>
            <div className="d-inline-flex">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Category name</th>
                            <th colSpan={3}>Description</th>
                        </tr>
                    </thead>       
                    <tbody>
                        {categories.map(category => <CategoryRow key={category._id} category={category} handleCategoryUpdate={handleCategoryUpdate} handleCategoryDelete={handleCategoryDelete} admin={props.isLoggedIn.admin}/>)}
                    </tbody>
                    <tfoot>                        
                        <tr>
                            <td><input type="text" id="name" name="name" onChange={onChangeNewCat} value={category.name}></input></td>
                            <td><textarea id="description" name="description" value={category.description} onChange={onChangeNewCat} /></td>
                            <td colSpan={2}><button className="btn btn-outline-primary" onClick={handleCategoryAddNew}>Add new category</button></td>
                        </tr>
                    </tfoot>
                </table>
            </div> 
            <Message message={message}></Message>
            <h4>Manage books:</h4>
            <div className="" style={{overflow:"auto", whiteSpace:"nowrap"}}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Book name</th>
                            <th>Writer</th>
                            <th>Publisher</th>
                            <th>Year of publish</th>
                            <th>Page amount</th>
                            <th>Category id</th>
                            <th>Description</th>
                            <th colSpan={3}>Loaned</th>
                        </tr>
                    </thead>       
                    <tbody>
                        {books.map(book => <BookRow key={book._id} book={book} categories={categories} 
                            handleBookUpdate={handleBookUpdate} handleBookDelete={handleBookDelete} admin={props.isLoggedIn.admin} />)}
                        
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><input type="text" name="name" value={book.name} onChange={onChangeNewBook} /></td>
                            <td><input type="text" name="writer" value={book.writer} onChange={onChangeNewBook} /></td>
                            <td><input type="text" name="publisher" value={book.publisher} onChange={onChangeNewBook} /></td>
                            <td><input type="number" name="year" value={book.year} onChange={onChangeNewBook} /></td>
                            <td><input type="number" name="page_amount" value={book.page_amount} onChange={onChangeNewBook} /></td>
                            <td><select name="category_id" onChange={onChangeNewBook} value={book.category_id}>
                                {categories.map(category => <option key={category.name} name={category.name} value={category._id}>{category.name}</option>)}
                                <option name="no_category" value="">No Category</option>
                            </select></td>
                            <td><textarea name="description" value={book.description} onChange={onChangeNewBook} /></td>
                            <td><input type="text" name="loaned" value={book.loaned} onChange={onChangeNewBook} /></td>
                            <td colSpan={2}>
                                <button className="btn btn-outline-primary" onClick={handleBookAddNew}>Add new book</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <Message message={message}></Message>
        </div>
    )
}

export default AdminPage