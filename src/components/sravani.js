import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
function Maindata() {
	const [data, setData] = useState([])
    const [search,setSearch]=useState("")
    const [filterdata,setFilterdata]=useState([])
	const getData = async () => {
		try {
			const response = await axios.get("https://data.cityofnewyork.us/resource/wewp-mm3p.json");
			setData(response.data);

		} catch (error) {
			console.log(error);
		}

	};
	// console.log(data.length)

	const columns = [
		{
			name: "unique_id",
			selector: (row) => row.unique_id,
			sortable: true,
			id: "id"
		},
		{
			name: "date",
			selector: (row) => row.date.slice(0, 10),

		},
		{
			name: "time",
			selector: (row) => row.time,

		},
		{
			name: "inquiry_name",
			selector: (row) => row.inquiry_name,
		},
		{
			name: "brief_description",
			selector: (row) => row.brief_description,
		},
		{
			name: "agency",
			selector: (row) => row.agency,
			sortable: true
		}
		,
		{
			name: "agency_name",
			selector: (row) => row.agency_name,
		}
		,

		{
			name: "call_resolution",
			selector: (row) => row.call_resolution,
		}
	]
	// const handledate = () => {
	// 	sortable: true
	// }

	useEffect(() => {
		getData();
	}, [])

    useEffect(()=>{
        console.log("search update useeffect")
        const result=data.filter(rowdata=>{
          return rowdata.unique_id.toLowerCase().match(search.toLowerCase());
        });
        setFilterdata(result)
       },[search])

	return (
		<>
			<div className="tabledata">
				<div className="dropdown">


					<select name="dopdown" id="cars">
						<option value="sortby">Sort by</option>
						<option value="id">id</option>
						<option value="date" >Date</option>
						<option value="time">Time</option>
						<option value="agency">agency</option>
					</select>

				</div>
				<DataTable title="311-CALL INQUIRY DATA"

					columns={columns}
					data={filterdata}
					pagination
					fixedHeader
					fixedHeaderScrollHeight
					defaultSortFieldId={"id"}
                    subHeader
                    subHeaderComponent={
                      <input type="text" placeholder="search here" className="input-search"
                      value={search}
                      onChange={(e)=>setSearch(e.target.value)}
                      />
                    }
				/>

			</div>
		</>

	)
}

export default Maindata