import React, { useEffect, useState } from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import Paper from '@mui/material/Paper';
// import ControlWeather from './ControlWeather';

interface WeatherData {
  dt_txt: string;
  main: {
    temp: number;
    humidity: number;
  };
  clouds: {
    all: number; // Porcentaje de nubosidad
  };
  rain?: {
    '3h': number; // Precipitación en los últimos 3 horas
  };
}

interface LineChartWeatherProps {
  selectedParameter: number | null; // Esta es la prop para el parámetro seleccionado
  city: string;
}


export default function LineChartWeather({ selectedParameter, city }: LineChartWeatherProps) {
  const [chartData, setChartData] = useState([]);
  // const [selectedParameter, setSelectedParameter] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "3c2fd3c052d827c60a63ca04e025f7a7";  // Asegúrate de usar tu clave API real
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();

      const processedData = data.list.map((item: WeatherData) => ({
        time: item.dt_txt,
        temperature: item.main.temp,
        humidity: item.main.humidity,
        cloudiness: item.clouds.all,
        precipitation: item.rain ? item.rain['3h'] : 0  // Asumiendo que puede no haber precipitación
      }));

      setChartData(processedData);
    };

    fetchData();
  }, [city]);

  // const handleSelectChange = (index: number) => {
  //   setSelectedParameter(index);
  // };

  return (
    <Paper style={{ height: 400, padding: '20px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
          <Line type="monotone" dataKey="cloudiness" stroke="#ffc658" />
          <Line type="monotone" dataKey="precipitation" stroke="#ff7300" /> */}
          {selectedParameter === 1 && <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />}
          {selectedParameter === 0 && <Line type="monotone" dataKey="precipitation" stroke="#ff7300" />}
          {selectedParameter === 2 && <Line type="monotone" dataKey="cloudiness" stroke="#ffc658" />}
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}
