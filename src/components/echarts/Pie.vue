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
 * @file   : Pie.vue
 * @author : jinqianqian
 * @date   : 2018-5-3 10:18:03
 */
export default {
    name: 'Pie',
    data() {
        return {
            timeShow: '04-18 9:00',
            data: [{
                name: '工作',
                value: 65,
                pertent: '65%'
            }, {
                name: '休息',
                value: 35,
                pertent: '35%'
            }],
            placeHolderStyle: {
                normal: {
                    color: 'rgba(0,0,0,0)',
                    label: {show: false},
                    labelLine: {show: false}
                },
                emphasis: {
                    color: 'rgba(0,0,0,0)'
                }
            }
        };
    },
    mounted() {
        this.echartShow();
    },
    methods: {
        echartShow() {
            let colorArr = [new this.$echarts.graphic.LinearGradient(1, 0, 0, 1, [{
                    offset: 0,
                    color: '#8bf2af'
                }, {
                    offset: 1,
                    color: '#76eede'
                }]), new this.$echarts.graphic.LinearGradient(1, 0, 0, 1, [{
                    offset: 0,
                    color: '#ff8ea1'
                }, {
                    offset: 1,
                    color: '#ffa3d3'
                }])];
            let myChart = this.$echarts.init(document.getElementById('echart'));
            let seriesArr = [{
                    name: '工作状态',
                    type: 'pie',
                    radius: [0, 100],
                    startAngle: 350,
                    hoverAnimation: false,
                    labelLine: {
                        length: 30,
                        // length2: 70,
                        lineStyle: {
                            color: '#b6b6b6'
                        }
                    },
                    data: [{
                            value: this.data[0].value,
                            name: this.data[0].name + this.data[0].pertent,
                            label: {
                                show: true,
                                formatter: '{round|● }' + '{b}',
                                rich: {
                                    round: {
                                        color: '#8bf2af'
                                    }
                                }
                            }
                        }, {
                            value: this.data[1].value,
                            name: this.data[1].name + this.data[1].pertent,
                            selected: true,
                            label: {
                                show: true,
                                formatter: '{round|● }' + '{b}',
                                rich: {
                                    round: {
                                        color: '#ff8ea1'
                                    }
                                }
                            }
                        }
                    ]
                }
            ];
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
    .title
        span
            display: inline-block
            vertical-align: middle;
        .round
            width: 8px
            height: 8px
            background: #ff8ea1
            border-radius: 50%
            display: inline-block
            margin: 0px 5px 5.5px 0;
            vertical-align: middle;
        .ref-round
            color: #8bf2af
</style>
