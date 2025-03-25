import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { FilterProps } from "../../types";

export function MessageFilter({ filter, setFilter }: FilterProps) {
    return (
        <FormControl 
            fullWidth sx={{ marginTop: 3 }}>
            <InputLabel>Status</InputLabel>
            <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                label="Status"
            >
                <MenuItem value="todas">Todas</MenuItem>
                <MenuItem value="agendada">Agendadas</MenuItem>
                <MenuItem value="enviada">Enviadas</MenuItem>
            </Select>
        </FormControl>
    );
}
