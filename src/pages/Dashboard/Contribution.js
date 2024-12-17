import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import ContributionCard from '../../components/Dashboard/ContributionCard'
import toast, { Toaster } from 'react-hot-toast'
import useFetchContributions from '../../hooks/useFetchContributions'
import Loading from 'react-loading'

const Contribution = () => {
	const { contributions, isLoadingContributions } = useFetchContributions()

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

		const sortedContributions = [...contributions].sort((a, b) => {
			const dateA = parseDate(a.updated)
			const dateB = parseDate(b.updated)
			return dateB - dateA // Urutkan terbaru ke terlama
		})

		console.log(sortedContributions)
		toast.success('Survei berhasil diurutkan berdasarkan tanggal terbaru!')
	}

	const handleFilter = () => {
		// Contoh logika filter untuk survei yang masih aktif
		const activeContributions = contributions.filter(
			(survey) => survey.status === 'active'
		)
		if (activeContributions.length > 0) {
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
				{/* Main Content */}
				<div className="flex-grow flex flex-col items-start gap-4 p-10 pt-[120px] overflow-y-auto">
					<div className="w-full flex justify-between items-center">
						<div>
							<p className="text-[18px] font-semibold font-inter">
								Survei Tersedia
							</p>
							<p className="text-[12px] text-[#757575] font-inter">
								Isi survei yang tersedia dan dapatkan MyPoin
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

					<div className="flex flex-col w-full mt-4">
						{isLoadingContributions ? (
							// Tampilkan spinner loading
							<div className="flex flex-col gap-2 justify-center items-center w-full h-[200px] border-2 rounded-2xl">
								<Loading type="spin" color="#1F38DB" height={50} width={50} />
								Memuat data kontribusi...
							</div>
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
			</div>

			<Helmet>
				<title>Survei Saya - BeMySample</title>
			</Helmet>
		</>
	)
}

export default Contribution
