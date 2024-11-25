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

const Publish = () => {
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

	const [activeMenu, setActiveMenu] = useState('Terbitkan')

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
				<div className="bg-white p-7 rounded-lg shadow-lg w-[500px] relative overflow-clip h-full">
					<div className="size-[84px] absolute -top-9 -right-9 bg-[#1F38DB] flex items-center justify-center rounded-full">
						<p className="absolute bottom-4 left-6 text-white font-lg">1</p>
					</div>
					<h3 className="text-xl font-semibold mb-2 text-[#1F38DB]">
						Siapa respondennya?
					</h3>
					<p className="text-[#757575] font-inter">
						Tentukan kriteria responden. Biarkan kosong apabila tidak ingin
						menentukan kriteria.
					</p>
					<div className="flex flex-row gap-2 items-center justify-between">
						<div className="flex flex-col items-center gap-2">
							<div className="bg-zinc-100 rounded-full p-6">
								<Icon
									fontSize={60}
									icon="ph:gender-intersex-duotone"
									className="text-purple-600"
								/>
							</div>
							<p>Semua</p>
						</div>
						<div className="flex flex-col items-center gap-2">
							<div className="bg-zinc-100 rounded-full p-6">
								<Icon
									fontSize={60}
									icon="mingcute:male-line"
									className="text-blue-600"
								/>
							</div>
							<p>Pria</p>
						</div>
						<div className="flex flex-col items-center gap-2">
							<div className="bg-zinc-100 rounded-full p-6">
								<Icon
									fontSize={60}
									icon="ion:female"
									className="text-pink-500"
								/>
							</div>
							<p>Wanita</p>
						</div>
					</div>

					<div>
						<form className="flex flex-col gap-4 mt-4">
							<div className="flex flex-row items-center">
								<label className="text-gray-800 min-w-44">Rentang Usia</label>
								<div className="flex flex-row gap-2 items-center">
									<input
										type="number"
										placeholder="Minimum"
										className="p-2 rounded border border-gray-300 bg-white w-full"
									/>
									<p>-</p>
									<input
										type="number"
										placeholder="Maksimum"
										className="p-2 rounded border border-gray-300 bg-white w-full"
									/>
								</div>
							</div>
							<div className="flex flex-row items-center">
								<label className="text-gray-800 min-w-44">Lokasi</label>
								<input
									type="text"
									placeholder="Provinsi, kota, ..."
									className="p-2 rounded border border-gray-300 bg-white w-full"
								/>
							</div>
							<div className="flex flex-row items-center">
								<label className="text-gray-800 min-w-44">Hobi</label>
								<input
									type="text"
									placeholder="Membaca, berolahraga, ..."
									className="p-2 rounded border border-gray-300 bg-white w-full"
								/>
							</div>
							<div className="flex flex-row items-center">
								<label className="text-gray-800 min-w-44">Pekerjaan</label>
								<input
									type="text"
									placeholder="Pegawai, pelajar, ..."
									className="p-2 rounded border border-gray-300 bg-white w-full"
								/>
							</div>
							<div className="flex flex-row items-center">
								<label className="text-gray-800 min-w-44">Tempat Bekerja</label>
								<input
									type="text"
									placeholder="Nama perusahaan"
									className="p-2 rounded border border-gray-300 bg-white w-full"
								/>
							</div>
							<div className="w-full bg-[#E6E6E6] rounded-lg flex flex-col gap-1 items-center justify-center py-4">
								<span className="text-[#2073DB] text-2xl font-semibold">0</span>
								<span>Pengguna yang cocok</span>
							</div>
							<div className="flex flex-row items-center justify-between relative">
								<div className="flex flex-col items-start w-48">
									<div className="flex flex-row items-center gap-1">
										<Icon icon="icons8:idea" className="text-[#421FDB]" />
										<span className="text-[#757575] text-sm font-bold font-['Inter']">
											Tip
										</span>
										<span className="text-[#757575] text-sm font-normal font-['Inter']">
											{' '}
											Survei yang baik
										</span>
									</div>
									<span className="text-[#757575] text-sm font-normal font-['Inter']">
										harus tepat sasaran. Sesuaikan pengaturan responden dengan
										kebutuhan Anda
									</span>
								</div>
								<img
									src={decor1}
									alt="decor1"
									className="w-64 absolute -bottom-9 -right-7"
								/>
							</div>
						</form>
					</div>
				</div>

				<div className="flex flex-col items-center gap-4 z-20">
					<div className="flex flex-row gap-4 h-2/3">
						<div className="bg-white p-7 rounded-lg shadow-lg w-[500px] relative overflow-clip">
							<div className="size-[84px] absolute -top-9 -right-9 bg-[#1F38DB] flex items-center justify-center rounded-full">
								<p className="absolute bottom-4 left-6 text-white font-lg">2</p>
							</div>
							<h3 className="text-xl font-semibold mb-2 w-full text-[#1F38DB]">
								Berapa targetnya?
							</h3>
							<p className="text-[#757575] font-inter w-full">
								Jumlah MyPoin yang akan dikeluarkan dan target responden
							</p>

							<div className="w-full">
								<form className="flex flex-col gap-4 mt-4">
									<div className="flex flex-row items-center">
										<label className="text-gray-800 min-w-44">
											Target Responden
										</label>
										<input
											type="number"
											placeholder="Misal: 20"
											className="p-2 rounded border border-gray-300 bg-white w-full"
										/>
									</div>
									<div className="flex flex-row items-center">
										<label className="text-gray-800 min-w-44">
											MyPoin untuk setiap responden
										</label>
										<input
											type="text"
											placeholder="Misal: 200"
											className="p-2 rounded border border-gray-300 bg-white w-full"
										/>
									</div>
									<div className="mb-4 border border-[#757575]" />
								</form>
							</div>

							<div className="flex flex-col gap-4">
								<div className="flex flex-row gap-4 items-center justify-between">
									<p className="text-gray-800">Total MyPoin yang dikeluarkan</p>
									<p className="font-semibold">0</p>
								</div>

								<div className="flex flex-row gap-4 items-center justify-between">
									<p className="text-gray-800">MyPoin saya</p>
									<p className="">200.000</p>
								</div>
							</div>

							<div className="my-4 border border-[#757575]" />

							<div className="flex flex-row gap-4 items-center justify-between">
								<p className="text-gray-800">Sisa MyPoin</p>
								<p className="text-[#14AE5C]">200.000</p>
							</div>
						</div>

						<div className="bg-white p-7 rounded-lg shadow-lg w-[500px] relative overflow-clip h-full">
							<div className="size-[84px] absolute -top-9 -right-9 bg-[#1F38DB] flex items-center justify-center rounded-full">
								<p className="absolute bottom-4 left-6 text-white font-lg">3</p>
							</div>
							<h3 className="text-xl font-semibold mb-2 w-full text-[#1F38DB]">
								Bagaimana Survei Anda Tampil?
							</h3>
							<p className="text-[#757575] font-inter w-full">
								Kustomisasikan dan buat survei Anda menarik
							</p>

							<div className="w-full">
								<form className="flex flex-col gap-4 mt-4">
									<div className="flex flex-row items-center">
										<label className="text-gray-800 min-w-44">Judul</label>
										<input
											type="text"
											placeholder="Judul survei"
											className="p-2 rounded border border-gray-300 bg-white w-full"
										/>
									</div>

									<div className="flex flex-row items-start">
										<label className="text-gray-800 min-w-44">Sampul</label>
										<div
											className="relative w-full h-32 rounded border cursor-pointer hover:opacity-80"
											onClick={handleReplaceImage} // Klik untuk mengganti gambar
										>
											<img
												src={selectedImage}
												alt="Preview Sampul"
												className="w-full h-full object-cover rounded"
											/>
											<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
												<p className="text-white text-sm font-medium">
													Klik untuk Ganti Gambar
												</p>
											</div>
										</div>
									</div>

									<div className="flex flex-row items-start">
										<label className="text-gray-800 min-w-44">Deskripsi</label>
										<input
											type="text"
											placeholder="Apa tujuan survei ini?"
											className="p-2 rounded border border-gray-300 bg-white w-full"
										/>
									</div>

									<div className="flex flex-row items-start">
										<label className="text-gray-800 min-w-44">Isi Konten</label>
										<div className="flex flex-row gap-2 items-center w-full">
											<div className="flex flex-row items-center justify-center bg-[#E6E6E6] rounded-xl px-4 py-2 w-full">
												<p className="flex flex-col items-center gap-0.5">
													<span className="text-[#2073DB] text-2xl font-semibold">
														6
													</span>
													<span>Pertanyaan</span>
												</p>
											</div>
											<div className="flex flex-row items-center justify-center bg-[#E6E6E6] rounded-xl px-4 py-2 w-full">
												<p className="flex flex-col items-center gap-0.5">
													<span className="text-[#2073DB] text-2xl font-semibold">
														3
													</span>
													<span>Lainnya</span>
												</p>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow-lg w-full h-1/3 relative overflow-clip flex items-center justify-between">
						<div className="bg-gradient-to-r from-white from-40% to-80% to-transparent h-full rounded-lg w-full absolute px-12 flex items-center backdrop-blur-[2px]">
							<div className="flex items-start justify-start w-full">
								<div className="flex flex-col items-center justify-start gap-2 w-[40%]">
									<p className="text-2xl text-[#1F38DB] font-bold">
										Siap Meluncurkan?
									</p>
									<p className="w-full text-center">
										Tinjau dan bagikan survei dengan berbagai cara atau
										publikasikan di BeMySample
									</p>
									<button className="px-6 py-2 bg-[#1F38DB] flex flex-row items-center justify-center gap-2 rounded-lg mt-2 text-white">
										<Icon icon="mingcute:rocket-fill" />
										<p>Luncurkan</p>
									</button>
								</div>
							</div>
						</div>
						<div className="py-7 px-16 w-full h-1/3 flex items-center justify-between">
							<div className="size-[84px] absolute -top-9 -right-9 bg-[#1F38DB] flex items-center justify-center rounded-full">
								<p className="absolute bottom-4 left-6 text-white font-lg">4</p>
							</div>

							<div className="flex flex-col items-start gap-1">
								<p className="text-2xl text-[#1F38DB] font-bold">
									Sudah Meluncur!
								</p>
								<div className="w-[200px]">
									<span className="text-[#757575] font-normal font-['Inter']">
										Hentikan respons atau ubah pengaturan lainnya di menu{' '}
									</span>
									<span className="text-[#757575] font-bold font-['Inter']">
										Hasil
									</span>
								</div>
							</div>

							<div className="w-[55%]">
								<div className="flex items-center border border-[#757575] rounded-lg px-4 py-2">
									<input
										type="text"
										value="bemysample.com/NSDsksD293"
										readOnly
										className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
									/>

									<div className="flex items-center gap-2">
										<button className="w-7 h-7">
											<Icon
												icon="mingcute:qrcode-fill"
												className="text-gray-600"
												fontSize={20}
											/>
										</button>
										<button className="w-7 h-7">
											<Icon
												icon="mdi:content-copy"
												className="text-gray-600"
												fontSize={20}
											/>
										</button>
									</div>
								</div>

								<div className="flex items-center justify-start gap-3 mt-4 w-full">
									<button className="h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 w-full border border-[#757575]">
										<Icon
											icon="ic:baseline-email"
											className="text-gray-600 w-6 h-6"
										/>
									</button>
									<button className="h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 w-full border border-[#757575]">
										<Icon
											icon="ic:baseline-whatsapp"
											className="text-gray-600 w-6 h-6"
										/>
									</button>
									<button className="h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 w-full border border-[#757575]">
										<Icon
											icon="ic:baseline-facebook"
											className="text-gray-600 w-6 h-6"
										/>
									</button>
									<button className="h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 w-full border border-[#757575]">
										<Icon
											icon="prime:twitter"
											className="text-gray-600 w-6 h-6"
										/>
									</button>
									<button className="h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 w-full border border-[#757575]">
										<Icon
											icon="mdi:linkedin"
											className="text-gray-600 w-6 h-6"
										/>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <img
				src={footerDecorUnpublished}
				alt="footerDecorUnpublished"
				className="w-full absolute bottom-0 left-0 right-0"
			/> */}
			<img
				src={footerUnpublished}
				alt="footerUnpublished"
				className="w-full absolute bottom-0 left-0 right-0"
			/>

			<img
				src={penguinFooterPublish}
				alt="penguinFooterPublish"
				className="w-56 absolute bottom-0 right-0"
			/>

			<Helmet>
				<title>{surveyTitle} - Pratinjau Survei | BeMySample</title>
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

export default Publish
