<template>
    <div>
        <div class="block">
            <span class="demonstration">默认 Hover 指示器触发</span>
            <el-carousel height="150px">
                <el-carousel-item v-for="item in 4" :key="item"
                >
                    <h3 @click="toDetail(item)">
                        <router-link
                        :to = "{ name: 'routerDetail', params: { id:item}}"
                        > {{ item }}</router-link>
                    </h3>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
/**
 * @file   : dynamicRouter.vue
 * @author : jinqianqian
 * @date   : 2018-5-4 16:46:11
 */
export default {
    name: 'dynamicRouter',
    data() {
        return {

        }
    },
    methods: {
        toDetail(index) {

            console.log(index, 111);
        }
    }

}
</script>

<style lang="sass">
    .el-carousel
        width: 500px
    .el-carousel__item
        h3
            color: #475669;
            font-size: 14px;
            opacity: 0.75;
            line-height: 150px;
            margin: 0;
            text-align: center


    .el-carousel__item:nth-child(2n)
        background-color: #99a9bf;


    .el-carousel__item:nth-child(2n+1)
        background-color: #d3dce6;

</style>
