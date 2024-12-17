import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { fetchUser } from '../../api/auth'

const RiwayatItem = ({ type, title, description, amount, time }) => {
	return (
		<div className="flex items-center justify-between py-2 border-b last:border-none">
			<div className="flex items-center gap-3">
				<div
					className={`w-8 h-8 flex items-center justify-center rounded-full ${
						type === 'decrease' ? 'bg-red-100' : 'bg-green-100'
					}`}
				>
					<motion.span
						className={`text-lg ${
							type === 'decrease' ? 'text-red-500' : 'text-green-500'
						}`}
					>
						{type === 'decrease' ? (
							<Icon icon="icon-park-solid:down-two" />
						) : (
							<Icon icon="icon-park-solid:up-two" />
						)}
					</motion.span>
				</div>
				<div>
					<p className="font-semibold text-sm">{title}</p>
					<p className="text-xs text-gray-500">{description}</p>
				</div>
			</div>
			<div className="text-right">
				<p
					className={`text-sm font-semibold ${
						type === 'decrease' ? 'text-red-500' : 'text-green-500'
					}`}
				>
					{type === 'decrease' ? '-' : '+'}
					{amount.toLocaleString('id-ID')}
				</p>
				<p className="text-xs text-gray-500">{time}</p>
			</div>
		</div>
	)
}

const MyPoin = () => {
	const riwayat = [
		{
			type: 'decrease',
			title: 'Anggaran Survei',
			description: 'Preferensi Pemilihan Umum',
			amount: 100000,
			time: '22.13',
			dateGroup: 'Hari Ini',
		},
		{
			type: 'increase',
			title: 'Kontribusi',
			description: 'Kamu Tim Android atau iPhone',
			amount: 200,
			time: '10.13',
			dateGroup: 'Hari Ini',
		},
		{
			type: 'decrease',
			title: 'Anggaran Survei',
			description: 'Survei Lorem Ipsum',
			amount: 200,
			time: '10.29',
			dateGroup: 'Sabtu, 9 November 2024',
		},
	]

	const groupedRiwayat = riwayat.reduce((acc, curr) => {
		acc[curr.dateGroup] = acc[curr.dateGroup] || []
		acc[curr.dateGroup].push(curr)
		return acc
	}, {})

	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await fetchUser()
				setUser(response.data.data)
			} catch (err) {
				console.error('Error fetching user:', err.response?.data || err.message)
			} finally {
				setIsLoading(false)
			}
		}

		getUser()
	}, [])

	return (
		<>
			<div
				className="w-full flex justify-center items-start pt-[90px] font-inter"
				style={{ minHeight: 'calc(100vh - 90px)' }}
			>
				<div className="w-full max-w-4xl flex flex-col items-center">
					<div className="text-center mb-8">
						<p className="text-[#2073DB] text-sm font-semibold">
							Jumlah MyPoin
						</p>
						<div className="border-2 border-[#2073DB] rounded-2xl flex items-center justify-center px-12 py-6 mt-2 gap-2.5">
							<Icon
								icon="akar-icons:coin"
								className="text-[#2073DB]"
								fontSize={28}
							/>
							<p className="text-[#2073DB] text-2xl font-bold">
								{isLoading ? 0 : user.poin_saya.toLocaleString('id-ID')}
							</p>
						</div>
					</div>

					<div className="bg-white p-4 rounded-2xl border-2 shadow-md w-full">
						<p className="text-blue-600 font-bold mb-4 text-center">Riwayat</p>
						{Object.keys(groupedRiwayat).map((dateGroup) => (
							<div key={dateGroup}>
								<p className="text-xs text-[#757575] px-4 py-2 bg-[#F5F5F5] mb-2 mt-5">
									{dateGroup}
								</p>
								<div className="space-y-4">
									{groupedRiwayat[dateGroup].map((item, index) => (
										<RiwayatItem
											key={index}
											type={item.type}
											title={item.title}
											description={item.description}
											amount={item.amount}
											time={item.time}
										/>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default MyPoin
