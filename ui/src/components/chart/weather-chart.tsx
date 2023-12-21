import {useEffect, useState} from 'react';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import {Line} from "react-chartjs-2";
import {WeatherData} from "../../App.tsx";


export default function WeatherChart(props: { weatherData: WeatherData[], mode: string }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
    const [labels, setLabels] = useState<string[]>([]);
    const [humidities, setHumidities] = useState<number[]>([]);
    const [temperatures, setTemperatures] = useState<number[]>([])


    useEffect(() => {
        const uniqueTimes = [...new Set(props.weatherData.map(entry => entry.time))];
        setLabels(uniqueTimes);
        setTemperatures(props.weatherData.map(entry => entry.temperature))
        setHumidities(props.weatherData.map(entry => entry.humidity))
    }, [props.weatherData]);


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };


    const data = {
        labels,
        datasets: [
            {
                label: props.mode === 'temp' ? 'Temperatur (°C)' : 'Feuchtigkeit (%)',
                data: props.mode === 'temp' ? temperatures : humidities,
                borderColor: props.mode === 'temp' ? 'rgb(255, 99, 132)' : 'rgb(53, 162, 235)',
                backgroundColor: props.mode === 'temp' ? 'rgba(255, 99, 132, 0.5)' : 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };


    return (
        <>
            <Line options={options} data={data}/>
        </>
    )
}











