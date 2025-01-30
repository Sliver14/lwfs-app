import React, { useEffect, useState, useRef } from 'react'
import videojs from "video.js";
import Modal from "../component/Modal";
import axios from 'axios';
import Hls from "hls.js";
import HlsPlayer from "../component/HlsPlayer"
// import io from 'socket.io-client';


function LiveTv() {
  
  const [content, setContent] = useState('');
  const [onCommentPosted, setOnCommentPosted] = useState("");
  // const apiUrl = 'http://localhost:3001';
  const apiUrl = "https://lwfs-app-server-production.up.railway.app";
  const [comments, setComments] = useState([]);
  const scrollRef = useRef(null);
  const videoRef = useRef(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

//Hls component
  // useEffect(() => {
  //   if (Hls.isSupported()) {
  //     const hls = new Hls();
  //     hls.loadSource("https://res.cloudinary.com/dfi8bpolg/video/upload/v1737680677/evtznnwqnmgyshvhzidd.mp4");
  //     hls.attachMedia(videoRef.current);

  //     hls.on(Hls.Events.MANIFEST_PARSED, () => {
  //       videoRef.current.play();
  //     });

  //     return () => {
  //       hls.destroy();
  //     };
  //   }
  // }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  // Live-tv Attendance
  useEffect(() => {
    if (!hasSubmitted) {
    const recordAttendance = async () => {
      try {
        await axios.post(
          `${apiUrl}/comment/attendance`,
          { page: "live_tv" },
          {
            // headers: {
            //   Authorization: `Bearer ${localStorage.getItem("token")}`,
            // },
            withCredentials: true,
          }
        );

      } catch (error) {
        console.error("Error recording attendance:", error);
      }
    };
  
    recordAttendance();
  }
  }, [hasSubmitted]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('Comment cannot be empty');
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/comment`, { content }, {
        withCredentials: true, // Include user token from cookies
      });

      setOnCommentPosted(response.data); // Update the comment list

      const handleNewComment = (newComment) => {
        setComments((onCommentPosted) => [newComment, ...onCommentPosted]); // Add the new comment to the list
      };

      setContent(''); // Clear the input
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };
 
  // Fetch Comment
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/comment`, {
          withCredentials: true, // Ensure cookies are sent
        });
        setComments(response.data);
        console.log(comments.content)
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);


  return (
    
    <div className='flex flex-col pt-16 text-sm w-screen md:flex-row'>
  
      <div className='flex flex-col md:flex-1'>
        <div className='w-screen h-64 md:w-1/2 md:h-[650px]'>
        {/* <video 
          src="https://stream.mux.com/test_video.m3u8" type="application/x-mpegURL"
          className="w-full h-full object-contain" 
          controls
          muted={false}
          controlsList="nodownload"
        >
        </video> */}
        {/* <video ref={videoRef} controls width="100%" /> */}
        <HlsPlayer className="w-full h-full object-contain" src="" />
        </div>
        <div className='flex font-medium justify-center items-center space-x-5 my-2'>
          <button className='px-5 py-2 text-black bg-lw_yellow rounded-lg'>Share Testimony</button>
          <button className='px-5 py-2 text-white bg-lw_green rounded-lg'>Receive Salvation</button>
        </div>
      </div>
      

      <div className='flex flex-col mt-5 pb-5 md:flex-1'>
        <div className='w-screen h-32 md:w-1/2 md:h-[450px]'>
          <img className='w-full h-full object-contain' src="../images/year.jpeg" alt="" />
        </div>
        <div className='flex mt-2 w-screen md:w-1/2'>
          <button className='bg-lw_blue px-8 py-2 text-white'>Live Chat</button>
          <button className='bg-lw_yellow px-8 py-2'>Programme Line-UP</button>
        </div>
        
        <div ref={scrollRef} className='flex flex-col bg-white p-3 border-[1.5px] border-solid border-lw_gray w-screen overflow-y-auto h-[68vh]'>
          
        {comments.slice() // Create a copy to avoid mutating the original array
        .reverse().map((comment) => (
            <div key={comment.id} className='flex flex-col px-2 py-1 mb-5 border-2 border-solid border-gray-300 rounded-md'>
              <p className='text-indigo-500 '>{comment.content}</p>
              <p className='text-xs text-gray-500 italic'>{comment.user?.firstName}</p> 
              <p className='text-xs text-gray-500'>{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
        ))}
          
          <div className='flex flex-col gap-2'>
            <textarea value={content} onChange={(event)=>{setContent(event.target.value)}} className='p-2 grow rounded-md border-[1.5px] border-solid border-black min-h-20' type='text' placeholder='Type your comment here'/>
            <button onClick={handleSubmit} className='bg-lw_blue w-full text-lg text-white self-center  py-2 rounded-md cursor-pointer'>Submit</button>
          </div>
        </div>
        
      </div>
    </div>
    
  )
}

export default LiveTv
