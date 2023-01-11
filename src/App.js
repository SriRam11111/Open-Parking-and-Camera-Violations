import './App.css';
import axios from "axios";
import data from '../src/data/data.json'
import Show_Data from './components/show_data';
import { useEffect, useState } from 'react';
function App() {
  const[Data,SetData]=useState([])
  const getData = async () =>{
    try{
      const response =await axios.get("https://data.cityofnewyork.us/resource/nc67-uf89.json");
      SetData(response.data);
    }catch(error){
      console.log(error);
    }
  };

  useEffect(()=>{
    getData();
  },[])
  return (
    <div >
       <Show_Data  data={data}/>
    </div>
  );
}

export default App;
