import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";

import CategoryRow from "./CategoryRow"
import BookRow from "./BookRow"

import categoryService from "../services/categories"
import bookService from "../services/books"

const AdminPage = (props) => {
    
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    const [catName, setCatName] = useState("");

    const [book, setBook] = useState({
        "name":"",
        "writer":"",
        "publisher":"",
        "page_amount":"",
        "category_id":"",
        "loaned":""
    });

    useEffect(() => {
        if(!props.isLoggedIn.user)
            navigate("/");

        categoryService.getAll()
        .then(categories => {
            setCategories(categories);
            if (categories.length > 0)
                setBook((book) => {
                    return {
                        ...book,
                        "category_id":categories[0]._id
                    }
                })
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

    const onChangeNewBook = (event) => {
        setBook((book) => {
            return {
                ...book,
                [event.target.name]:event.target.value
            }
        })
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

    const handleBookAddNew = () => {
        bookService.createBook(book, props.isLoggedIn.token)
        .then((newBook) => {
            setBooks(books.concat(newBook))
            setBook(
            {
                "name":"",
                "writer":"",
                "publisher":"",
                "page_amount":"",
                "category_id":categories.length > 0 ? categories[0]._id: "",
                "loaned":""
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleBookUpdate = (id, book) => {
        bookService.updateBook(id, book, props.isLoggedIn.token)
        .then((updatedBook) => {
            setBooks(books.map(book => book._id === updatedBook._id ? updatedBook : book))
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleBookDelete = (id) => {
        bookService.deleteBook(id, props.isLoggedIn.token)
        .then((deletedBook) => {
            setBooks(books.filter(book => book._id !== id))
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <h2>Adminpage</h2>
            <h4>Manage categories:</h4>
            <table>
                <thead>
                    <tr>
                        <th>Category name</th>
                    </tr>
                </thead>       
                <tbody>
                    {categories.map(category => <CategoryRow key={category._id} category={category} handleCategoryUpdate={handleCategoryUpdate} handleCategoryDelete={handleCategoryDelete} admin={props.isLoggedIn.admin}/>)}
                    <tr>
                        <td><input type="text" id="category" name="category" onChange={onChangeNewCat} value={catName}></input></td>
                        <td><button onClick={handleCategoryAddNew}>Add new category</button></td>
                    </tr>
                </tbody>
            </table> 
            <h4>Manage books:</h4>
            <table>
                <thead>
                    <tr>
                        <th>Book name</th>
                        <th>Writer</th>
                        <th>Publisher</th>
                        <th>Page amount</th>
                        <th>Category id</th>
                        <th>Loaned</th>
                    </tr>
                </thead>       
                <tbody>
                    {books.map(book => <BookRow key={book._id} book={book} categories={categories} 
                        handleBookUpdate={handleBookUpdate} handleBookDelete={handleBookDelete} admin={props.isLoggedIn.admin} />)}
                    <tr><td><input type="text" name="name" value={book.name} onChange={onChangeNewBook} /></td>
                        <td><input type="text" name="writer" value={book.writer} onChange={onChangeNewBook} /></td>
                        <td><input type="text" name="publisher" value={book.publisher} onChange={onChangeNewBook} /></td>
                        <td><input type="number" name="page_amount" value={book.page_amount} onChange={onChangeNewBook} /></td>
                        <td><select name="category_id" onChange={onChangeNewBook} value={categories.length > 0 ? categories[0]._id : ""}>
                            {categories.map(category => <option key={category.name} name={category.name} value={category._id}>{category.name}</option>)}
                        </select></td>
                        <td><input type="text" name="loaned" value={book.loaned} onChange={onChangeNewBook} /></td>
                        <td><button onClick={handleBookAddNew}>Add new book</button></td>
                    </tr>
                </tbody>
            </table>   
        </>
    )
}

export default AdminPage