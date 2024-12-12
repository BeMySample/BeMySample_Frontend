import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const TwoFactorAuthPopup = ({ email, status, onClose, openGoogleAuth }) => {
	const [authMethod, setAuthMethod] = useState(status) // Default to OTP

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-[28rem] relative">
				<h3 className="text-xl font-semibold mb-4 text-[#1F38DB]">
					Autentikasi 2-langkah
				</h3>
				<p className="text-sm text-gray-600">
					Sangat direkomendasikan untuk menjaga autentikasi 2-langkah tetap
					aktif.
				</p>

				<div className="flex justify-between items-center gap-6">
					<div className="mt-6">
						{authMethod === 'otp' && (
							<p className="text-sm text-gray-600">
								<b>Autentikasi aktif dengan OTP.</b> Kode akan dikirimkan ke
								surel <span className="font-medium text-gray-900">{email}</span>
								.
							</p>
						)}
						{authMethod === 'google' && (
							<div className="text-sm text-gray-600">
								<b>Autentikasi aktif dengan Google Authenticator.</b> Gunakan
								aplikasi untuk menghasilkan kode.
								<br />
								<button
									onClick={openGoogleAuth}
									className="text-blue-500 hover:underline"
								>
									Siapkan atau setel ulang
								</button>
							</div>
						)}
						{authMethod === 'none' && (
							<p className="text-sm text-gray-600">
								<b>Autentikasi saat ini nonaktif.</b> Anda disarankan untuk
								mengaktifkan salah satu metode autentikasi.
							</p>
						)}
					</div>

					<div className="mt-4 flex gap-3">
						<button
							className={`p-3 rounded-lg border transition-all duration-200 ${
								authMethod === 'none'
									? 'border-blue-500 bg-blue-50'
									: 'border-gray-300 bg-white hover:bg-gray-100'
							}`}
							onClick={() => setAuthMethod('none')}
						>
							<Icon
								icon="ant-design:stop-outlined"
								className="text-xl text-gray-800"
							/>
						</button>

						<button
							className={`p-3 rounded-lg border transition-all duration-200 ${
								authMethod === 'google'
									? 'border-blue-500 bg-blue-50'
									: 'border-gray-300 bg-white hover:bg-gray-100'
							}`}
							onClick={() => setAuthMethod('google')}
						>
							<Icon
								icon="simple-icons:googleauthenticator"
								className="text-xl text-gray-800"
							/>
						</button>

						<button
							className={`p-3 rounded-lg border transition-all duration-200 ${
								authMethod === 'otp'
									? 'border-blue-500 bg-blue-50'
									: 'border-gray-300 bg-white hover:bg-gray-100'
							}`}
							onClick={() => setAuthMethod('otp')}
						>
							<Icon
								icon="teenyicons:otp-outline"
								className="text-xl text-gray-800"
							/>
						</button>
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

export default TwoFactorAuthPopup
