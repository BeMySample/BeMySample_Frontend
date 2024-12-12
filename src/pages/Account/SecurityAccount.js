import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import TwoFactorAuthPopup from '../../components/Popup/TwoFactor'
import GoogleAuthenticatorPopup from '../../components/Popup/GoogleAuth'
import { Helmet } from 'react-helmet'
import EnterPasswordPopup from '../../components/Popup/EnterPassword'
import DeviceManagementPopup from '../../components/Popup/DeviceManagement'

const SecurityAccount = ({ profileData }) => {
	const [isAccountSecure, setIsAccountSecure] = useState(false)
	const [isPopupVisibleTwoFactor, setIsPopupVisibleTwoFactor] = useState(false)
	const [isPopupVisibleGoogleAuth, setIsPopupVisibleGoogleAuth] =
		useState(false)
	const [isPopupVisibleEnterPassword, setIsPopupVisibleEnterPassword] =
		useState(false)
	const [isPopupVisibleDevice, setIsPopupVisibleDevice] = useState(false)

	const handleOpenPopupTwoFactor = () => setIsPopupVisibleTwoFactor(true)
	const handleClosePopupTwoFactor = () => setIsPopupVisibleTwoFactor(false)
	const handleOpenPopupGoogleAuth = () => {
		setIsPopupVisibleGoogleAuth(true)
		setIsPopupVisibleTwoFactor(false)
	}
	const handleClosePopupGoogleAuth = () => setIsPopupVisibleGoogleAuth(false)
	const handleOpenPopupEnterPassword = () =>
		setIsPopupVisibleEnterPassword(true)
	const handleClosePopupEnterPassword = () =>
		setIsPopupVisibleEnterPassword(false)
	const handleOpenPopupDevice = () => setIsPopupVisibleDevice(true)
	const handleClosePopupDevice = () => setIsPopupVisibleDevice(false)

	const menuItems = [
		{
			title: 'Kata Sandi',
			value: 'Terakhir diperbarui: 12/11/2024',
			icon: 'mdi:key',
			onClick: handleOpenPopupEnterPassword,
		},
		{
			title: 'Autentikasi 2 Langkah',
			value: 'Aktif',
			otherInfo: profileData.status,
			icon: 'mdi:lock',
			onClick: handleOpenPopupTwoFactor,
		},
		{
			title: 'Perangkat Anda',
			value: '2 perangkat terhubung',
			icon: 'mdi:devices',
			onClick: handleOpenPopupDevice,
		},
	]

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			{isPopupVisibleTwoFactor && (
				<TwoFactorAuthPopup
					email={profileData.email}
					status={profileData.status}
					onClose={handleClosePopupTwoFactor}
					openGoogleAuth={handleOpenPopupGoogleAuth}
				/>
			)}
			{isPopupVisibleGoogleAuth && (
				<GoogleAuthenticatorPopup onClose={handleClosePopupGoogleAuth} />
			)}
			{isPopupVisibleEnterPassword && (
				<EnterPasswordPopup onClose={handleClosePopupEnterPassword} />
			)}
			{isPopupVisibleDevice && (
				<DeviceManagementPopup onClose={handleClosePopupDevice} />
			)}
			<h3 className="text-xl font-semibold mb-6 flex items-center justify-center gap-2 text-gray-800">
				<Icon icon="mdi:shield-key" className="text-2xl" />
				Keamanan Akun
			</h3>

			<div
				className={`my-5 p-5 rounded-2xl flex items-center justify-between border-2 ${
					isAccountSecure
						? 'border-blue-300 bg-blue-100'
						: 'border-orange-300 bg-orange-100'
				}`}
			>
				<div className="flex flex-col items-start">
					<h4 className="text-lg font-semibold text-gray-800">
						{isAccountSecure
							? 'Keamanan Akun Optimal'
							: 'Anda memiliki 1 saran keamanan akun'}
					</h4>
					<p className="text-sm text-gray-700 mt-2">
						{isAccountSecure
							? 'Akun Anda aman dan terlindungi dengan baik.'
							: 'Aktifkan autentikasi dua faktor setiap kali Anda masuk untuk memperkuat keamanan akun Anda.'}
					</p>

					{!isAccountSecure && (
						<div className="flex justify-between items-center mt-4">
							<button
								className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
								onClick={() => setIsAccountSecure(true)}
							>
								Aktifkan
							</button>
						</div>
					)}
				</div>
				{!isAccountSecure ? (
					<Icon icon="fluent-color:warning-32" fontSize={112} />
				) : (
					<Icon
						icon="heroicons:shield-check-20-solid"
						className="text-[#0081fb] text-6xl"
					/>
				)}
			</div>

			<div className="space-y-6">
				{menuItems.map((item, index) => (
					<div
						key={index}
						className="flex justify-between items-center border-b border-gray-200 pb-4 cursor-pointer hover:bg-gray-50 transition"
						onClick={item.onClick}
					>
						<div className="flex items-center gap-2">
							<Icon icon={item.icon} className="text-xl text-gray-600" />
							<p className="text-lg text-gray-800">{item.title}</p>
						</div>
						<div className="flex items-center gap-2">
							<p className="text-sm text-gray-600">{item.value}</p>
							{item.otherInfo && (
								<p className="text-white px-2 py-0.5 rounded-full bg-[#0081FB] text-sm uppercase font-semibold">
									{item.otherInfo}
								</p>
							)}
							<Icon
								icon="mdi:chevron-right"
								className="text-xl text-gray-600"
							/>
						</div>
					</div>
				))}
			</div>

			<Helmet>
				<title>Keamanan Akun - BeMySample</title>
			</Helmet>
		</div>
	)
}

export default SecurityAccount
