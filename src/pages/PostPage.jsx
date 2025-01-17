import React, { useState } from 'react'
import axios from "axios";

function PostPage() {

    const handlePost = async() => {
        const [postPhoto, setPostPhoto] = useState("");
        const [postTitle, setPostTitle] = useState("");
        const [postBody, setPostBody] = useState("");

        try{
            const response = await axios.post("/posts", {postPhoto, postTitle, postBody});
        } catch (error){

        }
    }
  return (
    <div className='flex flex-col mt-28'>
      <div className='flex flex-col justify-center items-center'>
        <input type='file' placeholder='Blog Photo'/>
        <input type='text' placeholder='Title'/>
        <input type='text' placeholder='Body'/>
        <button onClick={handlePost}>Post</button>
      </div>
    </div>
  )
}

export default PostPage
