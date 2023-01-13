import './App.css';
import Show_Data from './components/show_data';
import Filter from './components/filter';
import SearchDropdown from './components/dropdownselection';
import Maindata from './components/sravani';
import Specialselection from './components/specialselection';
import Range from './components/range_between_data';
function App() {
  
  return (
    <div >
        {/* <Show_Data  />
       <Chartdata/> 
        <Filter/> 
       <SearchDropdown/> */}
       {/* <Specialselection/> */}
       <Range/>
       
    </div>
  );
}

export default App;
