"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#086623",
        },
        secondary: {
            main: "#8A6240",
        },
    },
    typography: {
        fontFamily: "Helvetica",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
    cssVariables: true,
});

export default theme;
