// import axios from "axios";
import axios from '../setup/axios'

const registerNewUser = (userData) => {
    return axios.post('/api/v1/register', userData);
}

const loginUser = (userData) => {
    return axios.post('/api/v1/login', userData);
}

const fetchAllUser = (currentPage, currentLimit) => {
    return axios.get(`/api/v1/user/read?page=${currentPage}&limit=${currentLimit}`)
}

const deleteUser = (user) => {
    return axios.delete('/api/v1/user/delete', { data: { id: user.id } })
}

const fetchGroup = () => {
    return axios.get(`/api/v1/group/read`)
}

const createNewUser = (userData) => {
    return axios.post('/api/v1/user/create', { ...userData })
}

const updateCurrentUser = (userData) => {
    return axios.put('/api/v1/user/update', { ...userData })
}

export {
    registerNewUser, createNewUser, updateCurrentUser,
    loginUser, fetchAllUser, deleteUser, fetchGroup
}