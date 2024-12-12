import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import EditFieldPopup from '../../components/Popup/EditField'
import DefaultProfile from '../../assets/images/default-profile.png'
import { Helmet } from 'react-helmet'

const About = ({ profileData }) => {
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

	return (
		<div className="flex-grow p-8">
			{/* Profile Header */}
			<div className="flex flex-col items-center gap-4 mb-8">
				<div className="relative">
					<img
						src={profileData.avatar || DefaultProfile}
						alt="Profile"
						className="w-24 h-24 rounded-full object-cover"
					/>
					<motion.button
						whileHover={{ scale: 1.1 }}
						className="absolute bottom-0 right-0 bg-white border border-gray-300 p-2 rounded-full shadow"
					>
						<Icon icon="ic:baseline-edit" className="text-gray-500" />
					</motion.button>
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
