import axios from "axios";

const url = process.env.REACT_APP_BACKEND;

const login = (details) => {
    console.log("login:", details)
    const request = axios.post(url + "/login", details)

    return request.then(response => response.data )
}

const register = (details) => {
    console.log("registering:", details)
    const request = axios.post(url + "/register", details)

    return request.then(response => response.data )
}

const logout = (token) => {
    const request = axios.post(url + "/logout", token)

    return request.then(response => response.data )
}

export default {login, register, logout}