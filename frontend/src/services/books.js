import axios from "axios";

const url = process.env.REACT_APP_BACKEND;

const getAll = () => {
    
    const request = axios.get(url + "/api/books")

    return request.then(response => response.data )
}

const getById = (id) => {
    const request = axios.get(url + "/api/books/" + id)

    return request.then(response => response.data )
}

const getByCategoryId = (id) => {
    const request = axios.get(url + "/api/books/category/" + id)

    return request.then(response => response.data )
}

const getByLoaningUser = (username) => {
    const request = axios.get(url + "/api/books/loaned/" + username)

    return request.then(response => response.data )
}

const loanBook = (id, token) => {
    const request = axios.put(url + "/admin/books/loan/" + id, {}, {headers:{"Content-Type":"application/json","token":token}})

    return request.then(response => response.data )
}

const returnBook = (id, token) => {
    const request = axios.put(url + "/admin/books/return/" + id, {}, {headers:{"Content-Type":"application/json","token":token}})

    return request.then(response => response.data)
}

export default {getAll, getById, getByCategoryId, getByLoaningUser, loanBook, returnBook}