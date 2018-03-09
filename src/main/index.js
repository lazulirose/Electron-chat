import {
    app
} from "electron";
import createWindow from "./createWindow";
import setAppMenu from "./setAppMenu";

app.on("ready", () => {
    createWindow();
    setAppMenu();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", (_ehasVisibleWindows) => {
    if (!hasVisibleWindows) {
        createWindow();
    }
})
