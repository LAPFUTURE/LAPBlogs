<template>
    <div>
        {{this.$route.params.blogId}}
        {{ this.$route.params.blogType }}
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'detail',
    components: {
    },


}
</script>
    