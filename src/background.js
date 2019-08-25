import { app } from "electron"

import { createWindow } from "./initialization"


app.setName("Electron Vue Template")


let win


const createMainWindow = async () => {
    win = await createWindow("/index.html")
    win.on("closed", () => {
        win = null
    })
}


app.on("activate", () => {
    if (win === null) createMainWindow()
})


app.on("ready", async () => {
    await createMainWindow()
})
