import api from './api'

const addProduct = (data) => api.post("/api/products", data)
const getProduct = () => api.get("/api/products")
const updateProduct = (id, data) => api.put(`/api/products/${id}`, data)
const deleteProduct = (id) => api.delete(`/api/products/${id}`)
const searchProduct = (keyword) => api.get("/api/products/search", { params: { search: keyword }})

export default {addProduct, getProduct, updateProduct, deleteProduct, searchProduct}