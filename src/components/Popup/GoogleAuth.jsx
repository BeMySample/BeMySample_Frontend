import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const GoogleAuthenticatorPopup = ({ onClose }) => {
	const [authCode, setAuthCode] = useState('')

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-[30rem] relative">
				<h3 className="text-xl font-semibold mb-4 text-[#1F38DB]">
					Siapkan Authenticator
				</h3>

				<div className="flex gap-6 items-start">
					<div className="bg-gray-100 p-4 rounded-md">
						<img
							src="https://via.placeholder.com/150"
							alt="QR Code"
							className="min-w-40 h-40"
						/>
					</div>
					<div className="flex flex-col items-start">
						<p className="text-sm text-gray-600 mb-4">
							Pindai kode QR di samping dengan aplikasi Authenticator dan
							masukkan kode yang tampil.
						</p>
						<label
							className="text-gray-800 font-medium mb-2"
							htmlFor="auth-code"
						>
							Kode Anda
						</label>
						<input
							type="text"
							id="auth-code"
							value={authCode}
							onChange={(e) => setAuthCode(e.target.value)}
							placeholder="6 digit numerik"
							className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
				</div>

				<div className="flex flex-col flex-1">
					<div className="bg-yellow-100 p-3 mt-4 rounded-md flex items-center gap-2">
						<Icon
							icon="fluent:phone-32-regular"
							className="text-yellow-500 min-w-12"
              fontSize={44}
						/>
						<p className="text-sm text-yellow-700 text-justify">
							Pemindaian ulang dibutuhkan apabila perangkat Anda hilang atau
							tidak dapat diakses. Untuk berjaga-jaga, daftarkan beberapa
							perangkat sekaligus pada QR yang sama.
						</p>
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

export default GoogleAuthenticatorPopup
