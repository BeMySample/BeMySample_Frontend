import React from 'react'
import { Icon } from '@iconify/react'

const WhyBeMySample = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-10 gap-6 px-6">
			<p className='text-[45px] text-center'>Kenapa BeMySample?</p>
			
      <div className='flex flex-row items-center justify-between gap-[29px] text-white'>
        <div className='flex flex-col justify-center items-center gap-4 bg-[#8BD5E8] rounded-[16px] p-6'>
          <Icon icon='material-symbols:handshake' className='size-[143px]' />

          <div className='flex flex-col items-center justify-center'>
            <p className='text-[32px] font-bold font-inter'>Sistem Kontributif</p>
            <p className='text-[16px] font-inter'>Saling bantu dan dapatkan MyPoin untuk membuat survei sendiri</p>
          </div>
        </div>

        <div className='flex flex-col justify-center items-center gap-4 bg-[#6AA9F0] rounded-[16px] p-6'>
          <Icon icon='mingcute:ai-fill' className='size-[143px]' />

          <div className='flex flex-col items-center justify-center'>
            <p className='text-[32px] font-bold font-inter'>Integrasi AI</p>
            <p className='text-[16px] font-inter'>Buat survei lebih cepat dengan AI dan personalisasikan sesuai kebutuhan</p>
          </div>
        </div>

        <div className='flex flex-col justify-center items-center gap-4 bg-[#D2C6F1] rounded-[16px] p-6'>
          <Icon icon='akar-icons:statistic-up' className='size-[143px]' />

          <div className='flex flex-col items-center justify-center'>
            <p className='text-[32px] font-bold font-inter'>Analisis Lengkap</p>
            <p className='text-[16px] font-inter'>Dashboard yang kaya informasi untuk memudahkan riset Anda</p>
          </div>
        </div>
      </div>
		</div>
  )
}

export default WhyBeMySample