import axios from "axios";

const url = process.env.REACT_APP_BACKEND + "/api/books";

const getAll = () => {
    
    const request = axios.get(url)

    return request.then(response => response.data )
}

const getById = (id) => {
    const request = axios.get(url + "/" + id)

    return request.then(response => response.data )
}

const getByCategoryId = (id) => {
    const request = axios.get(url + "/category/" + id)

    return request.then(response => response.data )
}

export default {getAll, getById, getByCategoryId}