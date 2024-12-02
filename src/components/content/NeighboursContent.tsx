import NeighboursList from "../NeighboursList";
import NeighboursSearchBar from "../NeighboursSearchBar";

export default function NeighboursContent() {
    return (
        <div>
            <h1>Neighbours</h1>
            <div className="content">
                <div>
                    <p className="content-left">
                        Add people as neighbors and choose where they are on
                        your map, the higher up on this list the closer they
                        will be to your plot. Random players will appear around
                        your plot first if you don’t add neighbours.
                    </p>
                </div>

                <div className="content-right">
                    <NeighboursSearchBar />
                    <NeighboursList />
                </div>
            </div>
        </div>
    );
}
