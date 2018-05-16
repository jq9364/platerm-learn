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
                @change="changTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="{
                    start: '00:00:00',
                    step: '00:30:00',
                    end: '23:59:59'
                }"
                :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
                <!-- value-format="timestamp"
                value-format="yyyy-MM-dd HH:mm:ss" -->
        </div>
        <div class="title">
            <!-- <span class="round"></span> -->
            <span class="round-g"> ● </span>
            <span>所选单位时间内设备心跳异常总数</span>
            <span class="total">{{data.num}}</span>
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
import {getTime} from '@/common/getTime';

export default {
    name: 'LineHeart',
    data() {
        return {
            timeRange: '',
            data: {
                num: 5
            }
        };
    },
    mounted() {
        this.changTime(0);
        this.echartShow();
    },
    methods: {
        changTime(num) {
            this.timeRange = getTime(num);
            console.log(this.timeRange);
        },
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
                series: seriesArr,
                dataZoom: [
                    {
                        show: true,
                        realtime: true,
                        start: 65,
                        end: 85
                    },
                    {
                        type: 'inside',
                        realtime: true,
                        start: 65,
                        end: 85
                    }
                ]
            };
            myChart.setOption(option);
            myChart.resize();

        }
    }

}
</script>

<style lang="sass">
    .round-g
        color: #ff8ea1
    .total
        padding: 5px 8px;
        background: #e6eaf0;
        border-radius: 5px;
        font-size: 20px;
</style>
