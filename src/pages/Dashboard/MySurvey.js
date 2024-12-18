import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import SurveyCard from '../../components/Dashboard/SurveyCard'
import toast, { Toaster } from 'react-hot-toast'
import useFetchSurveys from '../../hooks/useFetchSurveys'
import Loading from 'react-loading'
import { fetchUser } from '../../api/auth'
import axios from 'axios'
import Cookies from 'js-cookie'

const LOCAL_STORAGE_KEY = 'surveyData'

const generateUniqueID = () => {
	return (
		Math.random().toString(36).substr(2, 10) +
		Math.random().toString(36).substr(2, 10)
	)
}

const Survey = () => {
	const navigate = useNavigate()
	const [user, setUser] = useState(null)

	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await fetchUser()
				setUser(response.data.data)
				console.log('User:', response.data.data)
			} catch (err) {
				console.error('Error fetching user:', err.response?.data || err.message)
			}
		}

		getUser()
	}, [])

	const { surveys, isLoadingSurveys, refetch } = useFetchSurveys(user)
	const [surve, setSurveys] = useState([])
	const [activeMenuId, setActiveMenuId] = useState(null)
	const [loadingPopup, setLoadingPopup] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selectedSurveyId, setSelectedSurveyId] = useState(null)

	const handleCreateSurvey = async () => {
		setLoadingPopup(true)

		const surveyData = {
			surveyTitle: 'Customer Satisfaction Survey',
			surveyDescription:
				'This survey collects feedback on customer experience.',
			backgroundImage: 'https://file.com',
			thumbnail: 'https://file.com',
			bgColor: '#ffffff',
			createdByAI: false,
			respondents: 0,
			maxRespondents: 100,
			coinAllocated: 100,
			coinUsed: 0,
			kriteria: 'age>18',
			status: 'draft',
			sections: [
				{
					icon: 'icon1.png',
					label: 'Personal Information',
					bgColor: '#f2f2f2',
					bgOpacity: 2,
					buttonColor: '#0081FB',
					buttonText: 'Next',
					buttonTextColor: '#fff',
					contentText: 'Please provide your name and age.',
					dateFormat: 'MM/DD/YYYY',
					description: 'This section collects basic personal details.',
					largeLabel: 'Name',
					listChoices: [
						{ label: 'Regresi Linear', value: 'A' },
						{ label: 'Regresi Logistik', value: 'B' },
						{ label: 'Support Vector Machine (SVM)', value: 'C' },
						{ label: 'Random Forest', value: 'D' },
						{ label: 'Neural Network', value: 'E' },
					],
					maxChoices: 1,
					midLabel: 'Age',
					minChoices: 0,
					mustBeFilled: true,
					optionsCount: 3,
					otherOption: true,
					smallLabel: 'Other',
					textColor: '#000000',
					timeFormat: '24-hour',
					title: 'Section 1',
					toggleResponseCopy: false,
				},
			],
		}

		try {
			const token = Cookies.get('auth_token')

			// Request menggunakan Axios
			const response = await axios.post(
				'http://localhost:8000/api/surveys',
				surveyData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			)

			console.log('Survey berhasil dibuat:', response.data)

			// Redirect ke halaman edit survey jika sukses
			navigate(`/dashboard/survey/edit/${response.data.data.id}`)
		} catch (error) {
			console.error('Terjadi kesalahan:', error.response?.data || error.message)
			alert('Terjadi kesalahan saat membuat survei.')
		} finally {
			setLoadingPopup(false)
		}
	}

	const handleEdit = (id) => {
		navigate(`/dashboard/survey/edit/${id}`)
		setActiveMenuId(null)
	}

	const handleDelete = (id) => {
		setSelectedSurveyId(id)
		setShowDeleteModal(true)
	}

	const confirmDelete = async () => {
		const token = Cookies.get('auth_token')

		await toast.promise(
			axios.delete(`http://localhost:8000/api/surveys/${selectedSurveyId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			{
				loading: 'Menghapus survei...',
				success: 'Survei berhasil dihapus!',
				error: 'Terjadi kesalahan saat menghapus survei.',
			}
		)

		// Reset state setelah penghapusan
		setActiveMenuId(null)
		setShowDeleteModal(false)

		// Panggil ulang fetch surveys
		await refetch()
	}

	const toggleMenu = (id) => {
		setActiveMenuId(activeMenuId === id ? null : id)
	}

	const [surveyTopic, setSurveyTopic] = useState('')
	const [showSurveyPopup, setShowSurveyPopup] = useState(false)

	const handleSubmitSurveyTopic = async () => {
		try {
			const response = await fetch('http://127.0.0.1:5000/api/gemini', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt: surveyTopic }),
			})

			if (!response.ok) {
				const errorText = await response.text()
				console.error('Error response:', errorText)
				throw new Error('Gagal membuat survei.')
			}

			const data = await response.json()
			const surveyTemplate = data.surveyTemplate
			console.log('Survey template:', surveyTemplate)

			const newSurveyId = generateUniqueID()
			// saveNewSurveyToLocalStorage(newSurveyId, surveyTemplate, true)
			setSurveys((prev) => [...prev, { id: newSurveyId, ...surveyTemplate }])
			navigate(`/dashboard/survey/edit/${newSurveyId}`)
		} catch (error) {
			console.error('Terjadi kesalahan:', error)
			alert('Terjadi kesalahan saat membuat survei.')
		}
	}

	const handleSort = () => {
		const parseDate = (dateStr) => {
			// Ambil bagian tanggal, bulan, tahun, dan waktu
			const [day, month, year, time] = dateStr
				.replace('pukul', '')
				.replace('WIB', '')
				.trim()
				.split(/[\s.]+/)

			// Konversi nama bulan ke indeks bulan (0-11)
			const months = [
				'Januari',
				'Februari',
				'Maret',
				'April',
				'Mei',
				'Juni',
				'Juli',
				'Agustus',
				'September',
				'Oktober',
				'November',
				'Desember',
			]
			const monthIndex = months.indexOf(month)

			// Buat objek Date
			return new Date(year, monthIndex, day, ...time.split(':'))
		}

		const sortedSurveys = [...surveys].sort((a, b) => {
			const dateA = parseDate(a.updated)
			const dateB = parseDate(b.updated)
			return dateB - dateA // Urutkan terbaru ke terlama
		})

		setSurveys(sortedSurveys)
		console.log(surveys)
		toast.success('Survei berhasil diurutkan berdasarkan tanggal terbaru!')
	}

	const handleFilter = () => {
		// Contoh logika filter untuk survei yang masih aktif
		const activeSurveys = surveys.filter((survey) => survey.status === 'active')
		if (activeSurveys.length > 0) {
			setSurveys(activeSurveys)
			toast.success('Hanya menampilkan survei yang aktif!')
		} else {
			toast.error('Tidak ada survei aktif yang ditemukan.')
		}
	}

	return (
		<>
			<Toaster />
			<div
				className="w-full flex flex-row font-inter"
				style={{ minHeight: 'calc(100vh)' }}
			>
				{/* Sidebar */}
				<div className="flex flex-col pt-[120px] items-center justify-start w-80 gap-[16px] bg-[#F5F5F5] p-10">
					<motion.button
						onClick={handleCreateSurvey}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="flex flex-col items-center w-full py-[24px] text-[#2073DB] border-4 border-[#2073DB] hover:bg-[#2073DB] hover:text-white rounded-[16px]"
					>
						<Icon icon="ic:outline-plus" className="text-[66px]" />
						<p className="font-inter text-[18px]">Buat Sendiri</p>
					</motion.button>
					<motion.button
						onClick={() => setShowSurveyPopup(true)}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="flex flex-col items-center w-full py-[24px] text-white border-4 border-[#2073DB] bg-[#2073DB] hover:bg-[#235ea5] hover:border-[#235ea5] rounded-[16px]"
					>
						<Icon icon="mingcute:ai-fill" className="text-[66px]" />
						<p className="font-inter text-[18px]">Buat dengan AI</p>
					</motion.button>
				</div>

				{/* Overlay Pop-up */}
				<AnimatePresence>
					{loadingPopup && (
						<motion.div
							className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<motion.div
								className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.8, opacity: 0 }}
								transition={{ duration: 0.3 }}
							>
								<Icon
									icon="eos-icons:loading"
									className="text-5xl animate-spin text-blue-600 mb-4"
								/>
								<p className="text-center text-gray-700">
									Sedang membuat survei baru...
								</p>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

				<AnimatePresence>
					{showDeleteModal && (
						<motion.div
							className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<motion.div
								className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[400px]"
								initial={{ scale: 0.8 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0.8 }}
								transition={{ duration: 0.3 }}
							>
								<h2 className="text-lg font-semibold text-gray-800 mb-4">
									Konfirmasi Hapus
								</h2>
								<p className="text-gray-600 mb-6">
									Apakah Anda yakin ingin menghapus survei ini?
								</p>
								<div className="flex justify-end gap-4">
									<button
										onClick={() => setShowDeleteModal(false)}
										className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
									>
										Batal
									</button>
									<button
										onClick={confirmDelete}
										className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
									>
										Hapus
									</button>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

				<AnimatePresence>
					{showSurveyPopup && (
						<motion.div
							className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<motion.div
								className="bg-white p-6 rounded-2xl shadow-xl w-[90%] md:w-[400px] relative"
								initial={{ scale: 0.8 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0.8 }}
								transition={{ duration: 0.3 }}
							>
								{/* Gemini AI Branding */}
								<div className="absolute -top-5 right-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
									Powered by Gemini AI
								</div>

								{/* Title */}
								<h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
									Masukkan Topik Survei
								</h2>

								{/* Subheading */}
								<p className="text-sm text-gray-500 text-center mb-6">
									Dapatkan survei yang dibuat khusus untuk Anda.
								</p>

								{/* Textarea Input */}
								<textarea
									value={surveyTopic}
									onChange={(e) => setSurveyTopic(e.target.value)}
									placeholder="Deskripsikan survei Anda..."
									className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
									rows={5}
								></textarea>

								{/* Buttons */}
								<div className="flex justify-end gap-4 mt-6">
									<button
										onClick={() => setShowSurveyPopup(false)}
										className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
									>
										Batal
									</button>
									<button
										onClick={handleSubmitSurveyTopic}
										className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 shadow-md transition-all"
									>
										Kirim
									</button>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Main Content */}
				<div
					className="flex-grow flex flex-col items-start gap-4 p-10 pt-[120px] overflow-y-auto"
					style={{ height: 'calc(100vh)' }}
				>
					<div className="w-full flex justify-between items-center">
						<div>
							<p className="text-[18px] font-inter font-semibold text-[#2073DB]">
								Survei Saya
							</p>
							<p className="text-[12px] text-[#757575] font-inter">
								Lihat data respons atau sunting survei yang sudah Anda buat
							</p>
						</div>

						{/* Tombol Urutkan dan Filter */}
						<div className="flex gap-4">
							<button
								onClick={handleSort} // Tambahkan fungsi untuk logika urutkan
								className="px-4 py-2 bg-[#2073DB] text-white text-sm rounded-lg shadow hover:bg-[#1a5ba5] transition"
							>
								Urutkan
							</button>
							<button
								onClick={handleFilter} // Tambahkan fungsi untuk logika filter
								className="px-4 py-2 bg-[#2073DB] text-white text-sm rounded-lg shadow hover:bg-[#1a5ba5] transition"
							>
								Filter
							</button>
						</div>
					</div>

					<div className="flex flex-col gap-[16px] w-full mt-4">
						{/* Jika ada survei */}
						{isLoadingSurveys ? (
							// Tampilkan spinner loading saat data sedang dimuat
							<div className="flex flex-col gap-2 justify-center items-center w-full h-[200px] border-2 rounded-2xl">
								<Loading type="spin" color="#1F38DB" height={50} width={50} />
								Memuat data survei...
							</div>
						) : surveys.length > 0 ? (
							// Tampilkan daftar survei jika ada data

							surveys.map((survey) => (
								<SurveyCard
									key={survey.id}
									title={survey.surveyTitle}
									respondents={survey.respondents}
									createdByAI={survey.createdByAI}
									coinAllocated={survey.coinAllocated}
									coinUsed={survey.coinUsed}
									updated={survey.updated_at}
									image={survey.thumbnail}
									status={survey.status}
									isActive={activeMenuId === survey.id}
									onToggleMenu={() => toggleMenu(survey.id)}
									onEdit={() => handleEdit(survey.id)}
									onDelete={() => handleDelete(survey.id)}
								/>
							))
						) : (
							// Tampilkan pesan jika tidak ada survei
							<div className="border-2 rounded-2xl flex flex-col items-center justify-center w-full py-8">
								<Icon
									icon="bx:bxs-spreadsheet"
									className="text-6xl text-gray-400"
								/>
								<p className="text-gray-400">Belum ada survei yang dibuat!</p>
							</div>
						)}
					</div>
				</div>
			</div>

			<Helmet>
				<title>Survei Saya - BeMySample</title>
			</Helmet>
		</>
	)
}

export default Survey
