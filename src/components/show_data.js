import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable, { Selector } from 'react-data-table-component';
function Show_Data() {
  const[Data,SetData]=useState([])
  const getData = async () =>{
    try{
      const response =await axios.get("https://data.cityofnewyork.us/resource/nc67-uf89.json");
      SetData(response.data);
    }catch(error){
      console.log(error);
    } 
  };
  const columns=[
    {
      name:"plate number",
      selector:(row)=>row.plate,
    },
    {
      name:"state",
      selector:(row)=>row.state,
    },
    {
      name:"summons number",
      selector:(row)=>row.summons_number,
    },
    {
      name:"fine_amount",
      selector:(row)=>row.fine_amount,
    },
    {
      name:"violatiiiion",
      selector:(row)=>row.violation,
    }
  ]

  useEffect(()=>{
    getData();
  },[])
  return(
    <>
    {/* {console.log(props.data)} */}
    <DataTable title="Open Parking and Camera Violations" columns={columns} data={Data} pagination/>
    </>

  )
}

export default Show_Data
