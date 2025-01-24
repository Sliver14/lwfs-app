import React, { useEffect, useState } from 'react'
import { IoTimeOutline } from "react-icons/io5";
import { GrView } from "react-icons/gr";
import { IoChevronForwardOutline } from "react-icons/io5";
import axios from "axios";

function Posts() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const PORT = "https://lwfs-app-server-production.up.railway.app";
  // const PORT = "http://localhost:3001";

  useEffect(() => {
    
    const fetchData = async () => {
      try{
        const response = await axios.get(`${PORT}/posts/postpage`);
        //  setListOfPosts(response.data);
        setListOfPosts(response.data);
      } catch(error){
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='mt-28'>
      {/* LWFS News (blog) e.g graduation highlights */}
      <div className='flex flex-col w-screen items-center justify-center'>
      <div className='flex flex-col w-[98%] shadow-lg' >
        <h1 className='font-bold text-xl ml-10 my-2'>Recent Posts</h1>

        
          {listOfPosts.map((post) => ( 
          <>
          <div key={post.id} className='flex flex-col pl-3 m-1 border-2 rounded-md border-gray-100  hover:border-[0.8px] hover:border-lwfs2 hover:rounded-lg'>
            <div className='flex flex-col h-auto w-[98%] mt-3' >
            <img className='flex h-full w-full rounded-lg ' src={post.postPhoto}  alt=''/>
          </div>
          <div className='flex gap-5 my-3'>
            <button className='bg-red-600 text-white text-sm px-2 py-[3px] rounded-sm'>Blog</button>
            <h1 className='flex items-center gap-1'><IoTimeOutline />{post.createdAt}</h1>
            <h1 className='flex items-center gap-1'><GrView /> 293</h1>
          </div>

          <div className='flex flex-col  '>
            <h1 className='font-bold text-base'>{post.postTitle}</h1>
            <p className='text-sm text-gray-700 w-[98%]'>{post.postBody}</p>
          </div>
          <button className='flex items-center w-40 gap-1 border-2 border-slate-200 text-lwfs4 px-5 py-2 my-2 hover:font-bold hover:shadow-sm hover:bg-lwfs2 hover:text-lwfs3 hover:border-0 hover:shadow-black rounded-md'>Read More <IoChevronForwardOutline className='text-xl'/></button>
          </div>
          </>
            
          ))}
          
        </div>  


      {/* </div> */}
      </div>
    </div>
  )
}

export default Posts
