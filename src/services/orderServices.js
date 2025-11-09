import api from './api'

const addOrder = (data) => api.post("/api/orders", data)
const createOrder = (data) => api.post("/api/orders/my", data)
const getAllOrder = () => api.get("/api/orders")
const getOrder = () => api.get("/api/orders/my-orders")
const deleteOrder = (id) => api.delete(`/api/orders/${id}`)
const searchOrder = (keyword) => api.get("/api/orders/search", { params: { search: keyword }})

export default { addOrder, createOrder, getOrder, getAllOrder, deleteOrder, searchOrder }
