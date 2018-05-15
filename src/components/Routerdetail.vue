<template>
    <div>
        我是第几个 {{num}}
    </div>
</template>

<script>
/**
 * @file   : Routerdetail.vue
 * @author : jinqianqian
 * @date   : 2018-5-4 16:54:37
 */
export default {
    name: 'Routerdetail',
    data() {
        return {
            num: 0
        }
    },
    created() {
        this.num = this.$route.params.id;
        // console.log(this.$route.params);
    },
    methods: {
    }

}
</script>

<style lang="sass">

</style>
