import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import SurveyCard from '../../components/Dashboard/SurveyCard'
import ContributionCard from '../../components/Dashboard/ContributionCard'
import NavBar from '../../components/Navbar'
import logoBeMySample from '../../assets/images/BeMySampleLogo_Transparent.png'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ProfilePict from '../../assets/images/profilepict.png'
import axios from 'axios'

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

const saveNewSurveyToLocalStorage = (surveyId) => {
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
		},
	}

	const existingData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {}
	const updatedData = { ...existingData, ...initialSurveyData }
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData))
}

const Dashboard = () => {
	const navigate = useNavigate()
	const [user, setUser] = useState(null)

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get('http://localhost:8000/api/user', {
					withCredentials: true,
				})
				setUser(response.data)
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}

		fetchUserData()
	}, []) // Tidak ada dependensi, jadi hanya sekali saat komponen mount

	useEffect(() => {
		const token = document.cookie.replace(
			/(?:(?:^|.*;\s*)bemysample\s*\=\s*([^;]*).*$)|^.*$/,
			'$1'
		)

		if (token) {
			navigate('/dashboard') // Jika ada token, seharusnya diarahkan ke dashboard, bukan ke login
		}
	}, [navigate])

	const [surveys, setSurveys] = useState([])
	const [contributions, setContributions] = useState([])
	const [activeMenuId, setActiveMenuId] = useState(null)
	const [loadingPopup, setLoadingPopup] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selectedSurveyId, setSelectedSurveyId] = useState(null)

	useEffect(() => {
		const storedSurveys =
			JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {}
		setSurveys(
			Object.keys(storedSurveys).map((id) => ({ id, ...storedSurveys[id] }))
		)
	}, [])

	const handleCreateSurvey = () => {
		setLoadingPopup(true)
		setTimeout(() => {
			const newSurveyId = generateUniqueID()
			saveNewSurveyToLocalStorage(newSurveyId)
			setLoadingPopup(false)
			navigate(`/survey/edit/${newSurveyId}`)
		}, 2000)
	}

	const handleEdit = (id) => {
		navigate(`/survey/edit/${id}`)
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
		setSurveys(
			Object.keys(updatedSurveys).map((key) => ({
				id: key,
				...updatedSurveys[key],
			}))
		)
		setActiveMenuId(null)
		setShowDeleteModal(false)
	}

	const toggleMenu = (id) => {
		setActiveMenuId(activeMenuId === id ? null : id)
	}

	const ProfileMenu = ({ user, onLogout }) => {
		const [isMenuOpen, setIsMenuOpen] = useState(false)

		const toggleMenu = () => setIsMenuOpen((prev) => !prev)

		// Render jika user sudah ada
		if (!user) {
			return <div>Loading...</div> // Atau komponen loading lainnya
		}

		return (
			<div className="relative">
				{/* Profile Section */}
				<div
					className="hover:bg-zinc-100 px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
					onClick={toggleMenu}
				>
					<img
						src={user.avatar || ProfilePict}
						alt="Profile"
						className="h-8 w-8 rounded-full"
					/>
					<p>
						Halo,{' '}
						<b className="text-[#1F38DB]">{user.nama_lengkap || 'User'}</b>!
					</p>
					<Icon icon="ep:arrow-down-bold" />
				</div>

				{/* Dropdown Menu */}
				{isMenuOpen && (
					<div
						className="absolute right-0 mt-2 bg-white shadow-md rounded-2xl w-48 p-2 z-50"
						onMouseLeave={() => setIsMenuOpen(false)}
					>
						<button
							className="flex flex-row gap-2 items-center w-full px-4 py-2 text-left text-red-500 hover:bg-red-100 rounded-lg transition-all duration-200"
							onClick={onLogout}
						>
							<Icon icon="mdi:logout" className="mr-2 text-lg" />
							Keluar
						</button>
					</div>
				)}
			</div>
		)
	}

	const handleLogout = async () => {
		try {
			// Mengirim request logout ke backend
			const response = await axios.post(
				'http://localhost:8000/api/logout',
				{},
				{ withCredentials: true }
			)

			console.log('Logout response:', response.data)

			// Redirect ke halaman login
			navigate('/login')
		} catch (error) {
			console.error('Error logging out:', error)
		}
	}

	return (
		<>
			<NavBar
				childrenLeft={
					<Link to="/">
						<LazyLoadImage
							src={logoBeMySample}
							alt="BeMySample Logo"
							className="h-[56px] cursor-pointer"
						/>
					</Link>
				}
				childrenRight={
					<div className="flex flex-col lg:flex-row items-center gap-2">
						<div className="hover:bg-zinc-100 px-4 py-2 rounded-lg flex items-center gap-2">
							<Icon icon="akar-icons:coin" />
							<p>200.000</p>
						</div>
						<ProfileMenu user={user} onLogout={handleLogout} />
					</div>
				}
			/>
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
						className="flex flex-col items-center w-64 py-[24px] px-[56px] text-white border-4 border-[#2073DB] bg-[#2073DB] hover:bg-[#235ea5] hover:border-[#235ea5] rounded-[16px]"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
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

				<div className="flex flex-col lg:flex-row gap-[14px] items-start justify-start w-full mt-8">
					{/* Survey and Contribution sections here */}
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
							{surveys.map((survey) => (
								<SurveyCard
									key={survey.id}
									title={survey.surveyTitle}
									respondents={survey.respondents}
									updated={survey.updated}
									image={survey.backgroundImage}
									status={survey.status}
									isActive={activeMenuId === survey.id}
									onToggleMenu={() => toggleMenu(survey.id)}
									onEdit={() => handleEdit(survey.id)}
									onDelete={() => handleDelete(survey.id)}
								/>
							))}
							{surveys.length === 0 && (
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
					<div className="w-full py-10 flex flex-col items-start gap-2">
						<div className="flex flex-row items-center justify-between w-full">
							<div>
								<p className="text-[18px] font-semibold font-inter">
									Berkontribusi
								</p>
								<p className="text-[12px] text-[#757575] font-inter">
									Isi survei yang tersedia dan dapatkan MyPoin
								</p>
							</div>
							<motion.button
								className="bg-[#1F38DB] text-white p-3 rounded-lg flex flex-row gap-2 items-center"
								whileHover={{ scale: 1.05 }}
							>
								<p className="leading-3 text-xs">Eksplor</p>
								<Icon
									icon="bi:arrow-right-circle-fill"
									className="text-[16px]"
								/>
							</motion.button>
						</div>
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
						{contributions.length === 0 && (
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
					<title>Dashboard - BeMySample</title>
				</Helmet>
			</div>
		</>
	)
}

export default Dashboard
