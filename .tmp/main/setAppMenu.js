"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _electron = require("electron");

var _createWindow = require("./createWindow");

var _createWindow2 = _interopRequireDefault(_createWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setAppMenu() {
    var template = [{
        label: "File",
        submenu: [{ label: "New Window", accelerator: "CmdOrCtrl+N", click: _createWindow2.default }, { type: "separator" }, { label: "Close", accelerator: "CmdOrCtrl+W", role: "close" }]
    }, {
        label: "Edit",
        submenu: [{ label: "Copy", accelerator: "CmdrCtrl+C", role: "copy" }, { label: "Paste", accelerator: "CmdrCtrl+V", role: "paste" }, { label: "Cut", accelerator: "CmdrCtrl+X", role: "cut" }, { label: "Select", accelerator: "CmdrCtrl+A", role: "selectall" }]
    }, {
        label: "View",
        submenu: [{
            label: "Reload",
            accelerator: "CmdOrCtrl+R",
            click: function click(item, focusedWindow) {
                return focusedWindow && focusedWindow.reload();
            }
        }, {
            label: "Toggle DevTools",
            accelerator: process.plantform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
            click: function click(item, focusedWindow) {
                return focusedWindow && focusedWindow.toggleDevTools();
            }
        }]
    }];
    if (process.platform === "darwin") {
        template.unshift({
            label: _electron.app.getName(),
            submenu: [{ role: "about" }, { type: "separator" }, { role: "services", submenu: [] }, { type: "separator" }, { role: "hide" }, { type: "hideothers" }, { role: "unhide" }, { type: "separator" }, { role: "quite" }]
        });
        template.push({
            role: "window",
            submenu: [{ role: "minimize" }, { type: "zoom" }]
        });
    }
    var appMenu = _electron.Menu.buildFromTemplate(template);
    _electron.Menu.setApplicationMenu(appMenu);
}
exports.default = setAppMenu;