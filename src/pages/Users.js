import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Users = () => {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch('http://localhost:8000/api/users')
				const result = await response.json()
				if (result.success) {
					setUsers(result.data)
				} else {
					console.error('Failed to fetch users:', result.message)
				}
			} catch (error) {
				console.error('Error fetching users:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchUsers()
	}, [])

	return (
		<motion.div
			className="p-6 bg-gray-100 min-h-screen font-inter"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<motion.h1
				className="text-3xl font-bold mb-6 text-center text-blue-600"
				initial={{ y: -50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				BeMySample Users
			</motion.h1>

			{loading ? (
				<motion.div
					className="text-center text-gray-500"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					Loading...
				</motion.div>
			) : (
				<motion.div
					className="overflow-x-auto shadow-lg rounded-lg bg-white"
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.7 }}
				>
					<table className="table-auto w-full border-collapse border border-gray-300">
						<thead>
							<tr className="bg-blue-50">
								<th className="border border-gray-300 px-6 py-3 text-left font-semibold">
									Username
								</th>
								<th className="border border-gray-300 px-6 py-3 text-left font-semibold">
									Nama Lengkap
								</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user, index) => (
								<motion.tr
									key={index}
									className="hover:bg-blue-100 transition-colors"
									initial={{ opacity: 0, x: -50 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1 }}
								>
									<td className="border border-gray-300 px-6 py-3">
										{user.username}
									</td>
									<td className="border border-gray-300 px-6 py-3">
										{user.nama_lengkap}
									</td>
								</motion.tr>
							))}
						</tbody>
					</table>
				</motion.div>
			)}
		</motion.div>
	)
}

export default Users
