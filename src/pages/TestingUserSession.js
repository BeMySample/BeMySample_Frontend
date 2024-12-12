import React, { useState, useEffect } from 'react'
import { fetchUser, logout } from '../api/auth'
import Cookies from 'js-cookie'

const UserProfile = () => {
	const [user, setUser] = useState(null)

	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await fetchUser()
				setUser(response.data)
				console.log('User data:', response.data)
			} catch (err) {
				console.error('Error fetching user:', err.response?.data || err.message)
			}
		}

		getUser()
	}, [])

	const handleLogout = async () => {
		try {
			await logout()
			alert('Logged out successfully')
			setUser(null)
			Cookies.remove('auth_token')
		} catch (err) {
			console.error('Logout error:', err.response?.data || err.message)
		}
	}

	return (
		<div>
			{user ? (
				<div>
					<p>{user.data.id}</p>
					<h1>Welcome, {user.data.nama_lengkap}</h1>
					<button onClick={handleLogout}>Logout</button>
				</div>
			) : (
				<h1>Please log in</h1>
			)}
		</div>
	)
}

export default UserProfile
