import { ipcMain, ipcRenderer } from "electron"
import uniqid from "uniqid"


const msgServe = (channel, listenerFn) => {

    const listener = async (e, id, ...args) => {
        try {
            let result = listenerFn(...args)
            if (result instanceof Promise) result = await result
            e.sender.send(`FROM_MAIN_TO_RENDERER@${channel}`, id, {
                success: true,
                result
            })
        } catch (err) {
            e.sender.send(`FROM_MAIN_TO_RENDERER@${channel}`, id, {
                success: false,
                error: err.message
            })
        }
    }

    const stopListening = () => {
        ipcMain.removeListener(`FROM_RENDERER_TO_MAIN@${channel}`, listener)
    }

    ipcMain.on(`FROM_RENDERER_TO_MAIN@${channel}`, listener)

    return stopListening
}


const msgRequest = (channel, timeout = 0, ...args) => new Promise(resolve => {

    const id = uniqid()
    let timeoutId

    if (timeout > 0) {
        timeoutId = setTimeout(() => {
            resolve({
                success: false,
                error: "Request timeout error"
            })
        }, timeout)
    }

    const listener = (e, resId, res) => {
        if (id === resId) {
            if (timeoutId) clearTimeout(timeoutId)
            ipcRenderer.removeListener(`FROM_MAIN_TO_RENDERER@${channel}`, listener)
            resolve(res)
        }
    }

    ipcRenderer.send(`FROM_RENDERER_TO_MAIN@${channel}`, id, ...args)
    ipcRenderer.on(`FROM_MAIN_TO_RENDERER@${channel}`, listener)
})


export { msgServe, msgRequest }
