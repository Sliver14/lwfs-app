import React from 'react'
import ReactPlayer from 'react-player';

function LiveTv() {
  return (
    <div className='flex flex-col pt-16'>
      <div>
        <ReactPlayer 
          url="https://www.youtube.com/live/ZADm4ss9f04?si=I8GjZHYfWHbwm3ri"
          controls
          width="100%"
          height="400px"
        />
      </div>

      <div className='flex flex-col mt-5 bg-gray-400 pb-5 px-5'>
        <div className='flex gap-5 py-2 px-4'>
          <button>Live Chat</button>
          <button>Give Online</button>
        </div>
        <div className='bg-white p-10 border-[1.5px] border-solid border-lwfs2'>
          <div className='flex flex-col px-2 py-1 mb-5 border-2 border-solid border-gray-300  rounded-md'>
            <p className='text-indigo-500 '>Comment</p>
            <p className='text-xs text-gray-500'>Username</p>
          </div>

          <div className='flex flex-col px-2 py-1 mb-5 border-2 border-solid border-gray-300 rounded-md'>
            <p className='text-indigo-500 '>Comment</p>
            <p className='text-xs text-gray-500'>Username</p>
          </div>

          <div className='flex gap-3'>
            <textarea className='px-2 grow rounded-md border-2 border-solid border-gray-300' type='text' placeholder='type a Comment'/>
            <button className='w-[150px] bg-lwfs4 text-lwfs3 py-2 px-5 rounded-md cursor-pointer'>Submit</button>
          </div>
        </div>
       

        
        
      </div>
    </div>
    
  )
}

export default LiveTv
