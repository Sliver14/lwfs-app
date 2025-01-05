import React from 'react'
import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();
  return (
      <div className='flex flex-col bg-lwfs1 text-lwfs3 w-screen pt-20'>
        {/* Footer */}

        {/* About Us */}
        <div className='flex flex-col ml-5 w-[95%] gap-3 text-gray-300 text-xs' >
          <img className='w-56 h-auto ml-5' src='/images/LWFS-LOGO-3.png' alt='images'/>
          <h1 className='text-md' >Loveworld Foundation School is a compulsory part of our Church Ministry, with clearly defined Aims and Objectives as summarized below.</h1>
          <p>1. To preserve every eligible first timer or new convert in your Church, and successfully transit a soul saved into a soul won.</p>
          <p>2. To introduce the new converts and new members in your Church to the Foundational Doctrines of our Christianity and the Principles and Structures of our Ministry</p>
          <p> 3. To help them understand our Vision and Mission, and see their definite role in them.</p>
          <p> 4. To introduce them to the discipline and rigor of consistent learning, self-study, carrying out Christian exercises and producing results.</p>
          <p> 5. To introduce them to fellowship with fellow Christians and the Holy Spirit.</p>
          <p> 6. To set them on an irreversible path of continuous growth and service in the Local Assembly and beyond.</p>
          <p> 7. To fulfill the first requirement for eligibility and consideration for higher responsibilities in Ministry</p>
        
        </div>

        {/* Contact Us */}
        <div className='flex flex-col ml-5 pt-10 gap-2 text-sm text-gray-300' >
          <h1 className='text-xl font-bold text-lwfs3' >Contact Us </h1>
          <div className='pb-3'>PO Box Aseese, Lagos Ibadan Express.</div>
          <div className='flex gap-5'>
            <p>Email Us :</p>
            <a className='hover:text-red-600 ' href='mailto:info@lwfoundationschool.com'>info@lwfoundationschool.com</a>
          </div>

          <div className='flex gap-5'>
            <p>Call Us : </p>
            <a className='hover:text-red-600 ' href='tel:+2348035024986'>+234 80 3502 4986</a>
          </div>

          <div className='flex gap-5'>
            <p>Kingschat :</p>
            <a className='hover:text-red-600 ' href='https://kingschat.online/user/lwfsch' target="_blank">@lwfsch</a>
          </div>
         
        </div>

        {/* Platforms */}
        <div className='flex flex-col ml-5 pt-10 gap-2 text-sm text-gray-300'>
          <h1 className='text-xl font-bold text-lwfs3'>Platforms</h1>
          <p className='hover:text-red-600  cursor-pointer' >Online Class</p>
          <p className='hover:text-red-600  cursor-pointer'>Resource Center</p>
          <p className='hover:text-red-600  cursor-pointer'>LWFS Store</p>
          <p className='hover:text-red-600 cursor-pointer'>Testimony Bank</p>
          <p className='hover:text-red-600  cursor-pointer' onClick={()=>{navigate("/live-tv")}}>Live TV</p>
        </div>

        {/* Copy Rights */}
        <div className='bg-lwfs4 mt-10 py-10'>
        <div className='flex flex-col ml-5 gap-5 text-sm text-gray-300'>
          <div className='flex'>
            <p>Copyright &copy; 2025 <span className='text-red-600 cursor-pointer' onClick={()=>{navigate("/privacy")}}>Loveworld Foundation School</span>. All Rights Reserveed.</p>
          </div>
          
          <div className='flex gap-5'>
            <p className='hover:text-red-600  cursor-pointer' onClick={()=>{navigate("/privacy")}}>Privacy Policy</p>
            <p className='hover:text-red-600  cursor-pointer'>Contact Us</p>
            <p className='hover:text-red-600  cursor-pointer'>Blog</p>
          </div>
          
        </div>
        </div>
        
      </div>
  )
}

export default Footer
