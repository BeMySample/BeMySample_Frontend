import React, { useState, useEffect } from 'react'
import axios from 'axios'

const QRCode = () => {
	const [qrCode, setQrCode] = useState(null)
	const [secret, setSecret] = useState(null)

	// Ambil QR code dari Flask backend
	useEffect(() => {
		const fetchQRCode = async () => {
			try {
				const response = await axios.get('http://localhost:5000/generate-qr')
				setQrCode(response.data.qr_code) // Set QR code yang dikirim dalam format base64
				setSecret(response.data.secret) // Secret key jika diperlukan
			} catch (error) {
				console.error('Error fetching QR code:', error)
			}
		}

		fetchQRCode()
	}, [])

	return (
		<div>
			{qrCode ? (
				<div>
					<h2>Scan this QR code with Google Authenticator</h2>
					<img src={`data:image/png;base64,${qrCode}`} alt="QR Code" />
					<p>Secret: {secret}</p>
				</div>
			) : (
				<p>Loading QR code...</p>
			)}
		</div>
	)
}

export default QRCode
