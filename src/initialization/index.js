const dev = process.env.NODE_ENV !== "production"


import { app, protocol } from "electron"
import { installVueDevtools } from "vue-cli-plugin-electron-builder/lib"

import createWindow from "./create-window"


if (dev) require("./debug").default()


protocol.registerSchemesAsPrivileged([{
    scheme: "app",
    privileges: {
        secure: true,
        standard: true
    }
}])


app.on("ready", async () => {
    if (dev && !process.env.IS_TEST) {
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


if (dev) {
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


export { createWindow }
export default { createWindow }
