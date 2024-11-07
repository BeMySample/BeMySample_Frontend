import React from 'react'
import { Icon } from '@iconify/react'
import Select from 'react-select'

const RightSidebar = ({
	contentText,
	setContentText,
	buttonText,
	setButtonText,
	bgColor,
	setBgColor,
	buttonColor,
	setButtonColor,
	textColor,
	setTextColor,
	backgroundImage,
	handleBackgroundChange,
	activeSection,
}) => {
	const options = [
		{
			value: 'Selamat datang',
			label: 'Pembuka',
			icon: 'hugeicons:start-up-02',
		},
		{ value: 'Terima kasih!', label: 'Penutup', icon: 'icon-park-outline:bye' },
		{ value: 'Survey Baru', label: 'Survey Baru', icon: 'ri:survey-line' },
		{ value: 'Teks Pendek', label: 'Teks Pendek', icon: 'mdi:form-textbox' },
		{ value: 'Waktu', label: 'Waktu', icon: 'mdi:clock-outline' },
		{ value: 'Dropdown', label: 'Dropdown', icon: 'mdi:menu-down' },
		{
			value: 'Pilihan Ganda',
			label: 'Pilihan Ganda',
			icon: 'mdi:checkbox-multiple-marked-outline',
		},
		{ value: 'Quote', label: 'Quote', icon: 'mdi:format-quote-close' },
		{ value: 'Teks Panjang', label: 'Teks Panjang', icon: 'mdi:form-textarea' },
		{ value: 'Likert', label: 'Likert', icon: 'mdi:poll' },
	]

	// Custom option component with icon for react-select
	const customOption = (props) => {
		const { data, innerRef, innerProps } = props
		return (
			<div
				ref={innerRef}
				{...innerProps}
				className="flex items-center p-2 space-x-2 hover:bg-gray-200"
			>
				<Icon icon={data.icon} className="text-lg" />
				<span>{data.label}</span>
			</div>
		)
	}

	return (
		<aside className="w-1/5 bg-neutral-100 p-4">
			<div className="space-y-6 font-inter text-sm text-gray-700">
				{/* Section Konten dengan Divider */}
				<div className="flex items-center space-x-2">
					<p className="font-bold">Konten</p>
					<div className="flex-grow border-t border-gray-400" />
				</div>

				<div className="space-y-4">
					{/* Dropdown Select for Content */}
					<div className="flex items-center">
						<label className="w-28 text-gray-800">Isi</label>
						<div className="flex-grow">
							<Select
								value={options.find((option) => option.value === contentText)}
								onChange={(option) => setContentText(option.value)}
								options={options}
								getOptionLabel={(e) => (
									<div className="flex items-center space-x-2">
										<Icon icon={e.icon} className="text-lg" />
										<span>{e.label}</span>
									</div>
								)}
								components={{ Option: customOption }}
								placeholder="Pilih Template"
								className="w-full"
							/>
						</div>
					</div>

					{/* Conditional inputs based on selected content type */}
					{contentText === 'Selamat datang' || contentText === 'Survey Baru' ? (
						<div className="flex items-center">
							<label className="w-28 text-gray-800">Tombol</label>
							<input
								type="text"
								value={buttonText}
								onChange={(e) => setButtonText(e.target.value)}
								className="flex-grow p-2 rounded border border-gray-300 bg-gray-100"
							/>
						</div>
					) : null}

					{contentText === 'Teks Pendek' && (
						<div className="flex items-center">
							<label className="w-28 text-gray-800">Label Teks Pendek</label>
							<input
								type="text"
								placeholder="Masukkan label..."
								className="flex-grow p-2 rounded border border-gray-300 bg-gray-100"
							/>
						</div>
					)}

					{contentText === 'Waktu' && (
						<div className="flex items-center">
							<label className="w-28 text-gray-800">Format Waktu</label>
							<select className="flex-grow p-2 rounded border border-gray-300 bg-white">
								<option value="12-hour">12 Jam</option>
								<option value="24-hour">24 Jam</option>
							</select>
						</div>
					)}

					{contentText === 'Dropdown' && (
						<div className="space-y-2">
							<label className="text-gray-800">Opsi Dropdown</label>
							<input
								type="text"
								placeholder="Masukkan opsi (pisahkan dengan koma)"
								className="w-full p-2 rounded border border-gray-300 bg-gray-100"
							/>
						</div>
					)}

					{contentText === 'Pilihan Ganda' && (
						<div className="space-y-2">
							<label className="text-gray-800">Opsi Pilihan Ganda</label>
							<input
								type="text"
								placeholder="Masukkan opsi (pisahkan dengan koma)"
								className="w-full p-2 rounded border border-gray-300 bg-gray-100"
							/>
						</div>
					)}

					{contentText === 'Quote' && (
						<div className="space-y-2">
							<label className="text-gray-800">Quote</label>
							<textarea
								placeholder="Masukkan teks quote..."
								className="w-full p-2 rounded border border-gray-300 bg-gray-100"
							/>
						</div>
					)}

					{contentText === 'Teks Panjang' && (
						<div className="flex items-center">
							<label className="w-28 text-gray-800">Label Teks Panjang</label>
							<input
								type="text"
								placeholder="Masukkan label..."
								className="flex-grow p-2 rounded border border-gray-300 bg-gray-100"
							/>
						</div>
					)}

					{contentText === 'Likert' && (
						<div className="space-y-2">
							<label className="text-gray-800">Skala Likert (1-5)</label>
							<p className="text-gray-600">
								Masukkan label untuk setiap tingkat.
							</p>
							<input
								type="text"
								placeholder="Label 1 (Contoh: Sangat Tidak Setuju)"
								className="w-full p-2 rounded border border-gray-300 bg-gray-100"
							/>
							<input
								type="text"
								placeholder="Label 5 (Contoh: Sangat Setuju)"
								className="w-full p-2 rounded border border-gray-300 bg-gray-100"
							/>
						</div>
					)}
				</div>

				{/* Section Desain dengan Divider */}
				<div className="flex items-center space-x-2 mt-4">
					<p className="font-bold">Desain</p>
					<div className="flex-grow border-t border-gray-400" />
				</div>

				<div className="space-y-4">
					{/* Upload Background with Custom Icon */}
					<div className="flex items-center justify-between">
						<label className="w-28 text-gray-800">Latar</label>
						<div className="relative flex-grow">
							<input
								type="text"
								placeholder="Tidak ada"
								value={backgroundImage ? 'Latar terpilih' : ''}
								readOnly
								className="w-full p-2 pr-10 rounded border border-gray-300 bg-gray-100 text-gray-500"
							/>

							{/* Hidden File Input */}
							<input
								type="file"
								accept="image/*"
								onChange={handleBackgroundChange}
								className="hidden"
								id="background-upload"
							/>

							{/* Custom Upload Icon */}
							<label
								htmlFor="background-upload"
								className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
							>
								<Icon icon="mdi:upload" className="text-gray-500 text-lg" />
							</label>
						</div>
					</div>

					{/* Background Color Picker */}
					<div className="flex items-center justify-between">
						<label className="w-28 text-gray-800">Warna Latar</label>
						<div className="relative flex-grow">
							<input
								type="text"
								value={bgColor}
								onChange={(e) => setBgColor(e.target.value)}
								className="w-full p-2 pr-10 rounded border border-gray-300 bg-gray-100"
							/>
							<input
								type="color"
								value={bgColor}
								onChange={(e) => setBgColor(e.target.value)}
								className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 border-none rounded-full cursor-pointer"
							/>
						</div>
					</div>

					{/* Button Color Picker */}
					<div className="flex items-center justify-between">
						<label className="w-28 text-gray-800">Warna Tombol</label>
						<div className="relative flex-grow">
							<input
								type="text"
								value={buttonColor}
								onChange={(e) => setButtonColor(e.target.value)}
								className="w-full p-2 pr-10 rounded border border-gray-300 bg-gray-100"
							/>
							<input
								type="color"
								value={buttonColor}
								onChange={(e) => setButtonColor(e.target.value)}
								className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 border-none rounded-full cursor-pointer"
							/>
						</div>
					</div>

					{/* Text Color Picker */}
					<div className="flex items-center justify-between">
						<label className="w-28 text-gray-800">Warna Teks</label>
						<div className="relative flex-grow">
							<input
								type="text"
								value={textColor}
								onChange={(e) => setTextColor(e.target.value)}
								className="w-full p-2 pr-10 rounded border border-gray-300 bg-gray-100"
							/>
							<input
								type="color"
								value={textColor}
								onChange={(e) => setTextColor(e.target.value)}
								className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 border-none rounded-full cursor-pointer"
							/>
						</div>
					</div>
				</div>
			</div>
		</aside>
	)
}

export default RightSidebar
