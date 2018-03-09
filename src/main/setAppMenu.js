import { app, Menu } from "electron";
import createWindow from "./createWindow";

function setAppMenu () {
    const template = [
        {
            label: "File",
            submenu: [
                {label: "New Window", accelerator: "Cmd0rCtrl+N", click: createWindow},
                {type: "separator"},
                {label: "Close", accelerator: "Cmd0rCtrl+W", role: "close"}
            ]
        },
        {
            label: "Edit",
            submenu: [
                {label: "Copy", accelerator: "Cmd0rCtrl+C", role: "copy"},
                {label: "Paste", accelerator: "Cmd0rCtrl+V", role: "paste"},
                {label: "Cut", accelerator: "Cmd0rCtrl+X", role: "cut"},
                {label: "Select", accelerator: "Cmd0rCtrl+A", role: "selectall"}
            ]
        },
        {
            label: "View",
            submenu: [
                {
                 label: "Reload",
                 accelerator: "Cmd0rCtrl+R",
                 click: (item, focusedWindow) => focusedWindow && focusedWindow.reload()
                },
                {
                 label: "Toggle DevTools",
                 accelerator: process.plantform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
                 click: (item, focusedWindow) => focusedWindow && focusedWindow.toggleDevTools()
                }
            ]
        }
    ];
    if (process.platform === "darwin") {
        template.unshift( {
            label: app.getName(),
            submenu: [
                {role: "about"},
                {type: "separator"},
                {role: "services", submenu: []},
                {type: "separator"},
                {role: "hide"},
                {type: "hideothers"},
                {role: "unhide"},
                {type: "separator"},
                {role: "quite"}
            ]
        });
        template.push({
            role: "window",
            submenu: [
                {role: "minimize"},
                {type: "zoom"}
                ]
        });
    }
    const appMenu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(appMenu);
}
export default setAppMenu;