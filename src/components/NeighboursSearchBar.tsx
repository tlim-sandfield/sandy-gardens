import * as React from "react";
import { TextField } from "@mui/material";
import allPeopleList from "@/data/allPeopleList";

interface NeighboursSearchBarProps {
    setSearchList: Function;
}

export default function NeighboursSearchBar({
    setSearchList,
}: NeighboursSearchBarProps) {
    const [inputValue, setInputValue] = React.useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newInputValue = event.target.value;
        setInputValue(newInputValue);

        const filteredList = allPeopleList.filter((person) =>
            person.toLowerCase().includes(newInputValue.toLowerCase())
        );

        setSearchList(filteredList);
    };

    return (
        <TextField
            id="outlined-basic"
            onChange={handleInputChange}
            value={inputValue}
            variant="outlined"
            fullWidth
            label="🔍 Search neighbours…"
        />
    );
}
