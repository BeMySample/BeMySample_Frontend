import React from 'react'
import WelcomeContent from '../Templates/Welcome'
import ShortText from '../Templates/ShortText'
import Time from '../Templates/Time'
import Dropdown from '../Templates/Dropdown'
import MultipleChoice from '../Templates/MultipleChoice'
import Quote from '../Templates/Quote'
import LongText from '../Templates/LongText'
import LikertScale from '../Templates/LikertScale'
import Closing from '../Templates/Closing'

const MainContent = ({
	sections,
	activeSection,
	contentText,
	textColor,
	buttonColor,
	buttonText,
	bgColor,
	backgroundImage,
	title,
	description,
}) => {
	const renderSectionContent = () => {
		switch (contentText) {
			case 'Selamat datang':
				return (
					<WelcomeContent
						textColor={textColor}
						buttonColor={buttonColor}
						buttonText={buttonText}
					/>
				)
			case 'Teks Pendek':
				return <ShortText />
			case 'Waktu':
				return <Time />
			case 'Dropdown':
				return <Dropdown />
			case 'Pilihan Ganda':
				return <MultipleChoice />
			case 'Quote':
				return <Quote />
			case 'Teks Panjang':
				return <LongText />
			case 'Likert':
				return <LikertScale />
			case 'Closing':
				return (
					<Closing
						title={title}
						description={description}
						textColor={textColor}
						buttonColor={buttonColor}
					/>
				)
			default:
				return <p>Konten Default</p>
		}
	}

	// Menghitung halaman saat ini berdasarkan index aktif
	const currentPage =
		sections.findIndex((section) => section.id === activeSection) + 1
	const totalPages = sections.length

	return (
		<main
			className="relative flex-grow p-8 flex flex-col justify-center items-center m-4 rounded-2xl"
			style={{
				backgroundColor: bgColor,
				backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			{renderSectionContent()}

			{/* Tampilan progress Page x/y */}
			<div className="absolute bottom-3 left-3 bg-zinc-800 text-white px-3 py-2 rounded-xl text-sm">
				{currentPage}/{totalPages}
			</div>
		</main>
	)
}

export default MainContent
