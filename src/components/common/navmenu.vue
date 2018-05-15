<template>
    <el-menu
        router
        :unique-opened="true"
        :default-active="defaultActive"
        :default-openeds="defaultOpeneds"
        class="el-menu-vertical-demo">
        <!-- <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-menu"></i>Echarts图
            </template>
                <el-menu-item index="/AnnularReg">环形 注册</el-menu-item>
                <el-menu-item index="/funnel">漏斗图 注册</el-menu-item>
                <el-menu-item index="/AnnularSce">环形图 场景</el-menu-item>
                <el-menu-item index="/LineConsume">Line 耗时</el-menu-item>
                <el-menu-item index="/LineHeart">Line 心跳</el-menu-item>
                <el-menu-item index="/Pie">饼图 状态</el-menu-item>
        </el-submenu> -->
        <el-menu-item index="/Echart">
            <template slot="title">
                <i class="el-icon-picture-outline"></i>Echarts图
            </template>
        </el-menu-item>
        <el-menu-item index="/Upload">
            <template slot="title">
                <i class="el-icon-upload"></i>上传
            </template>
        </el-menu-item>
        <el-menu-item index="/dynamicRouter">
            <template slot="title">
                <i class="el-icon-refresh"></i>动态路由
            </template>
        </el-menu-item>
        <el-menu-item index="/other">
            <template slot="title">
                <i class="el-icon-more"></i>其他
            </template>
        </el-menu-item>
        <!-- <el-menu-item index="3">
            <i class="el-icon-setting"></i>导航三
        </el-menu-item> -->
    </el-menu>
</template>

<script>
/**
 * @file   : navmenu.vue
 * @author : jinqianqian
 * @date   : 2018-4-16 15:04:25
 */
export default {
    name: 'navmenu',
    data() {
        return {
            defaultActive: '/Echart',
            defaultOpeneds: ['1']
        };
    },
    methods: {
    }

};
</script>

<style lang="sass">
    .el-menu-vertical-demo
        width: 200px
        // text-align: left
        .el-submenu__title
            font-weight: 500
</style>
