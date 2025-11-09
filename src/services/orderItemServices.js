import api from './api'

const orderItem = (data) => api.post("/api/order-items", data)
const order_item = (data) => api.get("/api/order-items", data)
const orderitem = (data) => api.put("/api/order-items/:id", data)
const order_Item = (data) => api.delete("/api/order-items/:id", data)

export default {orderItem, order_item, orderitem, order_Item}