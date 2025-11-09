import api from './api'

const getDashboardAdmin = (data) => api.get("/api/dashboard/admin", data)
const getDashboardSuperadmin = (data) => api.get("/api/dashboard/superadmin", data)
const getDashboardUser = (data) => api.get("/api/dashboard/user", data)

export default { getDashboardAdmin, getDashboardSuperadmin, getDashboardUser }