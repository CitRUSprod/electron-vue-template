import path from "path"
import _ from "lodash"
import { BrowserWindow, Menu } from "electron"
import { createProtocol } from "vue-cli-plugin-electron-builder/lib"


let createdAppProtocol = false


const createWindow = (url = null, options = {}) => {

    const isLocalUrl = _.isString(url) && url[0] === "/" || !url

    const defaultOptions = {
        resizable: true,
        maximize: false,
        menu: false,
        waitForReadiness: true,
        bw: {
            minWidth: 800,
            minHeight: 600,
            width: 800,
            height: 600,
            icon: path.join(__static, "icon.png"),
            webPreferences: {
                nodeIntegration: isLocalUrl
            }
        }
    }

    const opts = _.merge(defaultOptions, options)

    if (opts.waitForReadiness) opts.bw.show = false

    let win = new BrowserWindow(opts.bw)

    if (_.isArray(opts.menu)) {
        win.setMenu(Menu.buildFromTemplate(opts.menu))
    } else if (!opts.menu) {
        win.setMenu(null)
    }

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        win.loadURL(isLocalUrl ? `${process.env.WEBPACK_DEV_SERVER_URL}${_.tail(url).join("") || "index.html"}` : url)
    } else {
        if (!createdAppProtocol) {
            createdAppProtocol = true
            createProtocol("app")
        }
        win.loadURL(isLocalUrl ? `app://.${url || "/index.html"}` : url)
    }

    win.setResizable(opts.resizable)

    if (opts.maximize) win.maximize()

    if (opts.waitForReadiness) {
        return new Promise(resolve => {
            win.once("ready-to-show", () => {
                win.show()
                resolve(win)
            })
        })
    } else {
        return win
    }

}


export default createWindow
