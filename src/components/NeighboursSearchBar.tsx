import { TextField } from "@mui/material";
import salnetHoursWorkedList from "@/data/salnetHoursWorkedList";
import randomiseAndShortenList from "@/util/randomiseAndShortenList";
import { useEffect, useState } from "react";

interface NeighboursSearchBarProps {
    setSearchList: Function;
}

export default function NeighboursSearchBar({
    setSearchList,
}: NeighboursSearchBarProps) {
    const [inputValue, setInputValue] = useState("");
    const [defaultList, setDefaultList] = useState<string[]>([]);
    const allNames = salnetHoursWorkedList.map((person) => person.name);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let filteredList;
        const newInputValue = event.target.value;
        setInputValue(newInputValue);

        if (newInputValue === "") {
            filteredList = defaultList;
        } else {
            filteredList = allNames.filter((person) =>
                person.toLowerCase().includes(newInputValue.toLowerCase())
            );
        }
        setSearchList(filteredList);
    };

    useEffect(() => {
        const initialDefaultList = randomiseAndShortenList(allNames, 5);
        setDefaultList(initialDefaultList);
        setSearchList(initialDefaultList);
    }, []);

    useEffect(() => {
        if (inputValue === "") {
            setSearchList(defaultList);
        }
    }, [inputValue, defaultList]);

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
