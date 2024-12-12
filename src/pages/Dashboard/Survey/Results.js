import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import NavBar from '../../../components/Navbar'
import Breadcrumbs from '../../../components/SurveyEdit/Breadcrumbs'
import ProfilePict from '../../../assets/images/profilepict.png'
import { Icon } from '@iconify/react'
import defaultCover from '../../../assets/images/defaultCover.png'
import penguinFooterPublish from '../../../assets/images/penguinFooterPublish.png'
import { Helmet } from 'react-helmet'
import ProgressBar from '@ramonak/react-progress-bar'

const LOCAL_STORAGE_KEY = 'surveyData'

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

const Results = () => {
	const { id } = useParams()

	const [viewMode, setViewMode] = useState('desktop')

	const toggleViewMode = (mode) => {
		setViewMode(mode)
	}

	const [activeSection, setActiveSection] = useState('welcome')
	const [sections, setSections] = useState([
		{ id: 'welcome', label: 'Selamat datang', icon: 'hugeicons:start-up-02' },
		{ id: 'thankYou', label: 'Closing', icon: 'icon-park-outline:bye' },
	])

	const [surveyTitle, setSurveyTitle] = useState(
		JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))?.[id]?.surveyTitle ||
			'Survei Baru'
	)
	const [contentText, setContentText] = useState('')
	const [surveyStatus, setSurveyStatus] = useState('draft')
	const [respondents, setRespondents] = useState(0)
	const [surveyUpdated, setSurveyUpdated] = useState(getFormattedDate())
	const [buttonText, setButtonText] = useState('Mulai')
	const [backgroundImage, setBackgroundImage] = useState(null)
	const [bgColor, setBgColor] = useState('#FFFFFF')
	const [buttonColor, setButtonColor] = useState('#1F38DB')
	const [textColor, setTextColor] = useState('#000000')
	const [title, setTitle] = useState('Isi Judul di sini')
	const [description, setDescription] = useState('Isi deskripsi di sini')
	const [unsavedChanges, setUnsavedChanges] = useState(false)

	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {}
		const surveyData = savedData[id]

		if (surveyData) {
			setSections(surveyData.sections || sections)
			setSurveyTitle(surveyData.surveyTitle || 'Survei Baru')

			// Set the first section as active if there is no active section saved
			const initialSection = surveyData.activeSection || sections[0].id
			setActiveSection(initialSection)

			// Load other data as usual
			const sectionData = surveyData.data[initialSection] || {}
			setSurveyStatus(surveyData.status || 'draft')
			setRespondents(surveyData.respondents || 0)
			setSurveyUpdated(surveyData.updated || getFormattedDate())
			setContentText(sectionData.contentText || '')
			setButtonText(sectionData.buttonText || 'Mulai')
			setBackgroundImage(surveyData.backgroundImage || null)
			setBgColor(surveyData.bgColor || '#FFFFFF')
			setButtonColor(sectionData.buttonColor || '#1F38DB')
			setTextColor(sectionData.textColor || '#000000')
			setTitle(sectionData.title || 'Terima kasih!')
			setDescription(
				sectionData.description || 'Anda sudah menyelesaikan survei ini.'
			)
		} else {
			// Set the first section as active if no data is found
			setActiveSection(sections[0].id)
		}
	}, [id])

	const handleTitleChange = (newTitle) => {
		setSurveyTitle(newTitle)
		setUnsavedChanges(true)
	}

	const [activeMenu, setActiveMenu] = useState('Hasil')

	const handleMenuClick = (menu) => {
		setActiveMenu(menu)
	}

	const [user, setUser] = useState({ name: '', avatar: '' })
	const navigate = useNavigate()

	// useEffect(() => {
	// 	const params = new URLSearchParams(window.location.search)
	// 	const name = params.get('name')
	// 	let avatar = params.get('avatar')
	// 	const token = params.get('token')

	// 	if (avatar && avatar.includes('=s96-c')) {
	// 		avatar = avatar.replace('=s96-c', '')
	// 	}

	// 	if (name && avatar && token) {
	// 		const userData = { name, avatar, token }
	// 		localStorage.setItem('user', JSON.stringify(userData))
	// 		setUser(userData)

	// 		window.history.replaceState({}, document.title, '/dashboard')
	// 	} else {
	// 		const savedUser = JSON.parse(localStorage.getItem('user'))
	// 		if (savedUser) {
	// 			setUser(savedUser)
	// 		} else {
	// 			navigate('/login')
	// 		}
	// 	}
	// }, [navigate])

	const data = [
		{
			icon: 'ph:gender-intersex-duotone',
			label: 'Gender',
			value: 'Semua',
		},
		{
			icon: 'oui:number',
			label: 'Usia',
			value: 'Minimal 18 th.',
		},
		{
			icon: 'basil:location-solid',
			label: 'Lokasi',
			value: 'Semua',
		},
		{
			icon: 'bxs:briefcase',
			label: 'Pekerjaan',
			value: 'Semua',
		},
		{
			icon: 'vaadin:office',
			label: 'Tempat Bekerja',
			value: 'Semua',
		},
	]

	return (
		<div className="flex flex-col w-full min-h-screen bg-gray-100 font-inter">
			<Toaster position="top-right" />
			<div className="min-h-20" />

			<div className="flex flex-row gap-4 m-7 justify-center z-10">
				<div className="p-3 rounded-xl bg-white flex flex-col items-start gap-3 w-full">
					<img src={defaultCover} alt="defaultCover" className="w-full h-24" />
					<p className="text-center text-lg font-bold w-">{surveyTitle}</p>
					<hr className="w-full" />
					<p className="text-center text-sm text-gray-500">
						Survei ini bertujuan mengetahui preferensi para pemilih tetap dengan
						meminta mereka menentukan bagaimana proses yang ingin mereka lakukan
						untuk menge-vote pada periode berikutnya
					</p>
					<hr className="w-full" />
					<div className="flex flex-wrap gap-2">
						{data.map((item, index) => (
							<div
								key={index}
								className="flex flex-row gap-2.5 items-center rounded bg-[#F5F5F5] p-2"
							>
								<Icon
									fontSize={24}
									icon={item.icon}
									className="text-[#5A5A5A]"
								/>
								<div className="flex flex-col items-start gap-0.5 text-xs text-[#757575]">
									<b>{item.label}</b>
									<p>{item.value}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="p-3 relative rounded-xl bg-white flex flex-col items-start gap-3 w-full">
					<ProgressBar
						completed={90}
						bgColor="#2073DB"
						height="20px"
						width="300px"
					/>
					<div>
						<p>
							Sedikit lagi! Yuk, terus bagikan surveimu untuk mencapai target
						</p>
					</div>
					<hr className="w-full" />
					<div className="flex flex-row gap-2 items-center w-full">
						<div className="flex flex-row items-center justify-center bg-[#E6E6E6] rounded-xl px-4 py-2 w-full">
							<p className="flex flex-col items-center gap-0.5">
								<span className="text-[#2073DB] text-2xl font-semibold">
									210
								</span>
								<span>Melihat</span>
							</p>
						</div>
						<div className="flex flex-row items-center justify-center bg-[#E6E6E6] rounded-xl px-4 py-2 w-full">
							<p className="flex flex-col items-center gap-0.5">
								<span className="text-[#2073DB] text-2xl font-semibold">
									13
								</span>
								<span>Drop-off</span>
							</p>
						</div>
						<div className="flex flex-row items-center justify-center bg-[#E6E6E6] rounded-xl px-4 py-2 w-full">
							<p className="flex flex-col items-center gap-0.5">
								<span className="text-[#2073DB] text-2xl font-semibold">
									190
								</span>
								<span>Menyelesaikan</span>
							</p>
						</div>
					</div>
					<div>
						<div className="flex flex-row gap-7 items-center">
							<p className="text-2xl font-normal text-center w-14">90%</p>
							<p>responden menyelesaikan survei, mantap!</p>
						</div>
						<div className="flex flex-row gap-7 items-center">
							<p className="text-2xl font-normal text-center w-14">02:12</p>
							<p>waktu menyelesaikan survei</p>
						</div>
					</div>
					<img
						className="w-auto h-[109px] left-[9px] bottom-0 absolute"
						src={penguinFooterPublish}
					/>
					<div className="w-[285px] h-[66px] left-[90px] bottom-20 absolute bg-[#d3d3d3] rounded-lg">
						<img
							className="w-[17.88px] h-[18.77px] left-[-1.55px] bottom-0 absolute"
							src="https://via.placeholder.com/18x19"
						/>
						<div className="w-4 h-4 pl-[1.40px] pr-[1.33px] pt-[1.33px] pb-[0.12px] left-[260px] top-[45px] absolute justify-center items-center inline-flex">
							<div className="w-[13.27px] relative"></div>
						</div>
					</div>
				</div>
			</div>

			<img
				src={penguinFooterPublish}
				alt="penguinFooterPublish"
				className="w-56 absolute bottom-0 right-0"
			/>

			<Helmet>
				<title>{surveyTitle} - Hasil Survei | BeMySample</title>
			</Helmet>

			<style>
				{`
				.main-container {
					overflow: hidden;
					max-width: 100%;
					width: 100%;
				}
				.scaled-element {
					max-width: 100%;
					width: fit-content;
					transform: scale(0.65);
					transform-origin: top left;
				}
				`}
			</style>
		</div>
	)
}

export default Results
