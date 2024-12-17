import { CssBaseline, Drawer } from "@mui/material";
import { useState } from "react";
import ShopButton from "./ShopButton";
import Shop from "./Shop";

const drawerWidth = 450;

export default function ShopDrawer() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <ShopButton open={open} setOpen={setOpen} />
            <CssBaseline />
            <Drawer
                variant="persistent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: "rgba(245, 245, 245, 0.8)",
                        zIndex: 0,
                    },
                }}
                anchor="left"
                open={open}
            >
                <Shop />
            </Drawer>
        </div>
    );
}
