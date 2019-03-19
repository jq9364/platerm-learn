<template>
    <div>
        树形结构
        <el-tree
            :props="props"
            :load="loadNode"
            lazy
            show-checkbox
            @check-change="handleCheckChange">
        </el-tree>
    </div>
</template>

<script>
/**
 * @file   : elementTree.vue
 * @author : jinqianqian
 * @date   : 11/23/2018, 12:32:27 AM
 */
export default {
    name: 'elementTree',
    data() {
        return {

        }
    },
    methods: {
    }

}
</script>

<style lang="sass" scoped>

</style>
