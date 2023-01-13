import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';


function Filter() {
    const [data,setData]=useState([])
    const [search,setSearch]=useState("")
    const [filterdata,setFilterdata]=useState([])
    useEffect(()=>{
          fetch("https://data.cityofnewyork.us/resource/nc67-uf89.json")
          .then(response=> response.json())
          .then(result=>setData(result))
        //   .then(result=>setData(result))
          .catch(error=>console.log(error));
      },[])
    useEffect(()=>{
        setFilterdata(data)
    },[search])
    console.log("search update 123 useeffecl data",data )
      console.log("filterdata for chart11111",filterdata)
    
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
        console.log("search update 123 useeffect")
        console.log("search update 123 search",search)
        const result=data.filter(rowdata=>{
          return rowdata.plate.toLowerCase().startsWith(search.toLowerCase());
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

export default Filter
