import { app, protocol } from "electron"
import { installVueDevtools } from "vue-cli-plugin-electron-builder/lib"

import isDev from "./libs/is-dev"
import createWindow from "./libs/create-window"
import { msgServe } from "./libs/messenger"
import createStorage from "./libs/create-storage"


if (isDev) require("./libs/debug").default()


protocol.registerSchemesAsPrivileged([{
    scheme: "app",
    privileges: {
        secure: true,
        standard: true
    }
}])


app.on("ready", async () => {
    if (isDev && !process.env.IS_TEST) {
        try {
            await installVueDevtools()
        } catch (err) {
            console.error("Vue Devtools failed to install:", err.toString())
        }
    }
})


app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit()
})


if (isDev) {
    if (process.platform === "win32") {
        process.on("message", data => {
            if (data === "graceful-exit") app.quit()
        })
    } else {
        process.on("SIGTERM", () => {
            app.quit()
        })
    }
}


export { isDev, createWindow, createStorage, msgServe }
export default { isDev, createWindow, createStorage, msgServe }
