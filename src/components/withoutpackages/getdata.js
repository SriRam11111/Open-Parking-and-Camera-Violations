import React from "react";
import { useEffect,useState } from "react";
import "./tablecss.css"
function GetDataPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [search, setSearch] = useState();

  useEffect(() => {
    const url = "https://data.cityofnewyork.us/resource/nc67-uf89.json";
    fetch(url)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log(error));
  }, []);
  useEffect(()=>{
    setFilterdata(data);
  },[data])
  
  useEffect(() => {
    if (data.length !== 0) {
      setIsLoading(false);
    }
    console.log(data);
  }, [data]);


    // to filter search d ata whenever search changes useeffect hook will be effected
 useEffect(()=>{
  const result=data.filter(rowdata=>{
    // console.log("plate",rowdata.plate)
    // console.log("violation",rowdata.violation)
    // console.log("rowdata",rowdata)
    if(rowdata.plate && rowdata.violation ){
    return rowdata.plate.toLowerCase().match(search.toLowerCase()) || rowdata.violation.toLowerCase().match(search.toLowerCase());}
    
  });
  console.log("SEARCH VALIDATION result",filterdata)


  setFilterdata(result)
 },[search])
  return (
    <>
    <input type="text" placeholder="search here" className="input-search_tabledata"
    onChange={(e)=>setSearch(e.target.value)}/>

    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) 
      : (
        
        
        
          <table className="table_librarian">
            <thead>
                <th>plate</th>
                <th>fine_amount</th>
                <th>violation</th>
                <th>issuing_agency</th>
                <th>issue_dateth</th>
                </thead>
           { filterdata.map((user) => (
              <tbody>
                <td>{user.plate}  </td>
                <td>{user.fine_amount}</td>
                <td>{user.violation}</td>
                <td>{user.issuing_agency}</td>
                <td>{user.issue_date}</td>

              </tbody>
              ))}
          </table>
          
        
      )}
    </div>

    </>
  );
}

export default GetDataPage;