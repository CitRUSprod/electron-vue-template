import fs from "fs-extra"


class Storage {

    constructor(path = `${process.cwd()}/data`) {
        this.path = path
    }

    async getFile(file) {
        const filePath = `${this.path}/${file}`
        if (fs.existsSync(filePath)) {
            return await fs.readFile(filePath, "utf8")
        } else {
            return ""
        }
    }

    async setFile(file, data) {
        await fs.outputFile(`${this.path}/${file}`, data)
    }

    async getJson(file) {
        const filePath = `${this.path}/${file}`
        if (fs.existsSync(filePath)) {
            return await fs.readJson(filePath)
        } else {
            return {}
        }
    }

    async setJson(file, data) {
        await fs.outputJson(`${this.path}/${file}`, data)
    }

}


const createStorage = path => new Storage(path)


export default createStorage
