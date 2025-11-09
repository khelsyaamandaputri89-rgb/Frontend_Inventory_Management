import api from "./api"

const searchAll = (query) => api.get(`/api/search?query=${encodeURIComponent(query)}`)

export default {searchAll}