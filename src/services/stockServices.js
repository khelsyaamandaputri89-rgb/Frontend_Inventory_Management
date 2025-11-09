import api from './api'

const addStock = (data) => api.post("/api/stocks", data)
const getStock = (data) => api.get("/api/stocks", data)
const countStock = (data) => api.post("/api/stocks/current", data)
const deleteStock = (id) => api.delete(`/api/stocks/${id}`)
const searchStock = (keyword) => api.get("/api/stocks/search", { params: { search: keyword }})

export default {addStock, getStock, countStock, deleteStock, searchStock}