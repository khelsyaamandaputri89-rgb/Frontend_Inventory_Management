import api from './api'

const getProductReport = (params) => api.get("/api/reports/product", {params})
const getOrderReport = (params) => api.get("/api/reports/order", {params})
const getStockReport = (params) => api.get("/api/reports/stock", {params})
const getSummary = (data) => api.get("/api/reports/summary", data)
const getStockSales = (data) => api.get("/api/reports/stock-sales", data)
const searchReportProduct = (keyword) => api.get("/api/reports/products/search", { params: { search: keyword }})
const searchReportOrder = (keyword) => api.get("/api/reports/orders/search", { params: { search: keyword }})
const searchReportStock = (keyword) => api.get("/api/reports/stocks/search", { params: { search: keyword }})

export default {
    getProductReport, 
    getOrderReport, 
    getStockReport, 
    getSummary, 
    getStockSales, 
    searchReportProduct,
    searchReportOrder,
    searchReportStock
}