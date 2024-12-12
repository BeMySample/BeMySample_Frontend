import axios from '../axiosConfig'

// Initialize CSRF token
export const initializeCsrf = async () => {
	return axios.get('/sanctum/csrf-cookie')
}

// Login
export const login = async (email, password) => {
	return axios.post('/api/login', { email, password })
}

// Logout
export const logout = async () => {
	return axios.post('/api/logout')
}

// Fetch authenticated user
export const fetchUser = async () => {
	return axios.get('/api/user')
}
