import React, { useState } from 'react'
import { initializeCsrf, login } from '../api/auth'
import Cookies from 'js-cookie'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)

	const handleLogin = async () => {
		try {
			await initializeCsrf() // Initialize CSRF token
			const response = await login(email, password)
			console.log('Login successful:', response.data)

			const token = response.data.access_token

			// Simpan token ke cookie
			Cookies.set('auth_token', token, { expires: 7, secure: true }) // Cookie berlaku selama 7 hari, gunakan secure untuk HTTPS

			alert(response.data.user.nama_lengkap + ' logged in')
		} catch (err) {
			setError(err.response?.data?.message || 'Login failed')
		}
	}

	return (
		<div>
			<h1>Login</h1>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleLogin}>Login</button>
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	)
}

export default Login
