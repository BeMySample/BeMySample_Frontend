import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const FileUpload = () => {
	const [file, setFile] = useState(null)
	const [imageUrl, setImageUrl] = useState('')

	const handleFileChange = (e) => {
		setFile(e.target.files[0])
	}

	const handleUpload = async () => {
		if (!file) {
			alert('Please select a file')
			return
		}

		const formData = new FormData()
		formData.append('image', file)

		// Debug: Log formData
		for (let [key, value] of formData.entries()) {
			console.log(`${key}:`, value)
		}

		try {
			const response = await axios.post(
				'http://localhost:8000/api/users',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			setImageUrl(response.data.url)
		} catch (error) {
			console.error('Error response:', error.response)
			alert(
				`Error uploading file: ${
					error.response.data.message || 'Unknown error'
				}`
			)
		}
	}

	return (
		<div>
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
