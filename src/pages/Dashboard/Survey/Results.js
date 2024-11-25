import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import NavBar from '../../../components/Navbar'
import Breadcrumbs from '../../../components/SurveyEdit/Breadcrumbs'
import ProfilePict from '../../../assets/images/profilepict.png'
import { Icon } from '@iconify/react'
import defaultCover from '../../../assets/images/defaultCover.png'
import decor1 from '../../../assets/images/section1publish.png'
import footerDecorUnpublished from '../../../assets/images/groupFooterUnpublished.png'
import footerUnpublished from '../../../assets/images/footerGrayscalePublish.png'
import penguinFooterPublish from '../../../assets/images/penguinFooterPublish.png'
import { Helmet } from 'react-helmet'
import DesktopContent from '../../../components/SurveyEdit/Publish/DesktopContent'
import MobileContent from '../../../components/SurveyEdit/Publish/MobileContent'

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

	const handleSectionChange = (sectionId) => {
		setActiveSection(sectionId)

		const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {}
		const surveyData = savedData[id] || {}
		const sectionData = savedData[id]?.data[sectionId] || {}
		setContentText(sectionData.contentText || '')

		setButtonText(sectionData.buttonText || 'Mulai')
		setBackgroundImage(surveyData.backgroundImage || null)
		setBgColor(surveyData.bgColor || '#FFFFFF')
		setButtonColor(sectionData.buttonColor || '#1F38DB')
		setTextColor(sectionData.textColor || '#000000')
		setTitle(sectionData.title || 'Isi Judul di sini')
		setDescription(sectionData.description || 'Isi deskripsi di sini')
	}

	const [activeMenu, setActiveMenu] = useState('Hasil')

	const handleMenuClick = (menu) => {
		setActiveMenu(menu)
	}

	const [user, setUser] = useState({ name: '', avatar: '' })
	const navigate = useNavigate()

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const name = params.get('name')
		let avatar = params.get('avatar')
		const token = params.get('token')

		if (avatar && avatar.includes('=s96-c')) {
			avatar = avatar.replace('=s96-c', '')
		}

		if (name && avatar && token) {
			const userData = { name, avatar, token }
			localStorage.setItem('user', JSON.stringify(userData))
			setUser(userData)

			window.history.replaceState({}, document.title, '/dashboard')
		} else {
			const savedUser = JSON.parse(localStorage.getItem('user'))
			if (savedUser) {
				setUser(savedUser)
			} else {
				navigate('/login')
			}
		}
	}, [navigate])

	const [selectedImage, setSelectedImage] = useState(defaultCover)

	const handleReplaceImage = () => {
		const inputElement = document.createElement('input')
		inputElement.type = 'file'
		inputElement.accept = 'image/*'
		inputElement.style.display = 'none'
		inputElement.addEventListener('change', (event) => {
			const file = event.target.files[0]
			if (file) {
				setSelectedImage(URL.createObjectURL(file))
			}
		})
		inputElement.click() // Membuka dialog file
	}

	return (
		<div className="flex flex-col w-full min-h-screen bg-gray-100 font-inter">
			<NavBar
				childrenLeft={
					<Breadcrumbs
						items={[
							{ label: 'Surveiku', link: '/dashboard' },
							{ label: surveyTitle, link: `/survey/edit/${id}` },
						]}
						separator="mdi:chevron-right"
						onTitleChange={handleTitleChange}
					/>
				}
				childrenCenter={
					<div className="absolute inset-0 top-0 left-0 right-0 w-full -z-10 flex-grow flex items-center justify-center space-x-8 text-base">
						{[
							{ label: 'Sunting', path: 'edit' },
							{ label: 'Pratinjau', path: 'preview' },
							{ label: 'Terbitkan', path: 'publish' },
							{ label: 'Hasil', path: 'results' },
						].map(({ label, path }) => (
							<Link
								key={label}
								to={`/survey/${path}/${id}`}
								onClick={() => handleMenuClick(label)}
								className={`relative font-normal focus:outline-none ${
									activeMenu === label
										? 'text-blue-600 font-semibold'
										: 'text-gray-600'
								}`}
							>
								{label}
								{activeMenu === label && (
									<span className="absolute -top-8 left-0 right-0 h-[12px] bg-gradient-to-r from-[#1F38DB] to-[#30ADD7] rounded-b-md"></span>
								)}
							</Link>
						))}
					</div>
				}
				childrenRight={
					<div className="flex flex-row gap-2 items-center font-inter text-base">
						<div className="hover:bg-zinc-100 px-4 py-2 rounded-lg flex flex-row gap-2 items-center justify-center text-base h-full">
							<Icon icon="akar-icons:coin" />
							<p>200.000</p>
						</div>
						<div className="hover:bg-zinc-100 px-4 py-2 rounded-lg flex flex-row gap-2 items-center justify-center text-base h-full">
							<img
								src={user?.avatar || ProfilePict}
								alt="profile"
								className="w-10 h-10 rounded-full"
							/>
						</div>
					</div>
				}
			/>
			<Toaster position="top-right" />
			<div className="min-h-20" />

			<div className="flex flex-row gap-4 m-7 justify-center z-10">
				<div className='bg-[#1F38DB] h-20 rounded-lg w-full'>

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
