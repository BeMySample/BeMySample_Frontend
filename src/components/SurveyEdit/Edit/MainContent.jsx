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
	viewMode,
	editMode,
	sections,
	activeSection,
	contentText,
	textColor,
	buttonColor,
	buttonText,
	buttonTextColor,
	bgColor,
	backgroundImage,
	bgOpacity,
	setTitle,
	setDescription,
	title,
	description,
	toggleResponseCopy,
	mustBeFilled,
	listChoices,
	setListChoices,
	handleAddOption,
	otherOption,
	minChoices,
	maxChoices,
	optionsCount,
	setOptionsCount,

	smallLabel,
	midLabel,
	largeLabel,
}) => {
	const renderSectionContent = () => {
		switch (contentText) {
			case 'Selamat Datang':
				return (
					<WelcomeContent
						viewMode={viewMode}
						editMode={editMode}
						title={title}
						setTitle={setTitle}
						description={description}
						setDescription={setDescription}
						textColor={textColor}
						buttonColor={buttonColor}
						buttonText={buttonText}
						buttonTextColor={buttonTextColor}
					/>
				)
			case 'Teks Pendek':
				return (
					<ShortText
						viewMode={viewMode}
						editMode={editMode}
						title={title}
						setTitle={setTitle}
						description={description}
						setDescription={setDescription}
						textColor={textColor}
						buttonColor={buttonColor}
						buttonText={buttonText}
						buttonTextColor={buttonTextColor}
						mustBeFilled={mustBeFilled}
					/>
				)
			case 'Waktu':
				return (
					<Time
						viewMode={viewMode}
						editMode={editMode}
						title={title}
						setTitle={setTitle}
						description={description}
						setDescription={setDescription}
						textColor={textColor}
						buttonColor={buttonColor}
						buttonText={buttonText}
						buttonTextColor={buttonTextColor}
						mustBeFilled={mustBeFilled}
					/>
				)
			case 'Dropdown':
				return (
					<Dropdown
						viewMode={viewMode}
						editMode={editMode}
						title={title}
						setTitle={setTitle}
						description={description}
						setDescription={setDescription}
						textColor={textColor}
						buttonColor={buttonColor}
						buttonText={buttonText}
						buttonTextColor={buttonTextColor}
						mustBeFilled={mustBeFilled}
						listChoices={listChoices}
						setListChoices={setListChoices}
					/>
				)
			case 'Pilihan Ganda':
				return (
					<MultipleChoice
						viewMode={viewMode}
						editMode={editMode}
						title={title}
						setTitle={setTitle}
						description={description}
						setDescription={setDescription}
						textColor={textColor}
						buttonColor={buttonColor}
						buttonText={buttonText}
						buttonTextColor={buttonTextColor}
						mustBeFilled={mustBeFilled}
						listChoices={listChoices}
						setListChoices={setListChoices}
						handleAddOption={handleAddOption}
						otherOption={otherOption}
						minChoices={minChoices}
						maxChoices={maxChoices}
						optionsCount={optionsCount}
						setOptionsCount={setOptionsCount}
					/>
				)
			case 'Quote':
				return (
					<Quote
						viewMode={viewMode}
						editMode={editMode}
						title={title}
						setTitle={setTitle}
						textColor={textColor}
						buttonColor={buttonColor}
						buttonText={buttonText}
						buttonTextColor={buttonTextColor}
					/>
				)
			case 'Teks Panjang':
				return (
					<LongText
						viewMode={viewMode}
						editMode={editMode}
						title={title}
						setTitle={setTitle}
						description={description}
						setDescription={setDescription}
						textColor={textColor}
						buttonColor={buttonColor}
						buttonText={buttonText}
						buttonTextColor={buttonTextColor}
						mustBeFilled={mustBeFilled}
					/>
				)
			case 'Likert':
				return (
					<LikertScale
						viewMode={viewMode}
						editMode={editMode}
						title={title}
						setTitle={setTitle}
						description={description}
						setDescription={setDescription}
						textColor={textColor}
						buttonColor={buttonColor}
						buttonText={buttonText}
						buttonTextColor={buttonTextColor}
						mustBeFilled={mustBeFilled}
						smallLabel={smallLabel}
						midLabel={midLabel}
						largeLabel={largeLabel}
					/>
				)
			case 'Closing':
				return (
					<Closing
						viewMode={viewMode}
						editMode={editMode}
						setTitle={setTitle}
						setDescription={setDescription}
						title={title}
						description={description}
						textColor={textColor}
						buttonColor={buttonColor}
						toggleResponseCopy={toggleResponseCopy}
					/>
				)
			default:
				return <p>Silahkan pilih template yang ingin digunakan</p>
		}
	}

	// Menghitung halaman saat ini berdasarkan index aktif
	const currentPage =
		sections.findIndex((section) => section.id === activeSection) + 1
	const totalPages = sections.length

	return (
		<>
			{editMode ? (
				<main
					className={`relative flex-grow p-8 flex flex-col justify-center items-center m-4 rounded-2xl`}
					style={{
						backgroundColor: bgColor,
						backgroundImage: backgroundImage
							? `linear-gradient(rgba(255, 255, 255, ${
									1 - bgOpacity
							  }), rgba(255, 255, 255, ${
									1 - bgOpacity
							  })), url(${backgroundImage})`
							: 'none',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
					}}
				>
					{renderSectionContent()}

					<div className="absolute bottom-3 left-3 bg-zinc-800 text-white px-3 py-2 rounded-xl text-sm">
						{currentPage}/{totalPages}
					</div>
				</main>
			) : (
				<div className="flex-grow flex justify-center items-center bg-[#f5f5f5] m-4 rounded-2xl">
					<div
						className="p-8 rounded-3xl flex justify-center items-center border-4 border-zinc-300"
						style={{
							width: viewMode === 'mobile' ? '375px' : '100%',
							maxWidth: '1440px',
							height: '720px',
							backgroundColor: bgColor,
							backgroundImage: backgroundImage
								? `url(${backgroundImage})`
								: 'none',
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
							transition: 'width 0.5s ease-in-out, height 0.5s ease-in-out',
							// WebkitBoxShadow: '7px 11px 15px -4px rgba(138,138,138,1)',
							// MozBoxShadow: '7px 11px 15px -4px rgba(138,138,138,1)',
							// boxShadow: '7px 11px 15px -4px rgba(138,138,138,1)',
						}}
					>
						{renderSectionContent()}
					</div>
				</div>
			)}
		</>
	)
}

export default MainContent
