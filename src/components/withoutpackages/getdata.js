import React from "react";
import { useEffect,useState } from "react";
import "./tablecss.css"
function GetDataPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = "https://data.cityofnewyork.us/resource/nc67-uf89.json";
    fetch(url)
      .then((response) => response.json())
      
      .then((result) => setData(result))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (data.length !== 0) {
      setIsLoading(false);
    }
    console.log(data);
  }, [data]);

  return (
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
           { data.map((user) => (
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
  );
}

export default GetDataPage;