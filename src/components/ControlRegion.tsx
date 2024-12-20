{/* Componentes MUI */ }

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useRef, useEffect } from 'react';


export default function ControlRegion() {

    const descriptionRef = useRef<HTMLDivElement>(null);

    {/* Variable de estado y función de actualización */ }
    let [selected, setRegion] = useState(-1)

    {/* Arreglo de objetos */ }
    let items = [
        // { "name": "Precipitación", "description": "Cantidad de agua que cae sobre una superficie en un período específico." }
        { "name": "Guayaquil", "description": "Guayaquil es una ciudad ecuatoriana, capital de la provincia del Guayas y la región litoral de Ecuador, la ciudad más poblada del país y la capital económica del mismo." },
        { "name": "Quito", "description": "Quito es la capital de la República del Ecuador, la ciudad más antigua de Sudamérica y la primera ciudad declarada Patrimonio de la Humanidad por la Unesco, el 18 de septiembre de 1978." },
        { "name": "Cuenca", "description": "Cuenca es una ciudad del centro sur de Ecuador, capital de la provincia del Azuay y de la región homónima. Está situada en la hoya de Cuenca, en los Andes ecuatorianos." },
        { "name": "Manta", "description": "Manta es una ciudad ecuatoriana; es la cabecera cantonal del cantón homónimo y la capital de la provincia de Manabí. Es la segunda ciudad más grande y poblada de la provincia, y la cuarta más grande y poblada del país." },
    ]

    
    {/* Arreglo de elementos JSX */ }
    let options = items.map((item, key) => <MenuItem key={key} value={key}>{item["name"]}</MenuItem>)

    {/* Manejador de eventos */ }
    const handleChange = (event: SelectChangeEvent) => {

         let idx = parseInt(event.target.value)
        // alert( idx );
        //items[idx]["name"]
        setRegion(idx);
        

        {/* Modificación de la referencia descriptionRef */ }
         if (descriptionRef.current !== null) {
             descriptionRef.current.innerHTML = (idx >= 0) ? items[idx]["description"] : ""
         }

    };


    {/* JSX */ }
    return (

        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >

            <Typography mb={2} component="h3" variant="h6" color="primary">
                Ciudad
            </Typography>

            <Box sx={{ minWidth: 120 }}>

                <FormControl fullWidth>
                    <InputLabel id="simple-select-label">Variables</InputLabel>
                    <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        label="Variables"
                        defaultValue='-1'
                        onChange={handleChange}
                    >
                        <MenuItem key="-1" value="-1" disabled>Seleccione una ciudad de Ecuador</MenuItem>

                        {options}

                    </Select>
                </FormControl>

            </Box>
            <Typography ref={descriptionRef} mt={2} component="p" color="text.secondary" />


        </Paper>


    )
}