import MenuNavbar from "@/components/MenuNavbar";
import PermanentDrawer from "@/components/PermanentDrawer";

export default function NeighboursPage() {
    return (
        <div>
            <MenuNavbar />
            <PermanentDrawer />
            <div className="page-content">
                <h1>Neighbours</h1>
                <p>Add people as neighbors and choose where they are on your map, the higher up on this list the closer they will be to your plot. Random players will appear around your plot first if you don’t add neighbours.</p>
            </div>
        </div>
    )
}