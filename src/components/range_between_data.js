import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
function Range() {
  const [data,setData]=useState([])
  const [price1,setprice1]=useState("")
  const [price2,setprice2]=useState("")
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


  // to filter price data whenever price changes useeffect hook will be effected
 useEffect(()=>{
  // console.log("price update useeffect")
    
    
  const result=data.filter(rowdata=>{
    // console.log("any data",typeof(rowdata.fine_amount),rowdata.fine_amount)
    // console.log("date selected",typeof(price1),price1)
    return parseInt(rowdata.fine_amount)>=(parseInt(price1)) && parseInt(rowdata.fine_amount)<=(parseInt(price2)) ;
  });
  setFilterdata(result)
 },[price1,price2])

  return(
    <> 
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
        <>
      <input type="number" placeholder="minimum fine" className="input-price"
      value={price1}
      onChange={(e)=>setprice1(e.target.value)}
      />
      <input type="number" placeholder="maximum fine" className="input-price"
      value={price2}
      onChange={(e)=>setprice2(e.target.value)}
      />
      </>
     
    }
      
    subHeaderAlign="center"
      />
    </>

  )
}

export default Range
