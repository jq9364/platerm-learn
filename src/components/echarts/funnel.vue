<template>
    <div>
       <div id="echart" style="width: 500px;height:400px;"></div>
    </div>
</template>

<script>
/**
 * @file   : funnel.vue
 * @author : jinqianqian
 * @date   : 2018-5-3 10:13:45
 */
export default {
    name: 'funnel',
    data() {
        return {
            // colorArr: ['#88f2b5', '#72dcf8', '#7cb7ff', '#e696f4', '#ff8fa2'],
            colorArr: [new this.$echarts.graphic.LinearGradient(1, 0, 0, 1, [{
                    offset: 0,
                    color: '#8bf2af'
                }, {
                    offset: 1,
                    color: '#76eede'
                }]), new this.$echarts.graphic.LinearGradient(1, 0, 0, 1, [{
                    offset: 0,
                    color: '#73d9ff'
                }, {
                    offset: 1,
                    color: '#81a8ff'
                }]), new this.$echarts.graphic.LinearGradient(1, 0, 0, 1, [{
                    offset: 0,
                    color: '#ac99ff'
                }, {
                    offset: 1,
                    color: '#c689ff'
                }]), new this.$echarts.graphic.LinearGradient(1, 0, 0, 1, [{
                    offset: 0,
                    color: '#ff8ea1'
                }, {
                    offset: 1,
                    color: '#ffa3d3'
                }])
            ],
            tipStringArr: [
                ['通过', '未通过'],
                ['通过', '未通过'],
                ['录入', '识别失败'],
                ['开通', '未开通']
            ],
            data: [{
                    name: '扫码二维码',
                    value: 9500,
                    percent: '95%',
                    successPercent: 0.95,
                    failPercent: 0.4
                }, {
                    name: '手机号验证',
                    value: 7000,
                    percent: '70%',
                    successPercent: 0.6,
                    failPercent: 0.4
                }, {
                    name: '人脸录入',
                    value: 5000,
                    percent: '50%',
                    successPercent: 0.6,
                    failPercent: 0.4
                }, {
                    name: '开通支付方式',
                    value: 3000,
                    percent: '30%',
                    successPercent: 0.6,
                    failPercent: 0.4
                }]
        };
    },
    mounted() {
        this.funnel();
    },
    methods: {
        funnel() {
            let myChart = this.$echarts.init(document.getElementById('echart'));
            let relData = [];
            this.data.forEach((item, index) => {
                let obj = {
                    name: item.name,
                    value: item.value
                };
                relData.push(obj);
            });
            let seriesObj = [{
                type: 'funnel',
                gap: 2,
                minSize: '40%',
                label: {
                    show: true,
                    position: 'inside',
                    color: '#000',
                    lineHeight: 30,
                    fontSize: 14,
                    formatter: params => {
                        let index = params.dataIndex;
                        let str = this.data[index].name
                                + '\n' + this.data[index].value
                                + ' ' + this.data[index].percent;
                        return str;
                    }
                },
                data: relData
            }];
            let option = {
                color: this.colorArr,
                trigger: 'none',
                tooltip: {
                    position: 'right',  // 位置
                    backgroundColor: '#407cff',
                    padding: [10, 15],
                    textStyle: {
                        color: '#fff',
                        fontSize: 12,
                        lineHeight: 30
                    },
                    enterable: true,
                    formatter: params => {
                        let index = params.dataIndex;
                        let str = `<div class="tip-box">
                            <div>${this.tipStringArr[index][0] + this.data[index].successPercent}</div>
                            <div>${this.tipStringArr[index][1] + this.data[index].failPercent}</div>
                        </div>`;
                            // <i></i>
                        return str;
                    }
                },
                series: seriesObj
            };
            myChart.setOption(option);
        }
    }

}
</script>

<style lang="sass">
#echart
    >div:nth-child(2)
        margin-left: 5px
    .tip-box
        i
            position: absolute
            display: block
            width: 8px
            height: 8px
            background: #407cff
            border: 2px solid #fff
            border-radius: 50%
            left: -30px
            top: 23px
        &::before
            width: 0
            height: 0
            content: ''
            display: block
            position: absolute
            border: 5px solid  transparent
            border-right-color:  #407cff
            left: -10px
            top: 23px
</style>
