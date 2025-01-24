import React from 'react'
import ReactPlayer from 'react-player';

function LiveTv() {
  return (
    <div className='flex flex-col pt-16 text-sm'>
      <div className='w-screen h-72 '>
      <video 
        src="https://res.cloudinary.com/dfi8bpolg/video/upload/v1737680677/evtznnwqnmgyshvhzidd.mp4"
        className="w-full h-full object-contain" 
        controls
        muted={false}
        controlsList="nodownload"
      ></video>
      </div>
      <div className='flex font-medium justify-center items-center space-x-5 p-5'>
        <button className='px-5 py-2 text-black bg-lw_yellow rounded-lg'>Share Testimony</button>
        <button className='px-5 py-2 text-white bg-lw_green rounded-lg'>Receive Salvation</button>
      </div>

      <div className='flex flex-col mt-5 pb-5'>
        <div className='w-screen h-32'>
          <img className='w-full h-full object-contain' src="../images/year.jpeg" alt="" />
        </div>
        <div className='flex mt-2 w-screen'>
          <button className='bg-lw_blue px-8 py-2 text-white'>Live Chat</button>
          <button className='bg-lw_yellow px-8 py-2'>Programme Line-UP</button>
        </div>

        <div className='flex flex-col bg-white p-3 border-[1.5px] border-solid border-lw_gray w-screen'>
          <div className='flex flex-col px-2 py-1 mb-5 border-2 border-solid border-gray-300 rounded-md'>
            <p className='text-indigo-500 '>Comment</p>
            <p className='text-xs text-gray-500 italic'>Username</p>
          </div>

          <div className='flex flex-col px-2 py-1 mb-5 border-2 border-solid border-gray-300 rounded-md'>
            <p className='text-indigo-500 '>i was so blessed by todays ministration</p>
            <p className='text-xs text-gray-500 italic'>Username</p>
          </div>

          <div className='flex flex-col gap-2'>
            <textarea className='p-2 grow rounded-md border-[1.5px] border-solid border-black min-h-20' type='text' placeholder='Type your comment here'/>
            <button className='bg-lw_blue w-full text-lg text-white self-center  py-2 rounded-md cursor-pointer'>Submit</button>
          </div>
        </div>
       

        
        
      </div>
    </div>
    
  )
}

export default LiveTv
