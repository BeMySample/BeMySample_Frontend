import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const ChangePasswordPopup = ({ onClose }) => {
	const [oldPassword, setOldPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [passwordStrength, setPasswordStrength] = useState(0)

	const calculatePasswordStrength = (password) => {
		let strength = 0
		if (password.length >= 8) strength++
		if (/[A-Z]/.test(password)) strength++
		if (/[a-z]/.test(password)) strength++
		if (/[0-9]/.test(password)) strength++
		if (/[^A-Za-z0-9]/.test(password)) strength++
		return strength
	}

	const handleNewPasswordChange = (e) => {
		const password = e.target.value
		setNewPassword(password)
		setPasswordStrength(calculatePasswordStrength(password))
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-[28rem] relative">
				<h3 className="text-xl font-semibold mb-4 text-[#1F38DB]">
					Ubah Kata Sandi
				</h3>
				<p className="text-sm text-gray-600 mb-4">
					Gunakan kata sandi yang kuat dan tidak digunakan di platform lain.
					Dengan memperbarui sandi, perangkat selain yang digunakan saat ini
					akan dikeluarkan.
				</p>

				<div className="flex flex-col gap-4">
					<div>
						<label
							className="text-gray-800 font-medium mb-2"
							htmlFor="old-password"
						>
							Kata sandi lama
						</label>
						<div className="relative">
							<input
								type="password"
								id="old-password"
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
								placeholder="Kata sandi lama"
								className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<Icon
								icon="mdi:eye-off"
								className="absolute right-2 top-2 text-gray-500 cursor-pointer"
							/>
						</div>
					</div>

					<div>
						<label
							className="text-gray-800 font-medium mb-2"
							htmlFor="new-password"
						>
							Kata sandi baru
						</label>
						<div className="relative">
							<input
								type="password"
								id="new-password"
								value={newPassword}
								onChange={handleNewPasswordChange}
								placeholder="Kata sandi baru"
								className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<Icon
								icon="mdi:eye-off"
								className="absolute right-2 top-2 text-gray-500 cursor-pointer"
							/>
						</div>
					</div>

					<div>
						<label
							className="text-gray-800 font-medium mb-2"
							htmlFor="confirm-password"
						>
							Ulangi kata sandi baru
						</label>
						<div className="relative">
							<input
								type="password"
								id="confirm-password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								placeholder="Ulangi kata sandi baru"
								className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<Icon
								icon="mdi:eye-off"
								className="absolute right-2 top-2 text-gray-500 cursor-pointer"
							/>
						</div>
					</div>

					<div className="flex items-center gap-2 text-sm text-gray-600">
						<p>Kekuatan Sandi</p>
						<div className="flex-1 h-2 bg-gray-200 rounded-lg overflow-hidden">
							<div
								className={`h-full transition-width duration-300 ${
									passwordStrength === 1
										? 'bg-red-500 w-1/5'
										: passwordStrength === 2
										? 'bg-yellow-500 w-2/5'
										: passwordStrength === 3
										? 'bg-yellow-400 w-3/5'
										: passwordStrength === 4
										? 'bg-green-400 w-4/5'
										: passwordStrength === 5
										? 'bg-green-500 w-full'
										: 'w-0'
								}`}
							></div>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-end mt-6 gap-3">
					<button
						className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-200"
						onClick={onClose}
					>
						Batal
					</button>
					<button
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
						onClick={onClose}
					>
						Simpan
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

export default ChangePasswordPopup
