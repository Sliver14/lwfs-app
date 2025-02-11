import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [adminReport, setAdminReport ] = useState([]);
    const [zonalReport, setZonalReport ] = useState([]);    
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const dashboardStats = async () => {
            try{
            const response = await axios.get(`${apiUrl}/live-tv/dashboardStats`)
            setAdminReport(response.data)
            console.log(response.data)
            }catch(error){
                console.log()
            }
        }
        dashboardStats();
    },[])

    useEffect(() => {
      const zonalsReport = async () => {
        try {
          const reponse = await axios.get(`${apiUrl}/live-tv/zonesParticipation`);
          setZonalReport(reponse.data);
          console.log(reponse.data);
        } catch(error){
          console.log(error, "")
        }
      }
      zonalsReport();
    },[])

  return (
    <div className='flex flex-col mt-24'>
        <h1>Admin Dashboard</h1>
      <h1>Individual Participation: {adminReport.individualParticipation}</h1>
      <h1>Group Participation: {adminReport.groupParticipation}</h1>
      <h1>Number of Centers: {adminReport.numberOfCenters}</h1>
      <h1>Number of Countries : {adminReport.numberOfCountries} </h1>
      <h1>Zonal Attendance</h1>

      {zonalReport.map((report, index)=>(
        < div key={index}>
          <h1> {report.zone}</h1>
          <h1>Individual Participation: {report.individualParticipation}</h1>
          <h1>Group Participation: {report.groupParticipation}</h1>
        </div>
        
      ))}
      
    </div>
  )
}

export default AdminDashboard
