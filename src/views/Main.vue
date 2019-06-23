<template lang="pug">

    v-layout.text-xs-center(
        align-center
        justify-center
        fill-height
        row
    )
        v-flex(xs12)
            .display-3 {{ line1 }}
            .display-2 {{ line2 }}

</template>


<script>

    export default {
        computed: {
            ...vp.get("lines", ["line1", "line2"])
        }
    }
    
</script>
