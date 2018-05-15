<template>
    <div>
        <el-tabs v-model="indexNum" @tab-click="handleClick">
            <el-tab-pane label="环图/注册" name="AnnularReg">
            </el-tab-pane>
            <el-tab-pane label="漏斗图/注册" name="Funnel">
            </el-tab-pane>
            <el-tab-pane label="环形图/场景" name="AnnularSce">
            </el-tab-pane>
            <el-tab-pane label="Line/耗时" name="LineConsume">
            </el-tab-pane>
            <el-tab-pane label="Line/心跳" name="LineHeart">
            </el-tab-pane>
            <el-tab-pane label="饼图/状态" name="Pie">
            </el-tab-pane>
            <router-view></router-view>
        </el-tabs>
    </div>
</template>

<script>
/**
 * @file   : Echart.vue
 * @author : jinqianqian
 * @date   : 2018-5-3 10:56:02
 */

export default {
    name: 'Echart',
    data() {
        return {
            indexNum: 'AnnularReg'
        }
    },
    methods: {
        handleClick(tab) {
            let name = tab.name;
            this.$router.push({name: name});
        }
    }

}
</script>

<style lang="sass">
    .wraper
        padding-left: 30px
        .el-tabs__content
            height: 400px
</style>
