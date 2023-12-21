import './App.css'
import {DatePicker, Switch} from "antd";
import {useEffect, useState} from "react";
import WeatherChart from "./components/chart/weather-chart.tsx";
import {FaThermometerHalf} from "react-icons/fa";
import {WiHumidity} from "react-icons/wi";




export interface WeatherData {
   date: string,
   humidity: number,
   id: number,
   temperature: number,
   time: string
}




function App() {
   const [selectedDate, setSelectedDate] = useState([]);
   const [data, setData] = useState([]);
   const [mode, setMode] = useState<string>("temp")




   useEffect(() => {
       const fetchData = async () => {
           try {
               if (selectedDate) {
                   const response = await fetch(`http://localhost:5000/api/temperature/${selectedDate}`);
                   const result = await response.json();
                   setData(result.data);
               }
           } catch (error) {
               console.error('Error fetching data:', error);
           }
       };




       fetchData();
   }, [selectedDate]);




   function handleDateChange(date: any): void {
       const formattedDate = date?.format('YYYY-MM-DD');
       setSelectedDate(formattedDate);
   }




   function handleModeChange() {
       if (mode === "temp") {
           setMode("hum")
       } else {
           setMode("temp")
       }
   }

   return (
       <>
           <h1 style={{display: "flex", justifyContent: "center"}}>Wetterdaten</h1>
           <div style={{display: "flex", justifyContent: "center"}}>
               <DatePicker placeholder={"Datum auswählen"} onChange={handleDateChange}/>
               <Switch
                   style={{marginLeft:24, marginTop:4}}
                   onChange={handleModeChange}
                   checkedChildren={<WiHumidity style={{fontSize: "18px"}}/>}
                   unCheckedChildren={<FaThermometerHalf style={{fontSize: "18px"}}/>}/>
           </div>


           <WeatherChart weatherData={data} mode={mode}/>
       </>
   )
}

export default App





