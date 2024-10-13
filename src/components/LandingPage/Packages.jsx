import React from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

const featuresList = [
	'Membuat survei',
	'Publikasi survei',
	'Dashboard analisis hasil survei',
	'Anti-spam dan validasi respons',
	'MyPoin diberikan per bulan',
	'Naikkan eksposur',
	'Bantuan AI',
	'Layanan pelanggan',
]

const packagesData = [
	{
		name: 'Paket Gratis',
		price: 'Rp0',
		perMonth: '',
		bgColor: '',
		features: [true, true, true, true, '0', false, false, 'E-mail'],
	},
	{
		name: 'Paket Premium',
		price: 'Rp20.000',
		perMonth: '/bulan',
		bgColor: 'bg-[#2073DB]',
		altBgColor: 'bg-[#1E63BC]',
		features: [true, true, true, true, '100', true, true, 'E-mail, Live Chat'],
	},
	{
		name: 'Paket Plus',
		price: 'Rp120.000',
		perMonth: '/bulan',
		bgColor: '',
		features: [
			true,
			true,
			true,
			true,
			'1000',
			true,
			true,
			'Telepon, E-mail, Live Chat',
		],
	},
]

const Packages = () => {
	return (
		<div className="flex flex-col items-center justify-center w-full py-20 gap-[49px] px-6 bg-white">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="flex flex-col items-center"
			>
				<p className="text-[45px] text-center">Pilihan untuk Anda</p>
				<p className="text-[16pt] text-center">
					Berbagai pilihan untuk disesuaikan dengan kebutuhan
				</p>
			</motion.div>

			<div className="w-full font-poppins px-4 md:px-20">
				<motion.table
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="min-w-full table-auto"
				>
					<thead>
						<tr>
							<th className="p-2 md:p-4 text-left"></th>
							{packagesData.map((pkg, index) => (
								<th
									key={index}
									className={`relative p-2 md:p-4 pt-10 text-center font-semibold text-[16pt] ${
										pkg.bgColor
											? `${pkg.bgColor} text-white rounded-t-[16pt]`
											: ''
									}`}
								>
									{pkg.name}
									{pkg.name === 'Paket Premium' && (
										<div className="absolute top-[-10px] right-[-10px] flex items-center justify-center size-14 rounded-full bg-[#00008B] z-10">
											<Icon
												icon="mdi:thumb-up"
												className="text-white"
												width="30"
												height="30"
											/>
										</div>
									)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{featuresList.map((feature, idx) => (
							<tr
								key={idx}
								className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
							>
								<td className="p-2 md:p-4 text-[16pt]">{feature}</td>
								{packagesData.map((pkg, index) => (
									<td
										key={index}
										className={`p-2 md:p-4 text-center ${
											pkg.name === 'Paket Premium'
												? idx % 2 === 0
													? pkg.altBgColor
													: pkg.bgColor
												: ''
										}`}
									>
										{typeof pkg.features[idx] === 'boolean' ? (
											<div className="flex justify-center">
												<Icon
													icon={
														pkg.features[idx]
															? 'icon-park-solid:check-one'
															: 'ep:close-bold'
													}
													className={`size-[25pt] ${
														pkg.name === 'Paket Premium'
															? 'text-white'
															: 'text-black'
													}`}
												/>
											</div>
										) : (
											<span
												className={`${
													pkg.name === 'Paket Premium'
														? 'text-white'
														: 'text-black'
												} text-[16pt]`}
											>
												{pkg.features[idx]}
											</span>
										)}
									</td>
								))}
							</tr>
						))}
						<div className='h-6' />
						<tr
							className={`mt-4 ${
								featuresList.length % 2 === 0 ? 'bg-white' : ''
							}`}
						>
							<td className="p-4 font-bold mt-10"></td>
							{packagesData.map((pkg, index) => (
								<td
									key={index}
									className={`px-[13px] py-[24px] mt-4 text-center font-bold font-inter text-[29pt] ${
										pkg.bgColor
									} ${pkg.bgColor ? 'rounded-[16pt]' : ''} ${
										pkg.name === 'Paket Premium'
											? 'text-white'
											: 'text-[#2073DB]'
									}`}
								>
									{pkg.price} <span className="text-sm">{pkg.perMonth}</span>
								</td>
							))}
						</tr>
					</tbody>
				</motion.table>
			</div>

			<motion.button
				className="px-4 py-2 rounded-[8px] text-[18pt] font-bold bg-[#1F38DB] text-white mt-2 font-inter"
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				transition={{ duration: 0.2 }}
			>
				Berlangganan Sekarang
			</motion.button>
		</div>
	)
}

export default Packages
