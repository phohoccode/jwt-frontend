import axios from "axios";

const registerNewUser = (userData) => {
    return axios.post('http://localhost:8080/api/v1/register', userData);
}

const loginUser = (userData) => {
    return axios.post('http://localhost:8080/api/v1/login', userData);
}

const fetchAllUser = () => {
    return axios.get('http://localhost:8080/api/v1/user/read')
}

export {
    registerNewUser,
    loginUser, fetchAllUser
}