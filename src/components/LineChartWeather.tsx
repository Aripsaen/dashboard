import React, { useEffect, useState } from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import Paper from '@mui/material/Paper';

interface WeatherData {
  dt_txt: string;
  main: {
    temp: number;
    humidity: number;
  };
}

export default function LineChartWeather() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "3c2fd3c052d827c60a63ca04e025f7a7";  // Asegúrate de usar tu clave API real
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&appid=${apiKey}&units=metric`);
      const data = await response.json();

      const processedData = data.list.map((item: WeatherData) => ({
        time: item.dt_txt,
        temperature: item.main.temp,
        humidity: item.main.humidity
      }));

      setChartData(processedData);
    };

    fetchData();
  }, []);

  return (
    <Paper style={{ height: 400, padding: '20px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}
