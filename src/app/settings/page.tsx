import MenuNavbar from "@/components/MenuNavbar";
import PermanentDrawer from "@/components/PermanentDrawer";

export default function SettingsPage() {
    return(
        <div>
            <MenuNavbar />
            <PermanentDrawer />
            <div className="page-content">
                <h1>Settings</h1>
            </div>
        </div>
    )
}