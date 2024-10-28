import { Icon } from '@iconify/react'
import React from 'react'
import C1 from '../../assets/images/SurveyCover.png'
import Cover1Contribution from '../../assets/images/Cover1Contribution.png'
import Cover2Contribution from '../../assets/images/Cover2Contribution.png'
import TemplateContribution from '../../assets/images/TemplateContribution.png'
import { Helmet } from 'react-helmet'

const SurveyCard = ({
	title,
	respondents,
	updated,
	used,
	max,
	image,
	status,
}) => {
	return (
		<div className="flex flex-row items-center justify-between bg-[#F5F5F5] rounded-r-[16px] pr-[16px]">
			<div className="flex flex-row items-center">
				<div className="relative">
					<img
						src={image}
						alt=""
						className="h-[94px] w-[244px] object-cover rounded-l-[16px]"
					/>
					<p
						className={`absolute bottom-0 right-0 w-[116px] h-[35px] text-center flex items-center justify-center gap-2 font-inter z-10 text-white text-xs rounded-tl-lg ${
							status === 'open'
								? 'bg-[#1F38DB]'
								: status === 'closed'
								? 'bg-[#EB221E]'
								: 'bg-[#5A5A5A]'
						}`}
					>
						{status === 'open' && 'Dibuka'}
						{status === 'closed' && 'Terhenti'}
						{status === 'draft' && 'Draft'}
					</p>
				</div>
				<div className="px-8">
					<p className="font-bold font-inter text-[16px]">{title}</p>
					<div className="flex flex-row gap-[16px]">
						<div className="flex flex-row items-center gap-2 font-inter">
							<Icon
								icon="material-symbols:person"
								className="size-[13.33px] text-[#595959]"
							/>
							<p className="text-[12px]">{respondents} responden</p>
						</div>
						<div className="flex flex-row items-center gap-2 font-inter">
							<Icon
								icon="mdi:clock"
								className="size-[13.33px] text-[#595959]"
							/>
							<p className="text-[12px]">{updated}</p>
						</div>
						{used === 0 && max === 0 ? (
							<div
								className={`flex flex-row items-center gap-2 font-inter text-[#595959]`}
							>
								<Icon icon="akar-icons:coin" className={`size-[13.33px]`} />
								<p className="text-[12px]">Belum dialokasikan</p>
							</div>
						) : (
							<div
								className={`flex flex-row items-center gap-2 font-inter ${
									used === max && 'text-red-500'
								}`}
							>
								<Icon icon="akar-icons:coin" className={`size-[13.33px]`} />
								<p className="text-[12px]">
									Terpakai {used} dari {max}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<Icon
				icon="bi:three-dots-vertical"
				className="text-[#595959] size-[36px] cursor-pointer hover:bg-zinc-200 rounded-full p-2"
			/>
		</div>
	)
}

const ContributionCard = ({ title, updated, coins, image }) => {
	return (
		<div className="flex flex-col items-center justify-between bg-[#F5F5F5] rounded-2xl w-full">
			{/* <div className="flex flex-col items-center w-full"> */}
			<img src={image} alt="" className="h-[98px] w-full object-cover rounded-t-2xl" />
			<div className="px-6 py-4">
				<p className="font-bold font-inter text-[16px]">{title}</p>
				<div className="flex flex-row gap-[16px]">
					<div className="flex flex-row items-center gap-2 font-inter">
						<Icon
							icon="akar-icons:coin"
							className="size-[13.33px] text-[#595959]"
						/>
						<p className="text-[12px]">Dapatkan {coins}</p>
					</div>
				</div>
			</div>
			{/* </div> */}
		</div>
	)
}

const Dashboard = () => {
	return (
		<div className="w-full bg-white pt-[120px] flex flex-col items-center px-14">
			<div className="flex flex-row items-center justify-center w-full gap-[16px]">
				<button className="flex flex-col items-center w-64 py-[24px] px-[56px] text-[#2073DB] border-4 border-[#2073DB] hover:bg-[#2073DB] hover:border-[#2073DB] hover:text-white rounded-[16px]">
					<Icon icon="ic:outline-plus" className="size-[66px]" />
					<p className="font-inter text-[18px]">Buat Sendiri</p>
				</button>
				<button className="flex flex-col items-center w-64 py-[24px] px-[56px] text-white border-4 border-[#2073DB] bg-[#2073DB] hover:bg-[#235ea5] hover:border-[#235ea5] rounded-[16px]">
					<Icon icon="mingcute:ai-fill" className="size-[66px]" />
					<p className="font-inter text-[18px]">Buat dengan AI</p>
				</button>
			</div>

			<div className="flex flex-row gap-[14px] items-start justify-start w-full">
				<div className="w-full py-10 flex flex-col items-start gap-4">
					<div className='w-full'>
						<p className="text-[18px] font-inter">Survei Saya</p>
						<p className="text-[12px] text-[##757575] font-inter">
							Lihat data respons atau sunting survei yang sudah Anda buat
						</p>
					</div>
					<div className="flex flex-col gap-[16px]">
						<SurveyCard
							title="Survei Kepuasan Pelanggan"
							respondents={190}
							updated="10 Oktober 2024"
							used={38000}
							max={190000}
							image={C1}
							status={'open'}
						/>
						<SurveyCard
							title="Lorem Ipsum"
							respondents={1}
							updated="10 Oktober 2024"
							used={200}
							max={200}
							image={C1}
							status={'closed'}
						/>
						<SurveyCard
							title="Lorem Ipsum"
							respondents={190}
							updated="10 Oktober 2024"
							used={0}
							max={0}
							image={C1}
							status={'draft'}
						/>
					</div>
				</div>

				<div className="w-full py-10 flex flex-col items-start gap-4">
					<div className="flex flex-row items-center justify-between w-full">
						<div>
							<p className="text-[18px] font-inter">Berkontribusi</p>
							<p className="text-[12px] text-[##757575] font-inter">
								Isi survei yang tersedia dan dapatkan MyPoin
							</p>
						</div>
						<button className="bg-[#1F38DB] text-white p-3 rounded-lg flex flex-row gap-2 items-center">
							<p className="leading-3 text-xs">Eksplor</p>
							<Icon icon="bi:arrow-right-circle-fill" className="size-[16px]" />
						</button>
					</div>
					<div className="grid grid-cols-3 gap-[16px]">
						<ContributionCard
							title="Kamu Tim Android atau iPhone?"
							updated="10 Oktober 2024"
							coins={200}
							image={Cover1Contribution}
						/>
						<ContributionCard
							title="Gimana Kebiasaanmu di Perkuliahan?"
							updated="10 Oktober 2024"
							coins={200}
							image={Cover2Contribution}
						/>
						<ContributionCard
							title="Lorem ipsum dolor sit amet consectur"
							updated="10 Oktober 2024"
							coins={200}
							image={TemplateContribution}
						/>
					</div>
				</div>
			</div>

			<Helmet>
				<title>Dashboard - BeMySample</title>
			</Helmet>
		</div>
	)
}

export default Dashboard
