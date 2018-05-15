<template>
    <div>
        <div class="title">
            <!-- <span class="round"></span> -->
            <span class="ref-round"> ● </span>
            <span>{{timeShow}} 设备工作状态</span>
        </div>
        <div id="echart" style="width: 600px;height:400px;"></div>
    </div>
</template>

<script>
/**
 * @file   : LineHeart.vue
 * @author : jinqianqian
 * @date   : 2018-5-3 10:15:39
 */

export default {
    name: 'LineHeart',
    data() {
        return {

        };
    },
    mounted() {
        this.echartShow();
    },
    methods: {
        echartShow() {
            let colorArr = [new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#ff8ea1'
                }, {
                    offset: 1,
                    color: '#ffa3d3'
                }])];
            let myChart = this.$echarts.init(document.getElementById('echart'));
            let seriesArr = [];
            let option = {
                color: colorArr,
                series: seriesArr
            };
            myChart.setOption(option);
            myChart.resize();

        }
    }

}
</script>

<style lang="sass">

</style>
