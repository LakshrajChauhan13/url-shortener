import React from 'react'

const CrossIcon = () => {
  return (
    <div className='bg-neutral-100 rounded-full flex justify-center items-center size-5.5 backdrop-blur-[2px] '>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    </div>
  )
}

export default CrossIcon
