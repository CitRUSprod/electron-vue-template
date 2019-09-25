import { app } from "electron"

import { createWindow } from "./initialization"


app.setName("Electron Vue Template")


let mainWindow


const createMainWindow = async () => {
    mainWindow = await createWindow("/index.html")
    mainWindow.on("closed", () => {
        mainWindow = null
    })
}


app.on("ready", async () => {
    await createMainWindow()
})
