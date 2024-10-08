import axios from '../setup/axios'

const registerNewUser = (userData) => {
    return axios.post('/api/v1/register', userData);
}

const loginUser = (userData) => {
    return axios.post('/api/v1/login', userData);
}

const findAccount = (data) => {
    return axios.post('/api/v1/login/identify', { data });
}

const resetPassword = (data) => {
    return axios.put('/api/v1/reset-password', { data });
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

const getUserAccount = () => {
    return axios.get('/api/v1/account')
}

const logoutUser = () => {
    return axios.post('/api/v1/logout')
}

export {
    registerNewUser, createNewUser, updateCurrentUser, logoutUser, findAccount,
    loginUser, fetchAllUser, deleteUser, fetchGroup, getUserAccount, resetPassword
}