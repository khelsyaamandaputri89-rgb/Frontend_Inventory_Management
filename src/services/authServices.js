import api from './api'

const login = (data) => api.post("/api/auth/login", data)
const register = (data) => api.post("/api/auth/register", data)
const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    window.location.href = "/login"
}
const forgottenPassword = (data) => api.post("/api/auth/forgot-password", data)
const resetPassword = (data) => api.post("/api/auth/reset-password", data)

export default {login, register, logout, forgottenPassword, resetPassword}