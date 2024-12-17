import React from 'react'
import { Icon } from '@iconify/react'

const ResponseTable = ({ searchTerm, filter }) => {
	// Data awal
	const data = [
		{
			date: '2 November 2024',
			time: '13.45',
			name: 'Andi Danan Prakoso',
			birthDate: 'Selasa, 4 Januari 2002',
			province: 'Daerah Istimewa Yogyakarta',
			opinion: 'Saya tidak mengikuti Pemilu',
			reason:
				'Soalnya saya malas aja ikut sistem pemilu yg gitu-gitu terus, harus datang terus ribet lipat2 surat suara. Pengen simpel aja',
			rating: 0,
		},
		{
			date: '2 November 2024',
			time: '14.45',
			name: 'Surya Ahmad Wildan',
			birthDate: 'Selasa, 4 Januari 2002',
			province: 'Daerah Istimewa Yogyakarta',
			opinion: 'Saya tidak mengikuti Pemilu',
			reason:
				'krn ga ngerasa aja kalau suara saya bakal ngaruh ke pemilihan akhir, suara orang ga ikut ga bakal ngaruh jg kan???',
			rating: 0,
		},
		{
			date: '2 November 2024',
			time: '14.45',
			name: 'Lorem Ipsum',
			birthDate: 'Selasa, 4 Januari 2002',
			province: 'Lorem Ipsum',
			opinion: 'Lorem Ipsum',
			reason:
				'Lorem ipsum dolor sit amet consectetur. Et nulla egestas mauris euismod aliquam egestas imperdiet mi eu.',
			rating: 1,
		},
	]

	// Logika filter dan pencarian
	const filteredData = data.filter((item) => {
		// Filter berdasarkan rating
		if (filter === 'withRating' && item.rating === 0) return false
		if (filter === 'noRating' && item.rating > 0) return false

		// Filter berdasarkan pencarian (nama atau provinsi)
		if (
			searchTerm &&
			!item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			!item.province.toLowerCase().includes(searchTerm.toLowerCase())
		) {
			return false
		}

		return true
	})

	// Render rating
	const renderStars = (rating) => {
		return [...Array(5)].map((_, index) => (
			<span key={index} className="text-yellow-500">
				{index < rating ? '★' : '☆'}
			</span>
		))
	}

	return (
		<div className="w-full p-4 bg-gray-50">
			<table className="w-full border border-gray-200 rounded-lg">
				<thead className="bg-gray-100">
					<tr>
						<th className="text-left px-4 py-2.5 border w-fit">
							<input type="checkbox" className="w-4 h-4" />
						</th>
						<th className="text-left px-4 py-2.5 border">
							<span className="bg-purple-600 text-white p-2 rounded-lg inline-flex items-center">
								<Icon icon="mdi:clock-outline" />
							</span>{' '}
							Waktu Respons
						</th>
						<th className="text-left px-4 py-2.5 border">
							<span className="bg-purple-600 text-white p-2 rounded-lg inline-flex items-center">
								<Icon icon="mdi:account-outline" />
							</span>{' '}
							Siapa nama Anda?
						</th>
						<th className="text-left px-4 py-2.5 border">
							<span className="bg-purple-600 text-white p-2 rounded-lg inline-flex items-center">
								<Icon icon="mdi:calendar-outline" />
							</span>{' '}
							Tanggal Lahir
						</th>
						<th className="text-left px-4 py-2.5 border">
							<span className="bg-purple-600 text-white p-2 rounded-lg inline-flex items-center">
								<Icon icon="mdi:map-marker-outline" />
							</span>{' '}
							Provinsi
						</th>
						<th className="text-left px-4 py-2.5 border">
							<span className="bg-purple-600 text-white p-2 rounded-lg inline-flex items-center">
								<Icon icon="mdi:comment-outline" />
							</span>{' '}
							Pendapat
						</th>
						<th className="text-left px-4 py-2.5 border">
							<span className="bg-purple-600 text-white p-2 rounded-lg inline-flex items-center">
								<Icon icon="mdi:lightbulb-outline" />
							</span>{' '}
							Alasan
						</th>
						<th className="text-left px-4 py-2.5 border">
							<span className="bg-purple-600 text-white p-2 rounded-lg inline-flex items-center">
								<Icon icon="mdi:star-outline" />
							</span>{' '}
							Rating
						</th>
					</tr>
				</thead>
				<tbody>
					{filteredData.length > 0 ? (
						filteredData.map((item, index) => (
							<tr key={index} className="hover:bg-gray-50">
								<td className="px-4 py-2.5 border">
									<input type="checkbox" className="w-4 h-4" />
								</td>
								<td className="px-4 py-2.5 border">
									{item.date} <br /> {item.time}
								</td>
								<td className="px-4 py-2.5 border">{item.name}</td>
								<td className="px-4 py-2.5 border">{item.birthDate}</td>
								<td className="px-4 py-2.5 border">{item.province}</td>
								<td className="px-4 py-2.5 border">{item.opinion}</td>
								<td className="px-4 py-2.5 border">{item.reason}</td>
								<td className="px-4 py-2.5 border">{renderStars(item.rating)}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="8" className="text-center p-4">
								Tidak ada data yang sesuai.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default ResponseTable
