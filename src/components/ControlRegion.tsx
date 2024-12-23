import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState, useRef } from 'react';

interface ControlRegionProps {
    onCityChange: (city: string) => void;
}

export default function ControlRegion({ onCityChange }: ControlRegionProps) {
    const descriptionRef = useRef<HTMLDivElement>(null);
    const [selected, setRegion] = useState(-1);
    console.log(selected);
    const items = [
        { "name": "Guayaquil", "description": "Guayaquil es una ciudad ecuatoriana, capital de la provincia del Guayas." },
        { "name": "Quito", "description": "Quito es la capital de la República del Ecuador." },
        { "name": "Cuenca", "description": "Cuenca es una ciudad del centro sur de Ecuador." },
        { "name": "Manta", "description": "Manta es una ciudad ecuatoriana, capital de la provincia de Manabí." },
    ];

    const options = items.map((item, key) => <MenuItem key={key} value={key}>{item["name"]}</MenuItem>);

    const handleChange = (event: SelectChangeEvent) => {
        let idx = parseInt(event.target.value);
        setRegion(idx);

        if (descriptionRef.current !== null) {
            descriptionRef.current.innerHTML = (idx >= 0) ? items[idx]["description"] : ""
        }

        if (idx >= 0) {
            onCityChange(items[idx]["name"]);
        }
    };

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
                    <InputLabel id="simple-select-label">Seleccione una ciudad</InputLabel>
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
    );
}
