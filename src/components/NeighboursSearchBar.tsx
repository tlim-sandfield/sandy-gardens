import { TextField } from "@mui/material";
import salnetHoursWorkedList from "@/data/salnetHoursWorkedList";
import randomiseAndShortenList from "@/util/randomiseAndShortenList";
import { useEffect, useMemo, useRef, useState } from "react";
import me from "@/data/me";

interface NeighboursSearchBarProps {
    setSearchList: Function;
}

export default function NeighboursSearchBar({
    setSearchList,
}: NeighboursSearchBarProps) {
    const [inputValue, setInputValue] = useState("");
    const initialListRef = useRef<string[]>([]);
    const allNamesExceptMe = useMemo(
        () =>
            salnetHoursWorkedList
                .filter((person) => person.name !== me.name)
                .map((person) => person.name),
        []
    );

    useEffect(() => {
        const initialList = randomiseAndShortenList(allNamesExceptMe, 5);
        setSearchList(initialList);
        initialListRef.current = initialList;
    }, [allNamesExceptMe]);

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
