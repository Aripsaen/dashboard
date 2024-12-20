import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

// interfaz para los datos de las filas
interface RowData {
  name: string;
  value: string;
}

interface TableWeatherProps {
  city: string;
}

// Función para crear los datos de las filas
function createData(name: string, value: string): RowData {
  return { name, value };
}

export default function TableWeather({ city }: TableWeatherProps) {
  // interfaz RowData para el tipo de estado de rows
  const [rows, setRows] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(false); // Estado para controlar la carga

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true); // Inicia la carga
      try {
        const apiKey = "3c2fd3c052d827c60a63ca04e025f7a7";
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
      
        const newRows = [
          createData('Temperatura', `${data.main.temp} °C`),
          createData('Humedad', `${data.main.humidity}%`),
          createData('Presión', `${data.main.pressure} hPa`),
          createData('Velocidad del viento', `${data.wind.speed} m/s`),
        ];

        setRows(newRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false); // Finaliza la carga
    };
    fetchWeatherData();    
  }, [city]);

  if (loading) {
    return <CircularProgress />; // Muestra el spinner de carga
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Variable</TableCell>
            <TableCell align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}