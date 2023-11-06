import axios from "axios";

const url = process.env.REACT_APP_BACKEND;

const getAll = () => {
    
    const request = axios.get(url + "/api/categories")

    return request.then(response => response.data )
}

const createCategory = ( category, token ) => {
    const request = axios.post(url + "/admin/categories", category, {headers:{"Content-Type":"application/json","token":token}})
    
    return request.then(response => response.data)
}

const updateCategory = (id, category, token ) => {
    const request = axios.put(url + "/admin/categories/" + id, category, {headers:{"Content-Type":"application/json","token":token}})
    
    return request.then(response => response.data)
}

const deleteCategory = ( id, token ) => {
    const request = axios.delete(url + "/admin/categories/" + id, {headers:{"Content-Type":"application/json","token":token}})
    
    return request.then(response => response.data)
}

export default {getAll, createCategory, updateCategory, deleteCategory}