import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import defaultCover from '../../../assets/images/defaultCover.png'
import decor1 from '../../../assets/images/section1publish.png'
import footerUnpublished from '../../../assets/images/footerGrayscalePublish.png'
import penguinFooterPublish from '../../../assets/images/penguinFooterPublish.png'
import { Helmet } from 'react-helmet'
import Cookies from 'js-cookie'
import axios from 'axios'
import { fetchUser } from '../../../api/auth'
import Loading from 'react-loading'
import { toast } from 'react-hot-toast'
import StatisticBox from '../Results/StatisticBox'

const Publish = ({ id }) => {
	const [surveyTitle, setSurveyTitle] = useState('')
	const [surveyData, setSurveyData] = useState({})
	const [surveyKriteria, setSurveyKriteria] = useState({})
	const [surveyDescription, setSurveyDescription] = useState('')
	const [respondentsTarget, setRespondentsTarget] = useState(0)
	const [myPoinPerRespondent, setMyPoinPerRespondent] = useState(0)
	const [totalMyPoin, setTotalMyPoin] = useState(0)
	const [myPoinBalance, setMyPoinBalance] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [user, setUser] = useState(null)
	const [minAge, setMinAge] = useState(0)
	const [maxAge, setMaxAge] = useState(0)

	const token = Cookies.get('auth_token')

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch User Data
				const userResponse = await fetchUser()
				const userData = userResponse.data.data
				setUser(userData)
				setMyPoinBalance(userData.poin_saya)
				console.log('User:', userData)

				// Fetch Survey Data
				const surveyResponse = await axios.get(
					`http://localhost:8000/api/surveys/${id}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				const surveyData = surveyResponse.data.data
				setSurveyData(surveyData)
				console.log('Data survei:', surveyData)

				// Cek dan set kriteria jika tersedia
				if (surveyData.kriteria && surveyData.kriteria.length > 0) {
					const kriteria = surveyData.kriteria[0] // Ambil kriteria pertama
					setSurveyKriteria(kriteria)

					// Split nilai umur target dari age_target
					const [minAgeValue, maxAgeValue] = kriteria.age_target.split(',')
					setMinAge(parseInt(minAgeValue, 10))
					setMaxAge(parseInt(maxAgeValue, 10))
				} else {
					console.warn('Kriteria tidak ditemukan dalam survei.')
				}

				// Set State Berdasarkan Data Survei
				setSurveyTitle(surveyData.surveyTitle)
				setSurveyDescription(surveyData.surveyDescription)
				setRespondentsTarget(surveyData.maxRespondents)
				setMyPoinPerRespondent(surveyData.coinAllocated)
				setTotalMyPoin(surveyData.maxRespondents * surveyData.coinAllocated)
			} catch (error) {
				console.error('Gagal mengambil data:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [id])

	// Fungsi untuk handle upload gambar sampul
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedImage, setSelectedImage] = useState(surveyData.thumbnail || '')
	const [imageLink, setImageLink] = useState('')

	// Fungsi untuk handle upload gambar file
	const uploadFile = async (e) => {
		const file = e.target.files[0] // Ambil file dari input
		if (!file) {
			toast.error('Tidak ada file yang dipilih.')
			return
		}

		toast.promise(
			(async () => {
				try {
					// Buat FormData dan tambahkan semua data survei lengkap
					const formData = new FormData()

					Object.entries(surveyData).forEach(([key, value]) => {
						if (key === 'thumbnail') return // Skip thumbnail lama
						if (key === 'kriteria' || key === 'sections') {
							formData.append(key, JSON.stringify(value)) // JSON stringify untuk nested data
						} else {
							formData.append(key, value || '') // Handle nilai null/undefined
						}
					})

					formData.append('thumbnail', file) // Tambahkan file thumbnail baru

					// Kirim PUT request
					const response = await axios.put(
						`http://localhost:8000/api/surveys/${id}`,
						formData,
						{
							headers: {
								'Content-Type': 'multipart/form-data',
								Authorization: `Bearer ${token}`,
							},
						}
					)

					// Update state setelah sukses
					setSurveyData(response.data.data)
					setSelectedImage(URL.createObjectURL(file))
					setIsModalOpen(false)

					return 'Sampul berhasil diperbarui!'
				} catch (error) {
					throw new Error('Gagal memperbarui sampul.')
				}
			})(),
			{
				loading: 'Mengunggah gambar...',
				success: 'Sampul berhasil diperbarui!',
				error: 'Gagal memperbarui sampul.',
			}
		)
	}

	// Fungsi untuk handle upload melalui link
	const uploadByLink = async () => {
		if (!imageLink) {
			toast.error('Link gambar tidak boleh kosong.')
			return
		}

		toast.promise(
			(async () => {
				try {
					// Buat objek data lengkap
					const updatedData = {
						...surveyData, // Salin semua data survei lama
						thumbnail: imageLink, // Update hanya thumbnail
						kriteria: surveyData.kriteria, // Pastikan kriteria dikirim
						sections: surveyData.sections, // Pastikan sections dikirim
					}

					// Kirim PUT request
					const response = await axios.put(
						`http://localhost:8000/api/surveys/${id}`,
						updatedData,
						{
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${token}`,
							},
						}
					)

					// Update state setelah sukses
					setSurveyData(response.data.data)
					setSelectedImage(imageLink)
					setIsModalOpen(false)

					return 'Sampul berhasil diperbarui!'
				} catch (error) {
					throw new Error('Gagal memperbarui sampul.')
				}
			})(),
			{
				loading: 'Memproses link...',
				success: 'Sampul berhasil diperbarui!',
				error: 'Gagal memperbarui sampul.',
			}
		)
	}

	const [selectedGender, setSelectedGender] = useState(
		surveyKriteria?.gender_target || 'Semua'
	)

	const onGenderChange = (gender) => {
		setSurveyKriteria((prev) => ({ ...prev, gender_target: gender }))
		console.log('Gender Target:', gender)
	}

	const handleGenderSelect = (gender) => {
		setSelectedGender(gender)
		onGenderChange(gender) // Fungsi callback untuk menyimpan data di parent component
	}

	return (
		<div className="flex flex-col w-full min-h-screen bg-gray-100 font-inter">
			<div className="min-h-20" />

			{isLoading && (
				<div className="absolute left-0 bottom-0 right-0 flex flex-col justify-center items-center w-full bg-white bg-opacity-90 backdrop-blur-md z-20 h-screen">
					<Loading type="spin" color="#1F38DB" height={50} width={50} />
					<p className="mt-4 text-gray-700 font-semibold">
						Memuat data survei...
					</p>
				</div>
			)}
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
					<div className="flex flex-row gap-4 items-center justify-between">
						{/* Semua */}
						<div
							className={`flex flex-col items-center gap-2 cursor-pointer ${
								selectedGender === 'Semua' ? 'opacity-100' : 'opacity-60'
							}`}
							onClick={() => handleGenderSelect('Semua')}
						>
							<div
								className={`rounded-full p-6 transition ${
									selectedGender === 'Semua' ? 'bg-purple-100' : 'bg-zinc-100'
								}`}
							>
								<Icon
									fontSize={60}
									icon="ph:gender-intersex-duotone"
									className="text-purple-600"
								/>
							</div>
							<p className="font-medium text-gray-700">Semua</p>
						</div>

						{/* Pria */}
						<div
							className={`flex flex-col items-center gap-2 cursor-pointer ${
								selectedGender === 'male' ? 'opacity-100' : 'opacity-60'
							}`}
							onClick={() => handleGenderSelect('male')}
						>
							<div
								className={`rounded-full p-6 transition ${
									selectedGender === 'male' ? 'bg-blue-100' : 'bg-zinc-100'
								}`}
							>
								<Icon
									fontSize={60}
									icon="mingcute:male-line"
									className="text-blue-600"
								/>
							</div>
							<p className="font-medium text-gray-700">Pria</p>
						</div>

						{/* Wanita */}
						<div
							className={`flex flex-col items-center gap-2 cursor-pointer ${
								selectedGender === 'female' ? 'opacity-100' : 'opacity-60'
							}`}
							onClick={() => handleGenderSelect('female')}
						>
							<div
								className={`rounded-full p-6 transition ${
									selectedGender === 'female' ? 'bg-pink-100' : 'bg-zinc-100'
								}`}
							>
								<Icon
									fontSize={60}
									icon="ion:female"
									className="text-pink-500"
								/>
							</div>
							<p className="font-medium text-gray-700">Wanita</p>
						</div>
					</div>

					<div>
						<form className="flex flex-col gap-4 mt-4">
							<div className="flex flex-row items-center">
								<label className="text-gray-800 min-w-44">Rentang Usia</label>
								<div className="flex flex-row gap-2 items-center">
									<input
										type="number"
										value={minAge}
										placeholder="Minimum"
										className="p-2 rounded border border-gray-300 bg-white w-full"
									/>
									<p>-</p>
									<input
										type="number"
										value={maxAge}
										placeholder="Maksimum"
										className="p-2 rounded border border-gray-300 bg-white w-full"
									/>
								</div>
							</div>
							<div className="flex flex-row items-center">
								<label className="text-gray-800 min-w-44">Lokasi</label>
								<input
									type="text"
									value={surveyKriteria.lokasi}
									placeholder="Provinsi, kota, ..."
									className="p-2 rounded border border-gray-300 bg-white w-full"
								/>
							</div>
							<div className="flex flex-row items-center">
								<label className="text-gray-800 min-w-44">Hobi</label>
								<input
									type="text"
									value={surveyKriteria.hobi}
									placeholder="Membaca, berolahraga, ..."
									className="p-2 rounded border border-gray-300 bg-white w-full"
								/>
							</div>
							<div className="flex flex-row items-center">
								<label className="text-gray-800 min-w-44">Pekerjaan</label>
								<input
									type="text"
									value={surveyKriteria.pekerjaan}
									placeholder="Pegawai, pelajar, ..."
									className="p-2 rounded border border-gray-300 bg-white w-full"
								/>
							</div>
							<div className="flex flex-row items-center">
								<label className="text-gray-800 min-w-44">Tempat Bekerja</label>
								<input
									type="text"
									value={surveyKriteria.tempat_bekerja}
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
											value={respondentsTarget}
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
											value={myPoinPerRespondent}
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
									<p className="font-semibold">
										{totalMyPoin.toLocaleString('id-ID')}
									</p>
								</div>

								<div className="flex flex-row gap-4 items-center justify-between">
									<p className="text-gray-800">MyPoin saya</p>
									<p className="">{myPoinBalance.toLocaleString('id-ID')}</p>
								</div>
							</div>

							<div className="my-4 border border-[#757575]" />

							{myPoinBalance - totalMyPoin < 0 ? (
								<div className="flex flex-row items-center justify-center gap-2 bg-red-200 rounded-xl py-2 px-4 mt-4">
									<Icon icon="ix:warning-filled" className="text-red-500" />
									<p className="text-red-500">MyPoin Anda tidak cukup!</p>
								</div>
							) : (
								<div className="flex flex-row gap-4 items-center justify-between">
									<p className="text-gray-800">Sisa MyPoin</p>
									{(myPoinBalance - totalMyPoin).toLocaleString('id-ID') >=
									0 ? (
										<p className="font-semibold text-green-600">
											{(myPoinBalance - totalMyPoin).toLocaleString('id-ID')}
										</p>
									) : (
										<p className="text-red-500 font-semibold">
											{(myPoinBalance - totalMyPoin).toLocaleString('id-ID')}
										</p>
									)}
								</div>
							)}
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
											value={surveyTitle}
											placeholder="Judul survei"
											className="p-2 rounded border border-gray-300 bg-white w-full"
										/>
									</div>

									<div className="flex flex-row items-start">
										<label className="text-gray-800 min-w-44">Sampul</label>
										<div
											className="relative w-full h-32 rounded border cursor-pointer hover:opacity-80"
											// onClick={handleReplaceImage} // Klik untuk mengganti gambar
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
											value={surveyDescription}
											placeholder="Apa tujuan survei ini?"
											className="p-2 rounded border border-gray-300 bg-white w-full"
										/>
									</div>

									<div className="flex flex-row items-start">
										<label className="text-gray-800 min-w-44">Isi Konten</label>
										<div className="flex flex-row gap-2 items-center w-full">
											<StatisticBox
												label="Pertanyaan"
												value={surveyData.sections?.length || 0}
											/>
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
									<p
										className={`text-2xl font-bold ${
											myPoinBalance - totalMyPoin < 0
												? 'text-red-500'
												: 'text-[#1F38DB]'
										}`}
									>
										{myPoinBalance - totalMyPoin < 0
											? 'Poin Tidak Mencukupi'
											: 'Siap Meluncurkan?'}
									</p>
									<p className="w-full text-center">
										{myPoinBalance - totalMyPoin < 0
											? 'Poin Anda tidak mencukupi untuk meluncurkan survei ini. Tambahkan poin terlebih dahulu.'
											: 'Tinjau dan bagikan survei dengan berbagai cara atau publikasikan di BeMySample'}
									</p>
									<button
										className={`px-6 py-2 flex flex-row items-center justify-center gap-2 rounded-lg mt-2 text-white ${
											myPoinBalance - totalMyPoin < 0
												? 'bg-gray-400 cursor-not-allowed'
												: 'bg-[#1F38DB] hover:bg-[#1632A1]'
										}`}
										onClick={() => {
											if (myPoinBalance - totalMyPoin >= 0) {
												// Tambahkan fungsi untuk meluncurkan survei
												console.log('Survei berhasil diluncurkan!')
											} else {
												console.log('Poin tidak mencukupi!')
											}
										}}
										disabled={myPoinBalance - totalMyPoin < 0}
									>
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
				{/* <title>{surveyTitle} - Pratinjau Survei | BeMySample</title> */}
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
