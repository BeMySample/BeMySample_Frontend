import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import ChangePasswordPopup from './ChangePassword'

const EnterPasswordPopup = ({ onClose }) => {
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false)

	const handleContinue = () => {
		const correctPassword = '123456' // Replace with actual password verification logic
		if (password === correctPassword) {
			setShowChangePasswordPopup(true)
		} else {
			setError('Kata sandi salah. Silakan coba lagi.')
		}
	}

	if (showChangePasswordPopup) {
		return <ChangePasswordPopup onClose={onClose} />
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-[28rem] relative">
				<h3 className="text-xl font-semibold mb-4 text-[#1F38DB]">
					Masukkan Kata Sandi
				</h3>
				<p className="text-sm text-gray-600 mb-4">
					Mohon konfirmasi bahwa ini adalah Anda dengan memasukkan kata sandi
				</p>

				<div className="relative mb-6">
					<input
						type="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value)
							setError('')
						}}
						placeholder="Kata sandi"
						className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<Icon
						icon="mdi:eye-off"
						className="absolute right-2 top-2 text-gray-500 cursor-pointer"
					/>
				</div>

				{error && <p className="text-sm text-red-500 mb-4">{error}</p>}

				<div className="flex items-center justify-end gap-3">
					<button
						className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-200"
						onClick={onClose}
					>
						Batal
					</button>
					<button
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
						onClick={handleContinue}
					>
						Lanjutkan
					</button>
				</div>

				<button
					className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition"
					onClick={onClose}
				>
					<Icon icon="mdi:close" className="text-xl" />
				</button>
			</div>
		</div>
	)
}

export default EnterPasswordPopup
