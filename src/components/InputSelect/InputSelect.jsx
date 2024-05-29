import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function InputSelect({ priorityLevel, setPriorityLevel }) {
    return (
        <FormControl required margin="normal" fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priorityLevel}
                label="Age"
                onChange={(e) => setPriorityLevel(e.target.value)}
            >
                <MenuItem value={"alta"}>Alta</MenuItem>
                <MenuItem value={"media"}>Media</MenuItem>
                <MenuItem value={"baixa"}>Baixa</MenuItem>
            </Select>
        </FormControl>
    )
}
