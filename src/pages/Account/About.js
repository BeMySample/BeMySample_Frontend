import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import EditFieldPopup from '../../components/Popup/EditField'
import DefaultProfile from '../../assets/images/default-profile.png'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loading from 'react-loading'

const About = ({ profileData, isLoading }) => {
	const [isPopupOpen, setPopupOpen] = useState(false)
	const [fieldToEdit, setFieldToEdit] = useState('')
	const [fieldValue, setFieldValue] = useState('')

	const capitalizeFirstLetter = (string) => {
		if (!string) return ''
		return string.charAt(0).toUpperCase() + string.slice(1)
	}

	const sections = [
		{
			icon: 'ph:gender-intersex',
			label: 'Jenis Kelamin',
			key: 'jenis_kelamin',
			value: capitalizeFirstLetter(profileData.jenis_kelamin),
		},
		{
			icon: 'mdi:calendar',
			label: 'Tanggal Lahir',
			key: 'tanggal_lahir',
			value: profileData.tanggal_lahir,
		},
		{
			icon: 'mdi:city',
			label: 'Kota Tinggal',
			key: 'lokasi',
			value: profileData.lokasi,
		},
		{
			icon: 'mdi:briefcase',
			label: 'Pekerjaan',
			key: 'pekerjaan',
			value: profileData.pekerjaan,
		},
		{
			icon: 'mdi:school',
			label: 'Institusi',
			key: 'institusi',
			value: profileData.institusi,
		},
		{
			icon: 'mdi:heart',
			label: 'Minat',
			key: 'minat',
			value: profileData.minat,
		},
	]

	const getLabelByFieldKey = (key) => {
		if (key === 'nama_lengkap') return 'Nama'
		if (key === 'email') return 'Surel'
		const section = sections.find((section) => section.key === key)
		return section ? section.label : ''
	}

	const openPopup = (key) => {
		setFieldToEdit(key)
		setFieldValue(profileData[key] || '')
		setPopupOpen(true)
	}

	const closePopup = () => {
		setPopupOpen(false)
	}

	const handleSave = (newValue) => {
		profileData[fieldToEdit] = newValue
		setFieldValue(newValue)
		setPopupOpen(false)
	}

	const changeAvatar = async (e) => {
		// Ambil file dari input
		const file = e.target.files[0]
		if (!file) {
			toast.error('No file selected')
			return
		}

		// Toast promise untuk proses upload
		toast.promise(
			(async () => {
				try {
					// Fetch user data terlebih dahulu
					const userResponse = await axios.get(
						`http://localhost:8000/api/users/${profileData.id}`
					)
					const userData = userResponse.data

					// Buat FormData baru dan append semua data user
					const formData = new FormData()
					Object.entries(userData).forEach(([key, value]) => {
						// Skip appending avatar lama
						if (key !== 'avatar') {
							formData.append(key, value)
						}
					})
					formData.append('avatar', file)

					// Kirim data dengan avatar baru
					const response = await axios.post(
						`http://localhost:8000/api/users/edit/${profileData.id}`,
						formData,
						{
							headers: {
								'Content-Type': 'multipart/form-data',
							},
						}
					)

					// Update avatar lokal (opsional, jika reload langsung tidak perlu ini)
					profileData.avatar = response.data.avatar

					// Refresh halaman
					window.location.reload()
				} catch (error) {
					console.error('Error response:', error.response)
					throw error // Biarkan toast.promise menangkap error
				}
			})(),
			{
				loading: 'Mengunggah gambar...',
				success: 'Gambar profil berhasil diperbarui!',
				error: 'Gagal untuk perbarui gambar profil. Coba lagi nanti.',
			}
		)
	}

	return (
		<div className="flex-grow p-8">
			{/* Profile Header */}
			{isLoading && (
				<div className="absolute left-0 bottom-0 right-0 flex flex-col justify-center items-center w-full bg-white bg-opacity-90 backdrop-blur-md z-20 h-screen">
					<Loading type="spin" color="#1F38DB" height={50} width={50} />
					<p className="mt-4 text-gray-700 font-semibold">
						Memuat data survei...
					</p>
				</div>
			)}
			<div className="flex flex-col items-center gap-4 mb-8">
				<div className="relative">
					<img
						src={profileData.avatar || DefaultProfile}
						alt="Profile"
						className="w-24 h-24 rounded-full object-cover"
					/>
					<motion.button
						whileHover={{ scale: 1.1 }}
						onClick={() => document.getElementById('avatar-upload').click()} // Trigger file input
						className="absolute bottom-0 right-0 bg-white border border-gray-300 p-2 rounded-full shadow"
					>
						<Icon icon="ic:baseline-edit" className="text-gray-500" />
					</motion.button>
					<input
						type="file"
						id="avatar-upload"
						accept="image/*"
						style={{ display: 'none' }} // Hide input file
						onChange={changeAvatar} // Trigger changeAvatar function on file select
					/>
				</div>

				<div className="flex flex-col items-center">
					<div className="flex items-center gap-2">
						<p className="text-lg font-bold">{profileData.nama_lengkap}</p>
						{profileData.status === '1' && (
							<Icon
								icon="solar:verified-check-bold"
								className="text-blue-500"
								fontSize={24}
							/>
						)}
					</div>
					<p className="text-gray-500 flex items-center gap-1.5">
						{profileData.google_id !== 'unknown' && (
							<Icon icon="devicon:google" fontSize={20} />
						)}
						{profileData.email}
					</p>
				</div>

				<div className="flex gap-4">
					<motion.button
						whileHover={{ scale: 1.05 }}
						className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
						onClick={() => openPopup('nama_lengkap')}
					>
						Ubah Nama
					</motion.button>
					<motion.button
						whileHover={{ scale: 1.05 }}
						className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
						onClick={() => openPopup('email')}
					>
						Ubah Surel
					</motion.button>
				</div>
			</div>

			{/* Profile Details */}
			<div className="bg-white rounded-xl shadow-md">
				<h3 className="text-lg font-semibold mb-6 flex items-center justify-center gap-2 text-white bg-blue-500 py-3 rounded-t-xl">
					<Icon icon="mdi:account" className="text-2xl" />
					Tentang Saya
				</h3>
				<div className="space-y-6 px-6">
					{sections.map((item, index) => (
						<div
							key={index}
							className="flex justify-between items-center border-b border-gray-200 pb-4 cursor-pointer"
							onClick={() => openPopup(item.key)}
						>
							<div className="flex items-center gap-2">
								<Icon icon={item.icon} className="text-xl text-gray-600" />
								<p className="text-lg text-gray-800">{item.label}</p>
							</div>
							<div className="flex items-center gap-2">
								<p className="text-md text-gray-600">
									{item.value || 'Tidak tersedia'}
								</p>
								<Icon
									icon="mdi:chevron-right"
									className="text-xl text-gray-600"
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* EditFieldPopup */}
			<EditFieldPopup
				isOpen={isPopupOpen}
				onClose={closePopup}
				fieldToEdit={fieldToEdit}
				fieldTitle={`Ubah ${getLabelByFieldKey(fieldToEdit)}`}
				fieldType={
					fieldToEdit === 'minat'
						? 'multi-select'
						: fieldToEdit === 'tanggal_lahir'
						? 'date'
						: fieldToEdit === 'jenis_kelamin'
						? 'select'
						: 'text'
				}
				fieldValue={fieldValue}
				options={
					fieldToEdit === 'minat'
						? [
								'Memasak',
								'Membaca',
								'Traveling',
								'Belanja',
								'Bersosial',
								'Fotografi',
								'Musik',
								'Film',
								'Olahraga',
								'Komputer & Teknologi',
						  ]
						: fieldToEdit === 'jenis_kelamin'
						? ['laki-laki', 'perempuan']
						: []
				}
				userId={profileData.id}
				profileData={profileData}
				onSave={handleSave}
			/>

			<Helmet>
				<title>Tentang Saya - BeMySample</title>
			</Helmet>
		</div>
	)
}

export default About
