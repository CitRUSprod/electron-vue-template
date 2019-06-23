const { ProvidePlugin } = require("webpack")


module.exports = {
    configureWebpack: {
        plugins: [
            new ProvidePlugin({
                _: "lodash",
                vp: "vuex-pathify"
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
