import { TextField } from "@mui/material";
import randomiseAndShortenList from "@/util/randomiseAndShortenList";
import { useEffect, useRef, useState } from "react";
import removeMeAndCurrentNeighbours from "@/util/removeMeAndCurrentNeighbours";

interface NeighboursSearchBarProps {
    setSearchList: Function;
}

export default function NeighboursSearchBar({
    setSearchList,
}: NeighboursSearchBarProps) {
    const [inputValue, setInputValue] = useState("");
    const initialListRef = useRef<string[]>([]);
    const allAddableNames = removeMeAndCurrentNeighbours();

    useEffect(() => {
        const initialList = randomiseAndShortenList(allAddableNames, 5);
        setSearchList(initialList);
        initialListRef.current = initialList;
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newInputValue = event.target.value;
        setInputValue(newInputValue);

        if (newInputValue === "") {
            initialListRef.current = randomiseAndShortenList(
                allAddableNames,
                5,
            );
            setSearchList(initialListRef.current);
        } else {
            const filteredList = allAddableNames.filter((person) =>
                person.toLowerCase().includes(newInputValue.toLowerCase()),
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
