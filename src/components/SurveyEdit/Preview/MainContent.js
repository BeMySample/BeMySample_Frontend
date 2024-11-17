import React from 'react'
import Welcome from '../Templates/Welcome'
import ShortText from '../Templates/ShortText'
import Time from '../Templates/Time'
import Dropdown from '../Templates/Dropdown'
import MultipleChoice from '../Templates/MultipleChoice'
import Quote from '../Templates/Quote'
import LongText from '../Templates/LongText'
import LikertScale from '../Templates/LikertScale'
import Closing from '../Templates/Closing'

const MainContent = ({
	contentText,
	textColor,
	buttonColor,
	buttonText,
	buttonTextColor,
	bgColor,
	backgroundImage,
	title,
	description,
	viewMode,
}) => {
	const renderSectionContent = () => {
		switch (contentText) {
			case 'Selamat datang':
				return (
					<Welcome
						textColor={textColor}
						buttonColor={buttonColor}
						buttonText={buttonText}
						buttonTextColor={buttonTextColor}
						viewMode={viewMode}
					/>
				)
			case 'Teks Pendek':
				return <ShortText viewMode={viewMode} />
			case 'Waktu':
				return <Time viewMode={viewMode} />
			case 'Dropdown':
				return <Dropdown viewMode={viewMode} />
			case 'Pilihan Ganda':
				return <MultipleChoice viewMode={viewMode} />
			case 'Quote':
				return <Quote viewMode={viewMode} />
			case 'Teks Panjang':
				return <LongText viewMode={viewMode} />
			case 'Likert':
				return <LikertScale viewMode={viewMode} />
			case 'Closing':
				return (
					<Closing
						title={title}
						description={description}
						textColor={textColor}
						buttonColor={buttonColor}
						viewMode={viewMode}
					/>
				)
			default:
				return <p>Konten Default</p>
		}
	}

	return (
		<div className="flex-grow flex justify-center items-center bg-[#f5f5f5] m-4 rounded-2xl">
			<div
				className="p-8 rounded-2xl flex justify-center items-center"
				style={{
					width: viewMode === 'mobile' ? '375px' : '100%',
					maxWidth: '1440px',
					height: '720px',
					backgroundColor: bgColor,
					backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					transition: 'width 0.5s ease-in-out, height 0.5s ease-in-out',
				}}
			>
				{renderSectionContent()}
			</div>
		</div>
	)
}

export default MainContent
