import './App.css'
import {DatePicker, DatePickerProps} from "antd";
import {useEffect, useState} from "react";
import WeatherChart from "./components/chart/weather-chart.tsx";

function App() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedDate) {
                    const response = await fetch(`YOUR_API_ENDPOINT?date=${selectedDate}`);
                    const result = await response.json();
                    setData(result);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedDate]);

    const handleDateChange = (date) => {
        const formattedDate = date?.format('YYYY-MM-DD');

        setSelectedDate(formattedDate);
    };
    return (
        <>
            <h1 style={{display: "flex", justifyContent: "center"}}>Wetterdaten</h1>
            <div style={{display: "flex", justifyContent: "center"}}>
                <DatePicker onChange={handleDateChange}/>
            </div>
            <WeatherChart/>
        </>
    )
}

export default App
