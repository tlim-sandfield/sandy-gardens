import { TextField } from "@mui/material";
import salnetHoursWorkedList from "@/data/salnetHoursWorkedList";
import randomiseAndShortenList from "@/util/randomiseAndShortenList";
import { useEffect, useMemo, useRef, useState } from "react";
import me from "@/data/me";
import removeMe from "@/util/removeMe";

interface NeighboursSearchBarProps {
    setSearchList: Function;
}

export default function NeighboursSearchBar({
    setSearchList,
}: NeighboursSearchBarProps) {
    const [inputValue, setInputValue] = useState("");
    const initialListRef = useRef<string[]>([]);

    const allNames = useMemo(
        () => salnetHoursWorkedList.map((person) => person.name),
        []
    );

    // TODO: SQL query has to be made to get all names except me and LEFT JOIN with the neighbours table to exclude my neighbours
    const allNamesExceptMe = useMemo(() => removeMe(allNames), [allNames]);

    useEffect(() => {
        const initialList = randomiseAndShortenList(allNamesExceptMe, 5);
        setSearchList(initialList);
        initialListRef.current = initialList;
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newInputValue = event.target.value;
        setInputValue(newInputValue);

        if (newInputValue === "") {
            setSearchList(initialListRef.current);
        } else {
            const filteredList = allNamesExceptMe.filter((person) =>
                person.toLowerCase().includes(newInputValue.toLowerCase())
            );
            setSearchList(filteredList);
        }
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
