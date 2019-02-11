<template>
    <div class="about">
        <schema></schema>
        <vue></vue>
    </div>
</template>

<script>
    import Schema from '../components/Schema.vue';
    import Vue from '../components/Vue.vue';
    export default {
        name: 'about',
        components: {
            schema:Schema,
            vue:Vue
        }
    }
</script>

<style scoped>
</style>