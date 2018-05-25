import { app } from "electron";
import setAppMenu from "./setAppMenu";
import createWindow from "./createWindow";
import checkUpdate from "./checkUpdate";

app.on("ready", () => {
  setAppMenu();
  createWindow();
  checkUpdate();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", (_e, hasVisibleWindows) => {
  if (!hasVisibleWindows) {
    createWindow();
  }
});
