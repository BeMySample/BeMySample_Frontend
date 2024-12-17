import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import defaultCover from '../../../assets/images/defaultCover.png'
import penguinFooterPublish from '../../../assets/images/penguinFooterPublish.png'
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import ProgressBarWithIndicator from '../../../components/SurveyEdit/Results/ProgressBarWithDetails'
import StatisticBox from '../Results/StatisticBox'
import ResponseTable from '../Results/ResponseTable'
import Questions from '../Results/Questions'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loading from 'react-loading'

ChartJS.register(ArcElement, Tooltip, Legend)

const Results = ({ id }) => {
	const [surveyData, setSurveyData] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const token = Cookies.get('auth_token')

	useEffect(() => {
		const fetchSurveyData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/api/surveys/${id}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				const responseData = response.data.data
				console.log('Data survei:', surveyData)
				setSurveyData(responseData)
			} catch (error) {
				console.error('Gagal mengambil data survei:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchSurveyData()
	}, [id])

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

	const [selectedGender, setSelectedGender] = useState('Pilih Gender')
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

	const changeGender = (gender) => {
		setSelectedGender(gender)
		setDropdownOpen(false)
	}

	const genderData = {
		Male: 60, // Contoh jumlah responden pria
		Female: 40, // Contoh jumlah responden wanita
	}

	// Data untuk chart
	const chartData = {
		datasets: [
			{
				data: [genderData.Male, genderData.Female],
				backgroundColor: ['#3c76db', '#8cb4ec'],
				hoverBackgroundColor: ['#3c76db', '#8cb4ec'],
			},
		],
		labels: ['Male', 'Female'],
	}

	const [page, setPage] = useState('results')
	const [searchTerm, setSearchTerm] = useState('')
	const [filter, setFilter] = useState('all')

	const handleSearch = (e) => {
		setSearchTerm(e.target.value)
	}

	const questionsData = [
		{
			questionNumber: 1,
			icon: 'mdi:hand-wave', // Ganti icon sesuai kebutuhan
			questionTitle: 'Selamat datang!',
			responses: [],
		},
		{
			questionNumber: 2,
			icon: 'mdi:account', // Ganti icon sesuai kebutuhan
			questionTitle: 'Siapa nama Anda?',
			responses: [
				{ name: 'Andi Danan Prakoso', timeAgo: '1 bulan lalu' },
				{ name: 'Surya Ahmad Wildan', timeAgo: '1 bulan lalu' },
				{ name: 'Raditya Rakha Renanda', timeAgo: '2 bulan lalu' },
			],
		},
		{
			questionNumber: 3,
			icon: 'mdi:calendar-outline',
			questionTitle: 'Mohon masukkan tanggal lahir',
			responses: [
				{ name: '13.00', timeAgo: '1 bulan lalu' },
				{ name: '14.00', timeAgo: '2 bulan lalu' },
			],
		},
	]

	return (
		<div className="flex pt-20 w-full min-h-screen bg-gray-100 font-inter">
			{/* Loading State */}
			{isLoading ? (
				<div className="absolute left-0 bottom-0 right-0 flex flex-col justify-center items-center w-full bg-white bg-opacity-90 backdrop-blur-md z-20 h-screen">
					<Loading type="spin" color="#1F38DB" height={50} width={50} />
					<p className="mt-4 text-gray-700 font-semibold">
						Memuat data survei...
					</p>
				</div>
			) : surveyData?.status === 'draft' ? (
				/* UI untuk Status Draft */
				<div
					className="absolute left-0 bottom-0 right-0 flex flex-col justify-center items-center w-full bg-white bg-opacity-90 backdrop-blur-md z-20"
					style={{ height: 'calc(100vh - 5rem)' }}
				>
					<div className="flex flex-col items-center gap-4 text-center">
						{/* Icon */}
						<div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-500 bg-opacity-10">
							<Icon
								icon="mdi:alert-circle-outline"
								className="text-red-500"
								fontSize={48}
							/>
						</div>

						{/* Title */}
						<h1 className="text-2xl font-bold text-gray-800">
							Survei Belum Diterbitkan
						</h1>

						{/* Message */}
						<p className="text-gray-600 max-w-md">
							Atur penerbitan agar survei dapat diisi oleh responden dan Anda
							dapat melihat responsnya di sini.
						</p>

						{/* Button */}
						<Link
							to={`/dashboard/survey/publish/${id}`}
							className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
						>
							Siapkan Penerbitan
						</Link>
					</div>
				</div>
			) : (
				/* Render untuk status active atau closed */
				<div className="flex flex-col m-7 justify-center items-center gap-4">
					<div className="flex flex-row gap-4 justify-center z-10 h-full">
						<div className="p-3 rounded-xl bg-white flex flex-col items-start gap-3 w-full">
							<img
								src={defaultCover}
								alt="defaultCover"
								className="w-full h-24"
							/>
							<p className="text-center text-lg font-bold w-">
								{surveyData?.surveyTitle || 'Judul survei'}
							</p>
							<hr className="w-full" />
							<p className="text-sm text-gray-500">
								{surveyData?.surveyDescription || 'Deskripsi survei'}
							</p>
							<hr className="w-full" />
							<div className="grid grid-cols-2 gap-2 w-full">
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
							{/* Progress Bar - Mengisi Lebar Penuh */}
							<div className="h-28 w-full">
								<ProgressBarWithIndicator completed={20} target={190} />
							</div>
							<p className="text-gray-700 text-center w-full">
								Sedikit lagi! Yuk, terus bagikan surveimu untuk mencapai target
							</p>
							<hr className="w-full" />

							{/* Statistik */}
							<div className="flex flex-row gap-2 items-center w-full">
								<StatisticBox value="210" label="Melihat" />
								<StatisticBox value="13" label="Drop-off" />
								<StatisticBox value="190" label="Menyelesaikan" />
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

							{/* Footer */}
							{/* <div className="relative w-full h-[150px]"> */}
							{/* Gambar Footer */}
							<img
								className="w-auto h-[109px] absolute left-[9px] bottom-0"
								src={penguinFooterPublish}
								alt="Footer"
							/>

							{/* Kotak Notifikasi */}
							<div className="absolute left-[90px] bottom-20 bg-[#d3d3d3] rounded-t-lg rounded-br-lg p-4 w-[285px] h-[66px] flex items-center justify-between shadow-lg">
								<p className="text-sm text-gray-700 leading-tight">
									Sedikit lagi, hanya tinggal <b>10 orang</b> saja!
								</p>
								{/* Optional: Icon atau Dekorasi */}
								<div className="w-4 h-4 flex items-center justify-center">
									<div className="w-[13.27px] bg-gray-400 rounded-full"></div>
								</div>
							</div>
							{/* </div> */}
						</div>

						<div className="p-3 pl-6 relative rounded-xl bg-white flex flex-col items-start gap-3 w-full">
							<div className="flex flex-row justify-between items-center w-full">
								<b>Kriteria Responden</b>

								<div className="relative">
									<motion.button
										onClick={toggleDropdown}
										className="flex items-center gap-2 border-2 px-4 py-2 rounded-xl bg-white border-gray-300"
									>
										<span>{selectedGender}</span>
										<div
											className={`${
												dropdownOpen ? '-rotate-180' : ''
											} transition-transform`}
										>
											<Icon icon="ep:arrow-down-bold" />
										</div>
									</motion.button>
									{dropdownOpen && (
										<motion.div
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
											transition={{ duration: 0.2 }}
											className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-30"
										>
											<ul className="py-2">
												<motion.li
													onClick={() => {
														changeGender('Male')
													}}
													className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
													whileHover={{ scale: 1.05 }}
												>
													Male
												</motion.li>
												<motion.li
													onClick={() => {
														changeGender('Female')
													}}
													className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
													whileHover={{ scale: 1.05 }}
												>
													Female
												</motion.li>
											</ul>
										</motion.div>
									)}
								</div>
							</div>
							{/* Pie Chart Section */}
							<div className="w-full h-80 mt-6 flex justify-center items-center">
								<Pie data={chartData} className="w-full" />
							</div>

							<p className="p-4 rounded-xl bg-[#F5F5F5]">
								Karakteristik responden <u>terbanyak</u> adalah <b>pria</b>{' '}
								dengan <b>usia 20-30 tahun</b> dan bekerja sebagai{' '}
								<b>pegawai swasta</b> (25% dari total responden)
							</p>
						</div>
					</div>

					<div className="flex flex-row justify-between gap-4 w-full h-14">
						<button className="flex flex-row items-center gap-2 justify-center px-6 py-3 border-2 border-[#1F38DB] w-fit rounded-lg h-full">
							<Icon
								icon="material-symbols:download"
								className="text-[#1F38DB]"
							/>
							<b className="text-[#1F38DB]">Unduh Respons</b>
						</button>

						<div className="flex flex-row items-center justify-between gap-3 h-full">
							<p>Lihat respons lengkap berdasarkan</p>
							<button
								onClick={() => setPage('questions')}
								className="flex flex-row items-center gap-2 justify-center px-6 py-3 border-2 border-[#1F38DB] bg-[#1F38DB] w-fit rounded-lg h-full"
							>
								<Icon
									icon="ic:baseline-question-answer"
									className="text-white"
								/>
								<b className="text-white">Pertanyaan</b>
							</button>
							<button
								onClick={() => setPage('respondents')}
								className="flex flex-row items-center gap-2 justify-center px-6 py-3 border-2 border-[#1F38DB] w-fit rounded-lg h-full"
							>
								<Icon icon="ic:baseline-people" className="text-[#1F38DB]" />
								<p className="text-[#1F38DB]">Responden</p>
							</button>
						</div>
					</div>
				</div>
			)}

			<Helmet>
				<title>{surveyData?.surveyTitle || 'Hasil Survei'} | BeMySample</title>
			</Helmet>
		</div>
	)
}

export default Results
