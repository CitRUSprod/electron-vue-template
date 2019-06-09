import { app, BrowserWindow } from "electron"
import localShortcut from "electron-localshortcut"


const isMacOS = process.platform === "darwin"


const toggleDevTools = (win = BrowserWindow.getFocusedWindow()) => {
	if (win) {
		if (win.webContents.isDevToolsOpened()) {
			win.webContents.closeDevTools()
		} else {
			win.webContents.openDevTools()
		}
	}
}


const devTools = (win = BrowserWindow.getFocusedWindow()) => {
	if (win) toggleDevTools(win)
}


const openDevTools = (win = BrowserWindow.getFocusedWindow()) => {
	if (win) win.webContents.openDevTools()
}


const refresh = (win = BrowserWindow.getFocusedWindow()) => {
	if (win) win.webContents.reloadIgnoringCache()
}


const debug = () => {

	app.on("browser-window-created", (e, win) => {
        win.webContents.once("dom-ready", () => {
            openDevTools(win)
        })
	})

	app.on("ready", () => {
		localShortcut.register(isMacOS ? "Command+Alt+I" : "Control+Shift+I", devTools)
		localShortcut.register("F12", devTools)

		localShortcut.register("CommandOrControl+R", refresh)
		localShortcut.register("F5", refresh)
	})
	
}


export default debug
