import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";
import people from "@/data/people";

export default function NeighboursSearchBar() {
    return (
        <Autocomplete
            disablePortal
            options={people}
            renderInput={(params) => (
                <TextField {...params} label="🔍 Search neighbours…" />
            )}
        />
    );
}
