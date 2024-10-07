import React from 'react'
import IllustrationBeMySample from '../../assets/images/welcomeIllustrationBeMySample.gif'

const Hero = () => {
	return (
		<div className="flex flex-col items-center justify-center w-full bg-[#F5F5F5]">
			<p className='text-[45px] font-bold text-center'>Jangkau lebih jauh <br /> untuk data yang lebih utuh</p>
			<button className='px-4 py-2 rounded-[8px] text-[18px] font-bold bg-[#1F38DB] text-white mt-2'>Buat Survei</button>

      <img className='mt-10 w-[771px] rounded-xl' src={IllustrationBeMySample} alt="welcome-illustration-bemysample" />
		</div>
	)
}

export default Hero
