import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FileUpload = () => {
	const [file, setFile] = useState(null)
	const [imageUrl, setImageUrl] = useState('')
	const [username, setUsername] = useState('')
	const [userData, setUserData] = useState({}) // State untuk menyimpan data user

	// Fetch user data saat komponen dimuat
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get('http://localhost:8000/api/users/59')
				setUserData(response.data) // Simpan data user di state
				setUsername(response.data.username || '') // Inisialisasi username jika tersedia
			} catch (error) {
				console.error('Error fetching user data:', error.response)
				alert(
					`Error fetching user data: ${
						error.response?.data?.message || 'Unknown error'
					}`
				)
			}
		}
		fetchUserData()
	}, [])

	const handleFileChange = (e) => {
		setFile(e.target.files[0])
	}

	const handleUsernameChange = (e) => {
		setUsername(e.target.value)
	}

	const handleUpload = async () => {
		if (!file) {
			alert('Please select a file')
			return
		}

		if (!username) {
			alert('Please enter a username')
			return
		}

		const formData = new FormData()
		formData.append('avatar', file)
		formData.append('username', username)

		// Gabungkan data user dengan formData
		Object.entries(userData).forEach(([key, value]) => {
			if (key !== 'avatar') {
				formData.append(key, value)
			}
		})

		try {
			const response = await axios.post(
				`http://localhost:8000/api/users/edit/59`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			console.log('Upload response:', response.data)
			setImageUrl(response.data.avatar)
		} catch (error) {
			console.error('Error response:', error.response)
			alert(
				`Error uploading file: ${
					error.response?.data?.message || 'Unknown error'
				}`
			)
		}
	}

	return (
		<div>
			<input
				type="text"
				placeholder="Enter username"
				value={username}
				onChange={handleUsernameChange}
			/>
			<input type="file" onChange={handleFileChange} />
			<button onClick={handleUpload}>Upload</button>
			{imageUrl && (
				<div>
					<h3>Uploaded Image:</h3>
					<img src={imageUrl} alt="Uploaded" style={{ width: '200px' }} />
				</div>
			)}
		</div>
	)
}

export default FileUpload
