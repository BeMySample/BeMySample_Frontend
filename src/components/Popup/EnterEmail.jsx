import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const EnterEmailPopup = ({ onClose }) => {
	const [email, setEmail] = useState('')

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-[28rem] relative">
				<h3 className="text-xl font-semibold mb-4 text-[#1F38DB]">
					Masukkan E-mail
				</h3>
				<p className="text-sm text-gray-600 mb-4">
					Salinan jawaban akan dikirimkan ke e-mail Anda
				</p>

				<div className="relative mb-6">
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="someone@example.com"
						className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="flex items-center justify-end gap-3">
					<button
						className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-200"
						onClick={onClose}
					>
						Batal
					</button>
					<button
						className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 flex items-center gap-2"
						onClick={() => alert(`E-mail dikirim ke ${email}`)}
					>
						<Icon icon="mdi:email" className="text-xl" /> Kirim
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

export default EnterEmailPopup
