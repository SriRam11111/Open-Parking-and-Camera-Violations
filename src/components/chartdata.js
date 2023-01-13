import React, { useEffect, useState } from 'react'

function Chartdata() {
    const [data,setData]=useState([])
    useEffect(()=>{
          fetch("https://data.cityofnewyork.us/resource/nc67-uf89.json")
          .then(response=> response.json())
          .then(result=>setData(result))
          .catch(error=>console.log(error));
      },[])
    //   console.log("data for chart",data)
  return (
    <div>
      
    </div>
  )
}

export default Chartdata
