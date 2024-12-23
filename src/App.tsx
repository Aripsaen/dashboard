// import { useState } from 'react'
import Grid from "@mui/material/Grid2";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import IndicatorWeather from "./components/IndicatorWeather";
import TableWeather from "./components/TableWeather";
import ControlWeather from "./components/ControlWeather";
import LineChartWeather from "./components/LineChartWeather";
import ControlRegion from "./components/ControlRegion";
import { useEffect, useState } from "react";

{
  /* Hooks */
}

interface Indicator {
  title?: String;
  subtitle?: String;
  value?: String;
}

function App() {
  {
    /* Variable de estado y función de actualización */
  }

  const [selectedParameter, setSelectedParameter] = useState<number | null>(
    null
  );
  const [city, setCity] = useState("Guayaquil");
  let [indicators, setIndicators] = useState<Indicator[]>([]);
  let [owm, setOWM] = useState(localStorage.getItem("openWeatherMap"));
  console.log(owm);
  console.log(setOWM);

  {
    /* Hook: useEffect */
  }
  useEffect(() => {
    let request = async () => {
      {
        /* Request */
      }
      let API_KEY = "3c2fd3c052d827c60a63ca04e025f7a7";
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&mode=xml&appid=${API_KEY}`
      );
      let savedTextXML = await response.text();

      {
        /* XML Parser */
      }
      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");

      {
        /* Arreglo para agregar los resultados */
      }

      let dataToIndicators: Indicator[] = new Array<Indicator>();

      {
        /* 
           Análisis, extracción y almacenamiento del contenido del XML 
           en el arreglo de resultados
       */
      }

      let name = xml.getElementsByTagName("name")[0].innerHTML || "";
      dataToIndicators.push({
        title: "Location",
        subtitle: "City",
        value: name,
      });

      let location = xml.getElementsByTagName("location")[1];

      let latitude = location.getAttribute("latitude") || "";
      dataToIndicators.push({
        title: "Location",
        subtitle: "Latitude",
        value: latitude,
      });

      let longitude = location.getAttribute("longitude") || "";
      dataToIndicators.push({
        title: "Location",
        subtitle: "Longitude",
        value: longitude,
      });

      let altitude = location.getAttribute("altitude") || "";
      dataToIndicators.push({
        title: "Location",
        subtitle: "Altitude",
        value: altitude,
      });

      //console.log( dataToIndicators )

      {
        /* Modificación de la variable de estado mediante la función de actualización */
      }
      setIndicators(dataToIndicators);
    };

    request();
  }, [city]);

  let renderIndicators = () => {
    return indicators.map((indicator, idx) => (
      <Grid key={idx} size={{ xs: 12, xl: 3 }}>
        <IndicatorWeather
          title={indicator["title"]}
          subtitle={indicator["subtitle"]}
          value={indicator["value"]}
        />
      </Grid>
    ));
  };

  return (
    <Grid container spacing={5}>
      <Grid size={{ xs: 12, xl: 3 }}>
        <ControlRegion onCityChange={setCity} />
      </Grid>

      {renderIndicators()}
      {/* aqui va renderIndicators */}

      {/* Tabla */}
      {/* <Grid size={{ xs: 12, xl: 8 }}>Elemento: Tabla</Grid> */}

      {/* Grid Anidado */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, xl: 6 }}>
          <ControlWeather onSelectChange={setSelectedParameter} />
        </Grid>

        {/* Gráfico */}
        <Grid size={{ xs: 12, xl: 3 }}>
          <LineChartWeather selectedParameter={selectedParameter} city={city} />
        </Grid>

        <Grid size={{ xs: 12, xl: 6 }}>
          <TableWeather city={city} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
