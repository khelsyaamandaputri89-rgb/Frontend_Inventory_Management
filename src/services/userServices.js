import api from './api'

const addUsers = (data) => api.post("/api/users", data)
const getUsers = () => api.get("/api/users")
const updateUsers = (id, data) => api.put(`/api/users/${id}`, data)
const deleteUsers = (id) => api.delete(`/api/users/${id}`)
const searchUsers = (keyword) => api.get("/api/users/search", { params: { search: keyword }})

export default {addUsers, getUsers, updateUsers, deleteUsers, searchUsers}