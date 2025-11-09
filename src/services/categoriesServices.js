import api from './api'

const addCategories = (data) => api.post("/api/categories", data)
const getCategories = () => api.get("/api/categories")
const updatecategories = (id, data) => api.put(`/api/categories/${id}`, data)
const deleteCategories = (id) => api.delete(`/api/categories/${id}`)
const searchCategories = (keyword) => api.get("/api/categories/search", { params: { search: keyword }})

export default {addCategories, getCategories, updatecategories, deleteCategories, searchCategories}