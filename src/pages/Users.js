import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const Users = () => {
	const [user, setUser] = useState(null)

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get('http://localhost:8000/api/user', {
					withCredentials: true,
				})
				console.log('User data:', response.data) // Menampilkan data user
			} catch (error) {
				console.error(
					'Error fetching user data:',
					error.response?.data || error.message
				)
			}
		}

		fetchUserData() // Ambil data user saat profile dimuat
	}, [])

	if (!user) {
		return <div>Loading...</div> // Tampilkan loading jika data belum ada
	}

	return (
		<div>
			<h1>{user.nama_lengkap}</h1>
			<img src={user.avatar} alt="Avatar" />
			{/* Tampilkan informasi lainnya */}
		</div>
	)
}

export default Users
