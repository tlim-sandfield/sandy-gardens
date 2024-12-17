import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CssBaseline, Drawer } from "@mui/material";
import { useState } from "react";

const drawerWidth = 450;

export default function ShopDrawer() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                className="game-button shop-button"
                onClick={() => setOpen(!open)}
            >
                <ShoppingCartIcon />
            </Button>
            <CssBaseline />
            <Drawer
                variant="persistent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: "rgba(245, 245, 245, 0.75)",
                        zIndex: 0,
                    },
                }}
                anchor="left"
                open={open}
            ></Drawer>
        </div>
    );
}
