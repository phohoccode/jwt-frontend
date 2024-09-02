import axios from '../setup/axios'

const createRoles = (roles) => {
    return axios.post('/api/v1/role/create', [...roles])
}

const fetchAllRole = () => {
    return axios.get('/api/v1/role/read')
}

const deleteRole = (role) => {
    return axios.delete('/api/v1/role/delete', { data: { id: role.id } })
}

const updateRole = (role) => {
    return axios.put('/api/v1/role/update', { ...role })
}

const fetchRolesByGroup = (groupId) => {
    return axios.get(`/api/v1/role/by-group/${groupId}`)
}

const assignRoleToGroup = (data) => {
    return axios.post('/api/v1/role/assign-to-group', { data })
}

export {
    createRoles, fetchAllRole, deleteRole,
    updateRole, fetchRolesByGroup, assignRoleToGroup
}