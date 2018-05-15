<template>
    <div>
        <div id="payScene"
        style="width: 600px;height:400px;"></div>
    </div>
</template>

<script>
/**
 * @file   : lx.vue
 * @author : jinqianqian
 * @date   : 2018-4-26 20:06:03
 */
export default {
    name: 'lx',
    data() {
        return {
            titleArr0: ['使用人脸支付', '调起摄像头', '通过质量检测', '识别成功', '支付成功', '显示成功界面'],
            tipStringArr0: [
                ['使用人脸支付', '未使用人脸支付'],
                ['调起成功', '调起失败'],
                ['通过', '未通过'],
                ['识别成功', '识别失败'],
                ['支付成功', '支付失败'],
                ['出现成功界面', '未出现成功界面']
            ],
            colorArr: [
                new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                    offset: 0,
                    color: '#7777eb'
                }, {
                    offset: 1,
                    color: '#70ffac'
                }]), '#88f2b5', '#72dcf8', '#7cb7ff', '#a4a7ff', '#e696f4', '#ff8fa2'],
            paySceneData: {
                totalCount: 2000,
                prodActionLists: [
                    {
                        count: 1800,
                        prodAction: '使用人脸支付',
                        percent: 0.9,

                        successCount: 1600,
                        failCount: 200,
                        successPercent: 0.6,
                        failPercent: 0.4
                    }, {
                        count: 1600,
                        prodAction: '通过质量检测',
                        percent: 0.8,

                        successCount: 1500,
                        failCount: 100,
                        successPercent: 0.6,
                        failPercent: 0.4
                    }, {
                        count: 1400,
                        prodAction: '识别成功',
                        percent: 0.7,

                        successCount: 1500,
                        failCount: 100,
                        successPercent: 0.67
                    }

                ]},
            radius: 150,
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
        }
    },
    mounted() {
        this.paySceneShow();
    },
    methods: {
        paySceneShow() {
            let seriesArr = [{
                name: '订单总量',
                type: 'pie',
                clockWise: false,
                center: ['36%', '50%'],
                hoverOffset: 0,
                label: {show: false},
                radius: [this.radius - 10, this.radius],
                data: [
                    {
                        value: this.paySceneData.totalCount,
                        name: '订单总量' + '\n' + this.paySceneData.totalCount
                    }
                ]
            }];
            let tipCompleteArray = [];
            this.paySceneData.prodActionLists.forEach((item, key) => {
                let widthR = this.radius - 20 - (key * 10 * 2);
                let str = this.titleArr0[key] + '\n' + item.successCount + ' (' + item.percent + ')';
                let obj = {
                    name: this.titleArr0[key],
                    type: 'pie',
                    clockWise: false,
                    center: ['36%', '50%'],
                    hoverOffset: 0,
                    label: {show: false},
                    radius: [widthR - 10, widthR],
                    data: [
                        {
                            value: item.successCount,
                            name: str
                        }, {
                            value: this.paySceneData.totalCount - item.successCount,
                            itemStyle: this.placeHolderStyle
                        }

                    ]
                };
                let tipOnearr = [
                    this.tipStringArr0[key][0] + ' (' + item.successPercent + ')',
                    this.tipStringArr0[key][1] + ' (' + item.failPercent + ')'
                ];

                tipCompleteArray.push(tipOnearr);

                seriesArr.push(obj);
            });
            console.log('pay', tipCompleteArray);
            let payChart = this.$echarts.init(document.getElementById('payScene'));
            let option = {
                color: this.colorArr,
                legend: {
                    orient: 'horizontal',
                    top: 20,
                    right: 10,
                    itemGap: 15,
                    padding: 10,
                    itemWidth: 20,
                    itemHeight: 10,
                    width: 130,
                    textStyle: {
                        lineHeight: 30,
                        padding: 2
                    },
                    selectedMode: false
                },
                tooltip: {
                    trigger: 'item',
                    enterable: true,  // 鼠标是否可进入提示框浮层中
                    backgroundColor: '#fff',
                    position: (point, params, dom, rect, size) => {
                        return ['37%', 20 * (params.seriesIndex - 1) + 5];
                    },
                    textStyle: {
                        color: '#000',
                        fontSize: 14,
                        lineHeight: 30
                    },
                    formatter: params => {
                        let index = params.seriesIndex;
                        if (index) {
                            let errorShow = '';
                            if (index === 4) {
                                (this.paySceneData.tipErrorArr || []).forEach(tip => {
                                    errorShow += '<div>' + tip + '</div>';
                                });
                            }
                            let str = index !== 4 ? `<div class="tip-box">
                                        <div class="tip">
                                           ${tipCompleteArray[index - 1][0]}
                                        </div>
                                        <div class="tip">
                                           ${tipCompleteArray[index - 1][1]}
                                        </div>
                                    </div>`
                                    : `<div class="tip-box">
                                        <div class="tip">
                                           ${tipCompleteArray[index - 1][0]}
                                        </div>
                                        <div class="errorTip tip">
                                           ${tipCompleteArray[index - 1][1]}
                                        </div>
                                        <div class="twoLevelTip" v-if=${index === 4}>
                                            ${errorShow}
                                        </div>
                                    </div>`;
                            return str;
                        } else {
                            return '<div class="tip-box">订单总量 '
                                     + this.paySceneData.totalCount + '<div>';
                        }
                    }
                },
                series: seriesArr
            };
            payChart.setOption(option);
        }
    }

}
</script>

<style lang="sass">
    // #payScene
    //     width: 800px
    //     height: 400px
</style>
