import axios from "axios";

const url = process.env.REACT_APP_BACKEND + "/api/categories";

const getAll = () => {
    
    const request = axios.get(url)

    return request.then(response => response.data )
}

const addNew = ( categoryObject ) => {
    const request = axios.post(url, categoryObject)
    
    return request.then(response => response.data)
}

export default {getAll, addNew}