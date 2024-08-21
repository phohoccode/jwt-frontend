import axios from "axios";

const registerNewUser = (userData) => {
    return axios.post('http://localhost:8080/api/v1/register', userData);
}

const loginUser = (userData) => {
    return axios.post('http://localhost:8080/api/v1/login', userData);
}

const fetchAllUser = (currentPage, currentLimit) => {
    return axios.get(`http://localhost:8080/api/v1/user/read?page=${currentPage}&limit=${currentLimit}`)
}

const deleteUser = (user) => {
    return axios.delete('http://localhost:8080/api/v1/user/delete', { data: { id: user.id } })
}

const fetchGroup = () => {
    return axios.get(`http://localhost:8080/api/v1/group/read`)
}

const createNewUser = (userData) => {
    return axios.post('http://localhost:8080/api/v1/user/create', { ...userData })
}

export {
    registerNewUser, createNewUser,
    loginUser, fetchAllUser, deleteUser, fetchGroup
}