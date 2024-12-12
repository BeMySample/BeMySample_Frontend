import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SurveyCard from '../../components/Dashboard/SurveyCard'
import ContributionCard from '../../components/Dashboard/ContributionCard'
import Loading from 'react-loading'
import { fetchUser } from '../../api/auth'
import useFetchSurveys from '../../hooks/useFetchSurveys'
import useFetchContributions from '../../hooks/useFetchContributions'

const LOCAL_STORAGE_KEY = 'surveyData'

const generateUniqueID = () => {
	return (
		Math.random().toString(36).substr(2, 10) +
		Math.random().toString(36).substr(2, 10)
	)
}

const getFormattedDate = () => {
	const date = new Date()
	const options = {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone: 'Asia/Jakarta',
	}

	const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(date)
	return `${formattedDate} WIB`
}

const saveNewSurveyToLocalStorage = (
	surveyId,
	surveyTemplate = null,
	isAI = false
) => {
	const initialSurveyData = {
		[surveyId]: {
			sections: [
				{
					id: 'welcome',
					label: 'Selamat datang',
					icon: 'hugeicons:start-up-02',
				},
				{
					id: 'thankYou',
					label: 'Terima Kasih',
					icon: 'icon-park-outline:bye',
				},
			],
			surveyTitle: 'Survei Baru',
			activeSection: 'welcome',
			data: {
				welcome: {
					contentText: 'Selamat datang',
					buttonText: 'Mulai',
					backgroundImage: null,
					bgColor: '#FFFFFF',
					buttonColor: '#1F38DB',
					textColor: '#000000',
					title: 'Isi Judul di sini',
					description: 'Isi deskripsi di sini',
				},
				thankYou: {
					contentText: 'Closing',
					buttonText: 'Selesai',
					backgroundImage: null,
					bgColor: '#FFFFFF',
					buttonColor: '#1F38DB',
					textColor: '#000000',
					title: 'Isi Judul di sini',
					description: 'Isi deskripsi di sini',
				},
			},
			updated: getFormattedDate(),
			status: 'draft',
			respondents: 0,
			isAI: isAI,
		},
	}

	// Ambil data survei yang sudah ada di localStorage
	const existingData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {}

	let updatedData
	if (isAI && surveyTemplate) {
		// Jika survei dibuat dengan AI, gunakan surveyTemplate
		updatedData = { ...existingData, ...{ [surveyId]: surveyTemplate } }
	} else {
		// Jika survei dibuat secara manual, gunakan initialSurveyData
		updatedData = { ...existingData, ...initialSurveyData }
	}

	// Simpan data terbaru ke localStorage
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData))
}

const Home = () => {
	const navigate = useNavigate()

	const [user, setUser] = useState(null)

	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await fetchUser()
				setUser(response.data.data)
			} catch (err) {
				console.error('Error fetching user:', err.response?.data || err.message)
			}
		}

		getUser()
	}, [])

	const { surveys, isLoadingSurveys } = useFetchSurveys(user)
	const { contributions, isLoadingContributions } = useFetchContributions()
	const [activeMenuId, setActiveMenuId] = useState(null)
	const [loadingPopup, setLoadingPopup] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selectedSurveyId, setSelectedSurveyId] = useState(null)

	// useEffect(() => {
	// 	const storedSurveys =
	// 		JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {}
	// 	setSurveys(
	// 		Object.keys(storedSurveys).map((id) => ({ id, ...storedSurveys[id] }))
	// 	)
	// }, [])

	const handleCreateSurvey = () => {
		setLoadingPopup(true)
		setTimeout(() => {
			const newSurveyId = generateUniqueID()
			saveNewSurveyToLocalStorage(newSurveyId)
			setLoadingPopup(false)
			navigate(`/dashboard/survey/edit/${newSurveyId}`)
		}, 2000)
	}

	const handleEdit = (id) => {
		navigate(`/dashboard/survey/edit/${id}`)
		setActiveMenuId(null)
	}

	const handleDelete = (id) => {
		setSelectedSurveyId(id)
		setShowDeleteModal(true)
	}

	const confirmDelete = () => {
		const updatedSurveys = {
			...JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)),
		}
		delete updatedSurveys[selectedSurveyId]
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedSurveys))
		// setSurveys(
		// 	Object.keys(updatedSurveys).map((key) => ({
		// 		id: key,
		// 		...updatedSurveys[key],
		// 	}))
		// )
		setActiveMenuId(null)
		setShowDeleteModal(false)
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
			saveNewSurveyToLocalStorage(newSurveyId, surveyTemplate, true)
			// setSurveys((prev) => [...prev, { id: newSurveyId, ...surveyTemplate }])
			navigate(`/dashboard/survey/edit/${newSurveyId}`)
		} catch (error) {
			console.error('Terjadi kesalahan:', error)
			alert('Terjadi kesalahan saat membuat survei.')
		}
	}

	return (
		<>
			<div className="w-full bg-white pt-[120px] flex flex-col items-center px-4 md:px-14 font-inter">
				<div className="flex flex-row items-center justify-center w-full gap-[16px] flex-wrap">
					<motion.button
						onClick={handleCreateSurvey}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="flex flex-col items-center w-64 py-[24px] px-[56px] text-[#2073DB] border-4 border-[#2073DB] hover:bg-[#2073DB] hover:border-[#2073DB] hover:text-white rounded-[16px]"
					>
						<Icon icon="ic:outline-plus" className="text-[66px]" />
						<p className="font-inter text-[18px]">Buat Sendiri</p>
					</motion.button>
					<motion.button
						onClick={() => setShowSurveyPopup(true)}
						className="flex flex-col items-center w-64 py-[24px] px-[56px] text-white border-4 border-[#2073DB] bg-[#2073DB] hover:bg-[#235ea5] hover:border-[#235ea5] rounded-[16px]"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<Icon icon="mingcute:ai-fill" className="text-[66px]" />
						<p className="font-inter text-[18px]">Buat dengan AI</p>
					</motion.button>
				</div>

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
								<div className="absolute -top-5 right-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
									Powered by Gemini AI
								</div>

								<h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
									Masukkan Topik Survei
								</h2>

								<p className="text-sm text-gray-500 text-center mb-6">
									Dapatkan survei yang dibuat khusus untuk Anda.
								</p>

								<textarea
									value={surveyTopic}
									onChange={(e) => setSurveyTopic(e.target.value)}
									placeholder="Deskripsikan survei Anda..."
									className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
									rows={5}
								></textarea>

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

				<div className="flex flex-col lg:flex-row gap-[14px] items-start justify-start w-full mt-8">
					<div className="w-full py-10 flex flex-col items-start gap-4">
						<div className="w-full">
							<p className="text-[18px] w-full font-inter font-semibold">
								Survei Saya
							</p>
							<p className="text-[12px] w-full text-[#757575] font-inter">
								Lihat data respons atau sunting survei yang sudah Anda buat
							</p>
						</div>
						<div className="flex flex-col gap-[16px] w-full">
							{isLoadingSurveys ? (
								// Tampilkan spinner loading saat data sedang dimuat
								<Loading type="spin" color="#1F38DB" height={50} width={50} />
							) : surveys.length > 0 ? (
								// Tampilkan daftar survei jika ada data

								surveys.map((survey) => (
									<SurveyCard
										key={survey.id}
										title={survey.judul_survey}
										respondents={survey.responden_now}
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
					<div className="w-full py-10 flex flex-col items-start gap-[14px]">
						<div className="flex flex-row items-center justify-between w-full">
							<div className="w-full">
								<p className="text-[18px] w-full font-semibold font-inter">
									Berkontribusi
								</p>
								<p className="text-[12px] w-full text-[#757575] font-inter">
									Isi survei yang tersedia dan dapatkan MyPoin
								</p>
							</div>
							<motion.button
								className="bg-[#1F38DB] text-white p-3 rounded-lg flex flex-row gap-2 items-center"
								whileHover={{ scale: 1.05 }}
							>
								<Link
									to="/dashboard/contribution"
									className="leading-3 text-xs"
								>
									Eksplor
								</Link>
								<Icon
									icon="bi:arrow-right-circle-fill"
									className="text-[16px]"
								/>
							</motion.button>
						</div>
						{isLoadingContributions ? (
							// Tampilkan spinner loading
							<Loading type="spin" color="#1F38DB" height={50} width={50} />
						) : contributions.length > 0 ? (
							// Tampilkan daftar kontribusi jika data tersedia
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] w-full">
								{contributions.map((contribution) => (
									<ContributionCard
										key={contribution.id}
										title={contribution.title}
										updated={contribution.updated}
										coins={contribution.coins}
										image={contribution.image}
									/>
								))}
							</div>
						) : (
							// Tampilkan pesan jika tidak ada kontribusi
							<div className="border-2 rounded-2xl flex flex-col items-center justify-center w-full py-8">
								<Icon
									icon="mage:file-cross-fill"
									className="text-6xl text-gray-400"
								/>
								<p className="text-gray-400">Belum ada survei tersedia!</p>
							</div>
						)}
					</div>
				</div>

				<Helmet>
					<title>Beranda - BeMySample</title>
				</Helmet>
			</div>
		</>
	)
}

export default Home
