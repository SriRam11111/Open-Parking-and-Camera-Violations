import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
function Range() {
  const [data,setData]=useState([])
  const [search,setSearch]=useState("")
  const [filterdata,setFilterdata]=useState([])
  const getData = async () =>{
    try{
      const response =await axios.get("https://data.cityofnewyork.us/resource/nc67-uf89.json");
      setData(response.data);
      setFilterdata(response.data)
    }catch(error){
      console.log(error);
    } 
  };
  const columns=[
    {
      name:"plate number",
      selector:(row)=>row.plate,
      sortable:true
    },
    {
      name:"state",
      selector:(row)=>row.state,
      sortable:true
    },
    {
      name:"summons number",
      selector:(row)=>row.summons_number,
      sortable:true
    },
    {
      name:"fine_amount",
      selector:(row)=>row.fine_amount,
    },
    {
      name:"violatiiiion",
      selector:(row)=>row.violation,
    },
    {
      name:"Action",
      cell:(row)=><button className="bbuttonn" onClick={()=>alert(row.violation)}> edit </button>
    }
  ]

  useEffect(()=>{
    getData();
  },[])


  // to filter search data whenever search changes useeffect hook will be effected
 useEffect(()=>{
  console.log("search update useeffect")
  const result=data.filter(rowdata=>{
    return rowdata.plate.toLowerCase().match(search.toLowerCase()) || rowdata.violation.toLowerCase().match(search.toLowerCase());
  });
  setFilterdata(result)
 },[search])

  return(
    <> 
    {console.log("any data",data)}
    <DataTable title="Open Parking and Camera Violations"
     columns={columns} 
     data={filterdata} 
     pagination
     fixedHeader
     fixedHeaderScrollHeight='550px'
     selectableRows
     selectableRowsHighlight
     highlightOnHover
     actions={
      <button className='export-btn'>export</button> }
    subHeader
    subHeaderComponent={
      <input type="text" placeholder="search here" className="input-search"
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      />
    }
    subHeaderAlign="center"
      />
    </>

  )
}

export default Range
