<template>
    <div>
        <div class="title">
            <div class="left">
                <span @click="changTime(0)">今日</span>
                <span @click="changTime(1)">本周</span>
                <span @click="changTime(2)">本月</span>
            </div>
            <el-date-picker
                v-model="timeRange"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                @change="changTimeRange"
                >
            </el-date-picker>
            <!-- value-format="yyyy-MM-dd HH:mm:ss" -->
                <!-- :default-time="['00:00:00', '23:59:59']" -->
                <!-- value-format="timestamp"
                value-format="yyyy-mm-dd hh:mm:ss" -->
        </div>

        <div id="echart" style="width: 600px;height:400px;"></div>
    </div>

</template>

<script>
/**
 * @file   : LineConsume.vue
 * @author : jinqianqian
 * @date   : 2018-5-3 10:16:45
 */

import {getTime, gethalfTime} from '@/common/getTime';
export default {
    name: 'LineConsume',
    data() {
        return {
            timeRange: '',
            num: 0,
            pickerOptions: {
                disabledDate(time) {
                    // - 8.64e7 一天时间
                    return time.getTime() > Date.now();
                }
            }
        };
    },
    mounted() {
        this.changTime(0);
        // this.echartShow();
    },
    methods: {
        changTime(num) {
            this.timeRange = getTime(num);
        },
        changTimeRange(num) {
            console.log(333, this.timeRange[0].getTime);
            console.log(new Date(this.timeRange[0]));
            // this.timeRange = getTime(num);
            let half = gethalfTime(num);
            // console.log(half, num);
        },
        echartShow() {
            let colorArr = [new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    color: '#ff8ea1'
                }, {
                    offset: 1,
                    color: '#ffa3d3'
                }]), new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    color: '#8bf2af'
                }, {
                    offset: 1,
                    color: '#76eede'
                }]), new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    color: '#55fcea'
                }, {
                    offset: 1,
                    color: '#81cbff'
                }])]
            let myChart = this.$echarts.init(document.getElementById('echart'));
            let option = {
                color: colorArr,
                legend: {
                    // orient: 'horizontal'
                    // top: 20,
                    // right: 10,
                    // itemGap: 15,
                    // padding: 10,
                    // itemWidth: 20,
                    // itemHeight: 10,
                    // width: 130,
                    // textStyle: {
                    //     lineHeight: 30,
                    //     padding: 2
                    // },
                    // selectedMode: false,
                    // data: ['2015 降水量', '2016 降水量']
                },
                xAxis: {
                    type: 'category',
                    type: 'time'
                    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    name: '耗时(s)',
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true
                }]
            };
            myChart.setOption(option);
            myChart.resize();
        }
    }
};
</script>

<style lang="sass">
    .left
        float: left;
        line-height: 40px;
        span
            padding: 0 5px
            cursor: pointer
</style>
