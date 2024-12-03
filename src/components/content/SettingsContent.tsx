import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export default function SettingsContent() {
    return (
        <div>
            <h1>Settings</h1>
            <div className="content">
                <div>
                    <div className="content-left">
                        <h3>Emails</h3>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked
                                        sx={{
                                            color: "primary",
                                            "&.Mui-checked": {
                                                color: "primary",
                                            },
                                        }}
                                    />
                                }
                                label="Send me emails related to Sandy Gardens"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Required"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Required"
                            />
                        </FormGroup>
                    </div>
                </div>
            </div>
        </div>
    );
}
