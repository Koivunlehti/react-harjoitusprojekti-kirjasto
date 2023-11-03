import axios from "axios";

const url = process.env.REACT_APP_BACKEND;

const login = (details) => {
    console.log("login:", details)
    const request = axios.post(url + "/user/login", details)

    return request.then(response => response.data )
}

const register = (details) => {
    console.log("registering:", details)
    const request = axios.post(url + "/user/register", details)

    return request.then(response => response.data )
}

const logout = (token) => {
    const request = axios.post(url + "/user/logout", {},{headers:{"Content-Type":"application/json","token":token}})

    return request.then(response => response.data )
}

export default {login, register, logout}