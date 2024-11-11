import React from 'react'
import Select from 'react-select'
import { Icon } from '@iconify/react'

const RightSidebar = ({
	contentText,
	setContentText,
	setSelectedIcon,
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
	title,
	setTitle,
	description,
	setDescription,
}) => {
	// Daftar opsi dengan ikon dan warna
	const options = [
		{
			value: 'Selamat datang',
			label: 'Pembuka',
			icon: 'hugeicons:start-up-02',
			color: '#24B1DB',
		},
		{
			value: 'Teks Pendek',
			label: 'Teks Pendek',
			icon: 'majesticons:text-line',
			color: '#7F1FDB',
		},
		{
			value: 'Teks Panjang',
			label: 'Teks Panjang',
			icon: 'tabler:text-plus',
			color: '#7F1FDB',
		},
		{
			value: 'Pilihan Ganda',
			label: 'Pilihan Ganda',
			icon: 'carbon:circle-filled',
			color: '#7F1FDB',
		},
		{
			value: 'Waktu',
			label: 'Waktu',
			icon: 'mdi-light:calendar',
			color: '#7F1FDB',
		},
		{
			value: 'Dropdown',
			label: 'Dropdown',
			icon: 'icon-park-solid:down-one',
			color: '#7F1FDB',
		},
		{
			value: 'Quote',
			label: 'Quote',
			icon: 'proicons:quote',
			color: '#7F1FDB',
		},
		{
			value: 'Likert',
			label: 'Likert',
			icon: 'hugeicons:star',
			color: '#7F1FDB',
		},
		{
			value: 'Closing',
			label: 'Penutup',
			icon: 'icon-park-outline:bye',
			color: '#24B1DB',
		},
	]

	// Custom option component with icon and color for react-select
	const customOption = (props) => {
		const { data, innerRef, innerProps } = props
		return (
			<div
				ref={innerRef}
				{...innerProps}
				className="flex items-center p-2 space-x-2 hover:bg-gray-200"
			>
				<Icon
					icon={data.icon}
					className="text-lg"
					style={{ color: data.color }}
				/>
				<span>{data.label}</span>
			</div>
		)
	}

	const handleContentChange = (selectedOption) => {
		// Pass both value and icon to the parent component
		setContentText(selectedOption.value)
		setSelectedIcon(selectedOption.icon) // Set the icon in the parent component
	}

	return (
		<aside className="w-1/5 bg-neutral-100 p-4">
			<div className="space-y-6 font-inter text-sm text-gray-700">
				{/* Section Konten dengan Divider */}
				<div className="flex items-center space-x-2">
					<p className="font-bold">Konten</p>
					<div className="flex-grow border-t border-gray-400" />
				</div>

				{/* Dropdown Select for Content */}
				<div className="space-y-4">
					<div className="flex items-center">
						<label className="w-28 text-gray-800">Isi</label>
						<div className="flex-grow">
							<Select
								value={options.find((option) => option.value === contentText)}
								onChange={handleContentChange}
								options={options}
								getOptionLabel={(e) => (
									<div className="flex items-center space-x-2">
										<Icon
											icon={e.icon}
											className="text-lg"
											style={{ color: e.color }}
										/>
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

					{contentText === 'Closing' && (
						<>
							<div className="flex items-center">
								<label className="w-28 text-gray-800">Judul</label>
								<input
									type="text"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="flex-grow p-2 rounded border border-gray-300 bg-gray-100"
									placeholder="Isi Judul di sini"
								/>
							</div>

							<div className="flex items-center">
								<label className="w-28 text-gray-800">Deskripsi</label>
								<textarea
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="flex-grow p-2 rounded border border-gray-300 bg-gray-100"
									placeholder="Isi deskripsi di sini"
								/>
							</div>
						</>
					)}

					{/* Tambahkan bagian conditional lain sesuai kebutuhan, seperti Teks Pendek, Waktu, Dropdown, dll. */}
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
							<input
								type="file"
								accept="image/*"
								onChange={handleBackgroundChange}
								className="hidden"
								id="background-upload"
							/>
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
