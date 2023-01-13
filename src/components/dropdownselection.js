import React, { useEffect, useState } from "react";
// import "./SearchDataPage.css";
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Select from "react-select";

export default function SearchDropdown() {
  // React state to manage selected options
  const [selectedOptions, setSelectedOptions] = useState();
  const [filterdata,setFilterdata]=useState([])


  const [data, setData] = useState([])
  const getData = async () => {
    try {
      const response = await axios.get("https://data.cityofnewyork.us/resource/nc67-uf89.json");
      setData(response.data);
      setFilterdata(response.data)
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(()=>{
    getData();
  },[])
  //showing data in tables
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

  // Array of all options
  const optionList = [
    { value: "WI", label: "WI" },
    { value: "VA", label: "VA" },
    { value: "NY", label: "NY" },
    { value: "PA", label: "PA" },
    { value: "IN", label: "IN" }
  ];

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data.value);
    console.log("data ",data)
    console.log("data value",data.value)
    console.log("selectedOptions",selectedOptions)
  }

  useEffect(()=>{
    const result=data.filter(rowdata=>{
      console.log("rowdata useeffect",rowdata.state)
      console.log("selectedOptions useeffect",selectedOptions)
      return rowdata.state.match(selectedOptions)
    })
    setFilterdata(result)
  },[selectedOptions])
  console.log("data ",data)
    console.log("data value",data.value)
    console.log("selectedOptions",selectedOptions)


    return(
      <> 
      {console.log("any data",data)}
      <DataTable title="Real Time Traffic Speed data" className='data'
       columns={columns} 
       data={filterdata} 
       pagination
       fixedHeader
       fixedHeaderScrollHeight='550px'
       selectableRows
       selectableRowsHighlight
       highlightOnHover
       actions={<>
  
  
       </>
   }
      subHeader
      subHeaderComponent={<>
      <div className="app">
      <h2>Search Data by City </h2>
      <div className="dropdown-container">
        <Select
          options={optionList}
          placeholder="Select city"
          value={selectedOptions}
          onChange={(e)=>setSelectedOptions(e.value)}
          isSearchable={true}
          // isMulti
        />
      </div>
    </div>
        </>
      }
      subHeaderAlign="center"
        />
  
      </>
  
    )
}
