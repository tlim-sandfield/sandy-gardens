"use client";

import NeighboursAddList from "../NeighboursAddList";
import NeighboursSearchBar from "../NeighboursSearchBar";
import DraggableList from "../DraggableList";
import NeighboursAddBack from "../NeighboursAddBack";
import { Divider } from "@mui/material";
import { useState } from "react";

export default function NeighboursContent() {
    const [searchList, setSearchList] = useState([]);

    return (
        <div>
            <h1>Neighbours</h1>
            <div className="content">
                <div className="content-left">
                    <p>
                        Add people as neighbors and choose where they are on
                        your map, the higher up on this list the closer they
                        will be to your plot. Random players will appear around
                        your plot first if you don’t add neighbours.
                    </p>
                    <p>Drag neighbours to change proximity to you</p>
                    <DraggableList />
                </div>

                <div className="content-right">
                    <h3>Search</h3>
                    <NeighboursSearchBar setSearchList={setSearchList} />
                    <NeighboursAddList searchList={searchList} setSearchList={setSearchList}/>
                    <br />
                    <Divider />
                    <h3>Notifications</h3>
                    <NeighboursAddBack />
                </div>
            </div>
        </div>
    );
}
