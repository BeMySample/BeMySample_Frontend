import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import pictFillData from '../../assets/images/pictFillData.png'
import PopupWhyDataNeeded from '../../components/Popup/WhyDataNeeded'
import toast, { Toaster } from 'react-hot-toast'
import { initializeCsrf, login } from '../../api/auth'
import Cookies from 'js-cookie'

const FillData = () => {
	const { encodedId } = useParams()
	const navigate = useNavigate()

	const id = atob(encodedId)

	const [formData, setFormData] = useState({
		username: '',
		status: '',
		nama_lengkap: '',
		email: '',
		google_id: 'default-google-id',
		avatar: 'default-avatar',
		password: '',
		tanggal_lahir: '',
		jenis_kelamin: '',
		umur: '',
		lokasi: '',
		minat: [],
		institusi: '',
		poin_saya: 0,
		pekerjaan: '',
		profilepic: 'default-profile-pic-url',
	})

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/api/users/${id}`
				)
				const userData = response.data

				setFormData({
					username: userData.username || '',
					status: userData.status || '',
					nama_lengkap: userData.nama_lengkap || '',
					email: userData.email || '',
					google_id: userData.google_id || 'default-google-id',
					avatar: userData.avatar || 'default-avatar',
					password: '',
					tanggal_lahir: userData.tanggal_lahir || '',
					jenis_kelamin: userData.jenis_kelamin || '',
					umur: userData.umur || '',
					lokasi: userData.lokasi || '',
					minat: userData.minat ? userData.minat.split(', ') : [],
					institusi: userData.institusi || '',
					poin_saya: userData.poin_saya || 0,
					pekerjaan: userData.pekerjaan || '',
					profilepic: userData.profilepic || 'default-profile-pic-url',
				})
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}

		if (id) {
			fetchUserData()
		}
	}, [id])

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleCheckboxChange = (e) => {
		const { value, checked } = e.target
		setFormData((prev) => {
			const updatedMinat = checked
				? [...prev.minat, value]
				: prev.minat.filter((minat) => minat !== value)
			return { ...prev, minat: updatedMinat }
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const formattedData = {
			...formData,
			minat: formData.minat.join(', '),
			umur: formData.umur ? parseInt(formData.umur, 10) : null,
			poin_saya: formData.poin_saya ? parseInt(formData.poin_saya, 10) : 0,
		}

		await toast
			.promise(
				axios.post(`http://localhost:8000/api/users/edit/${id}`, formattedData),
				{
					loading: 'Mengirim data diri...',
					success: 'Data diri berhasil diisi!',
					error: 'Gagal mengisi data diri. Coba lagi.',
				}
			)
			.then(async () => {
				await new Promise((resolve) => setTimeout(resolve, 2000))
				navigate('/dashboard/home')
			})
			.catch((error) => {
				console.error('Error updating user data:', error)
			})
	}

	const [isPopupOpen, setIsPopupOpen] = useState(false)

	const handleOpenPopup = () => setIsPopupOpen(true)
	const handleClosePopup = () => setIsPopupOpen(false)

	const [isFetchingLocation, setIsFetchingLocation] = useState(false)

	// Fungsi untuk mendapatkan lokasi pengguna
	const getCurrentLocation = async () => {
		if (!navigator.geolocation) {
			alert('Geolocation tidak didukung oleh browser Anda.')
			return
		}

		setIsFetchingLocation(true)

		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const { latitude, longitude } = position.coords

				try {
					// Gunakan OpenWeatherAPI Reverse Geocoding
					const apiKey = '574bbfb54d7288210e9a85b9bb737fd8' // Ganti dengan API Key Anda
					const response = await axios.get(
						`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
					)

					const city = response.data[0]?.name || 'Tidak Diketahui'
					setFormData((prev) => ({ ...prev, lokasi: city }))
					toast.success(`Lokasi berhasil diperbarui: ${city}`)
				} catch (error) {
					toast.error('Gagal mendapatkan lokasi. Coba lagi.')
					console.error('Error fetching city name:', error)
				} finally {
					setIsFetchingLocation(false)
				}
			},
			(error) => {
				alert('Gagal mendapatkan lokasi. Pastikan izin lokasi diaktifkan.')
				console.error('Geolocation error:', error)
				setIsFetchingLocation(false)
			}
		)
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 font-inter p-8">
			<Toaster />
			<div className="flex flex-wrap w-full bg-white shadow-lg rounded-lg overflow-hidden">
				{/* Bagian Form */}
				<div className="w-full p-8 flex flex-row gap-9">
					<img
						src={pictFillData}
						alt="Fill Data"
						className="max-h-[600px] mx-auto"
					/>
					<div className="w-full">
						<h2 className="text-2xl font-bold text-blue-700 mb-4 font-gili">
							Selangkah lagi!
						</h2>
						<p className="text-gray-600 mb-6">
							Isi seluruh data diri berikut untuk melanjutkan.{' '}
							<button
								onClick={handleOpenPopup}
								className="text-blue-500 underline"
							>
								Mengapa data ini dibutuhkan?
							</button>
							<PopupWhyDataNeeded
								isOpen={isPopupOpen}
								onClose={handleClosePopup}
							/>
						</p>

						<form onSubmit={handleSubmit}>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{/* Nama Lengkap */}
								<div className="flex flex-col md:flex-row md:items-center gap-2">
									<label
										htmlFor="nama_lengkap"
										className="font-medium text-gray-700 md:w-1/3"
									>
										Nama Lengkap
									</label>
									<input
										id="nama_lengkap"
										type="text"
										name="nama_lengkap"
										value={formData.nama_lengkap}
										onChange={handleChange}
										placeholder="Ex: John Doe"
										className="p-2 border border-gray-300 rounded-lg w-full md:w-2/3"
										required
									/>
								</div>

								{/* Jenis Kelamin */}
								<div className="flex flex-col md:flex-row md:items-center gap-2">
									<label
										htmlFor="jenis_kelamin"
										className="font-medium text-gray-700 md:w-1/3"
									>
										Jenis Kelamin
									</label>
									<select
										id="jenis_kelamin"
										name="jenis_kelamin"
										value={formData.jenis_kelamin}
										onChange={handleChange}
										className="p-2 border border-gray-300 rounded-lg w-full md:w-2/3"
									>
										<option value="">Pilih Jenis Kelamin</option>
										<option value="laki-laki">Laki-laki</option>
										<option value="perempuan">Perempuan</option>
									</select>
								</div>

								{/* Tanggal Lahir */}
								<div className="flex flex-col md:flex-row md:items-center gap-2">
									<label
										htmlFor="tanggal_lahir"
										className="font-medium text-gray-700 md:w-1/3"
									>
										Tanggal Lahir
									</label>
									<input
										id="tanggal_lahir"
										type="date"
										name="tanggal_lahir"
										value={formData.tanggal_lahir}
										onChange={handleChange}
										className="p-2 border border-gray-300 rounded-lg w-full md:w-2/3"
									/>
								</div>

								{/* Pekerjaan */}
								<div className="flex flex-col md:flex-row md:items-center gap-2">
									<label
										htmlFor="pekerjaan"
										className="font-medium text-gray-700 md:w-1/3"
									>
										Pekerjaan
									</label>
									<input
										id="pekerjaan"
										type="text"
										name="pekerjaan"
										value={formData.pekerjaan}
										onChange={handleChange}
										placeholder="Ex: Software Engineer"
										className="p-2 border border-gray-300 rounded-lg w-full md:w-2/3"
									/>
								</div>

								{/* Lokasi */}
								<div className="flex flex-col md:flex-row md:items-center gap-2">
									<label
										htmlFor="lokasi"
										className="font-medium text-gray-700 md:w-1/3"
									>
										Asal Kota
									</label>
									<div className="relative w-full md:w-2/3">
										<input
											id="lokasi"
											type="text"
											name="lokasi"
											value={formData.lokasi}
											onChange={handleChange}
											placeholder="Ex: Jakarta"
											className="p-2 border border-gray-300 rounded-lg w-full"
										/>
										<button
											type="button"
											onClick={getCurrentLocation}
											disabled={isFetchingLocation}
											className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white hover:bg-blue-600 px-2 py.1 rounded-lg disabled:bg-gray-500 ${
												isFetchingLocation
													? 'opacity-50 cursor-not-allowed'
													: ''
											}`}
										>
											{isFetchingLocation ? 'Mencari...' : 'GPS'}
										</button>
									</div>
								</div>

								{/* Institusi */}
								<div className="flex flex-col md:flex-row md:items-center gap-2">
									<label
										htmlFor="institusi"
										className="font-medium text-gray-700 md:w-1/3"
									>
										Institusi
									</label>
									<input
										id="institusi"
										type="text"
										name="institusi"
										value={formData.institusi}
										onChange={handleChange}
										placeholder="Ex: Universitas Indonesia"
										className="p-2 border border-gray-300 rounded-lg w-full md:w-2/3"
									/>
								</div>
							</div>

							{/* Minat */}
							<div className="mt-6">
								<p className="text-gray-600 mb-4 font-semibold">
									Minat (Pilih satu atau lebih):
								</p>
								<div className="grid grid-cols-2 gap-3">
									{[
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
									].map((minat) => (
										<label
											key={minat}
											className="flex items-center gap-3 cursor-pointer"
										>
											<input
												type="checkbox"
												value={minat}
												checked={formData.minat.includes(minat)}
												onChange={handleCheckboxChange}
												style={{
													width: '20px',
													height: '20px',
													borderRadius: '50%',
													border: '2px solid #1F38DB',
													appearance: 'none',
													outline: 'none',
													cursor: 'pointer',
													background: formData.minat.includes(minat)
														? '#1F38DB'
														: 'transparent',
													transition: 'all 0.3s ease-in-out',
												}}
											/>
											<span className="text-gray-700">{minat}</span>
										</label>
									))}
								</div>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								className="w-full bg-blue-500 text-white p-2 rounded-lg mt-6"
							>
								Lanjutkan →
							</button>

							<p className="text-gray-400 text-xs mt-4">
								Informasi tidak akan dibagikan tanpa sepengetahuan Anda.
							</p>
						</form>
					</div>
				</div>
			</div>

			<Helmet>
				<title>Isi Data Diri - BeMySample</title>
			</Helmet>
		</div>
	)
}

export default FillData
