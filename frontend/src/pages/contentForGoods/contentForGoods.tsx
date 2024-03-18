import React from 'react'

export default function contentForGoods() {
  return (
    <div className='h-full border border-[#F5F1E8] rounded-[16px]'>
        <div className='flex items-center p-[10px]'>
      <img src="images/stats-card-3.svg" className="w-[20px] h-[20px] mr-[10px]" />
      <div className="creator-dashboard__item-block-key shrink-mobile head-text text-black font-[700] text-[16px] uppercase">Content for good</div>
      </div>
      <div className='flex justify-center items-center h-[calc(100%-50px)]'>
        <h1 className='head-text text-black font-[700] text-[26px]'>Coming soon</h1>
      </div>
    </div>
  )
}
