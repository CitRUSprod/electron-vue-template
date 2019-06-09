const { ProvidePlugin } = require("webpack")

module.exports = {
    configureWebpack: {
        plugins: [
            new ProvidePlugin({
                _: "lodash",
                vpMake: ["vuex-pathify", "make"],
                vpGet: ["vuex-pathify", "get"],
                vpSync: ["vuex-pathify", "sync"],
                vpCall: ["vuex-pathify", "call"]
            })
        ]
    },
    pluginOptions: {
        electronBuilder: {
            outputDir: "dist",
            builderOptions: {
                productName: "Electron Vue Template",
                appId: "com.citrus.evt",
                win: {
                    icon: "public/icon.png"
                },
                linux: {
                    icon: "public/icon.png"
                },
                mac: {
                    icon: "public/icon.png"
                }
            }
        }
    }
}
