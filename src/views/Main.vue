<template lang="pug">

    v-app
        v-app-bar(
            color="primary"
            app
        )
            v-spacer
            v-btn(
                @click="dark = !dark"
                icon
            )
                v-icon {{ dark ? "nights_stay" : "wb_sunny" }}
        v-content
            v-container.fill-height(fluid)
                v-row
                    v-col.text-center
                        .display-3 Electron Vue
                        .display-2 Template

</template>


<script>

    export default {
        computed: {
            ...vp.sync("settings", ["dark"]),
            settings: vp.get("settings")
        },
        watch: {
            dark(v) {
                this.$vuetify.theme.dark = v
            },
            settings: {
                deep: true,
                async handler(v) {
                    const res = await msgRequest("set-settings", 0, v)
                    if (!res.success) {
                        console.error(res.error)
                    }
                }
            }
        },
        methods: {
            async getSettings() {
                const res = await msgRequest("get-settings")
                if (res.success) {
                    const { dark } = res.result
                    if (!_.isNil(dark)) this.dark = dark
                } else {
                    console.error(res.error)
                }
            }
        },
        async mounted() {
            await this.getSettings()
        }
    }
    
</script>
