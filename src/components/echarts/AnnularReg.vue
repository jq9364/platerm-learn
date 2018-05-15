<template>
    <div>
        <div id="echart"></div>
    </div>
</template>

<script>
/**
 * @file   : Annular.vue
 * @author : jinqianqian
 * @date   : 2018-5-2 17:56:58
 */
export default {
    name: 'Annular',
    data() {
        return {
            regData: [{
                    name: '注册中  ' + '      ',
                    value: 76,
                    percent: 30
                },
                {
                    name: '成功  ' + '         ',
                    value: 56,
                    percent: 20
                },
                {
                    name: '失败  ' + '         ',
                    value: 40,
                    percent: 35
                },
                {
                    name: '总注销  ' + '      ',
                    value: 20,
                    percent: 22
                },
                {
                    name: '失败后注销',
                    value: 5,
                    percent: 10
                }
            ],
            colorArr: [new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                    offset: 0,
                    color: '#407cff'
                }, {
                    offset: 1,
                    color: '#4af4ff'
                }]), new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                    offset: 0,
                    color: '#2cf592'
                }, {
                    offset: 1,
                    color: '#2cf592'
                }]), new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                    offset: 0,
                    color: '#ff5e89'
                }, {
                    offset: 1,
                    color: '#ff8e8a'
                }]), '#fff17c', '#ffb868'],
            placeHolderStyle: {
                label: {show: false},
                labelLine: {show: false},
                color: 'rgba(0, 0, 0, 0)',
                opacity: 0
            },
            radius: []
        }
    },
    mounted() {
        this.showImage();
        window.onresize = () => {
            let Echart = this.$echarts.init(document.getElementById('echart'));
            Echart.resize();
        };
    },
    methods: {
        showImage() {
            let data = [];
            let LastLength = this.regData.length;
            for (let i = 0; i < LastLength - 2; i++) {
                data.push({
                    value: 2,
                    name: '',
                    itemStyle: this.placeHolderStyle
                }, {
                    value: this.regData[i].value,
                    name: this.regData[i].name + this.regData[i].value
                            + '台 ' + '{a|⇧20%}',
                    itemStyle: {
                        color: this.colorArr[i]
                    }
                });
            }
            data.push({
                    value: 0,
                    name: '',
                    itemStyle: this.placeHolderStyle
                }, {
                    value: this.regData[LastLength - 2].value,
                    name: this.regData[LastLength - 2].name + this.regData[LastLength - 2].value
                        + '台 ' + '{a|⇧20%}',
                    itemStyle: {
                        color: this.colorArr[LastLength - 2]
                    }
                });
            let seriesObj = [{
                name: '',
                type: 'pie',
                clockWise: true,  // 是否顺时针排布
                // legendHoverLink: true,
                radius: [120, 135],
                center: ['36%', '50%'],
                label: {show: false},
                hoverOffset: 8,
                zlevel: 2,
                data: data
            }, {
                name: '',
                type: 'pie',
                clockWise: false,  // 是否顺时针排布
                radius: [120, 155],
                center: ['36%', '50%'],
                label: {show: false},
                hoverAnimation: false,
                legendHoverLink: false,
                // hoverOffset: 8,
                // 高亮样式
                emphasis: {
                    itemStyle: {
                        borderWidht: 5
                    }
                },
                data: [{
                        value: 0,
                        name: '',
                        itemStyle: this.placeHolderStyle
                    }, {
                        value: 4,
                        name: '失败后注销  5 台 20%',
                        // selected: true,
                        itemStyle: {
                            color: 'rgba(192, 215, 67, 0.4)'
                        }
                    }, {
                        value: 96,
                        name: '',
                        itemStyle: this.placeHolderStyle
                    }]
            }];
            let Echart = this.$echarts.init(document.getElementById('echart'));
            let option = {
                backgroundColor: '#f8f3f3',
                legend: {
                    orient: 'horizontal',
                    top: 20,
                    right: 10,
                    padding: 10,
                    itemWidth: 20,
                    itemHeight: 10,
                    width: 130,
                    textStyle: {
                        lineHeight: 30,
                        padding: 2,
                        fontSize: 20,
                        rich: {
                            a: {
                                color: 'red',
                                lineHeight: 10
                            },
                            b: {
                                backgroundColor: {
                                    image: 'xxx/xxx.jpg'
                                },
                                height: 40
                            },
                            x: {
                                fontSize: 18,
                                fontFamily: 'Microsoft YaHei',
                                borderColor: '#449933',
                                borderRadius: 4
                            }
                        }
                    },
                    selectedMode: false
                    // formatter: name =>{
                    //     console.log(name);
                    //     let str = '↑' + '⇧';
                    //     // return '{a|这段文本采用样式a}';
                    // }
                    // ,
                    // formatter: [
                    //     '{a|这段文本采用样式a}',
                    //     '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
                    // ]
                    // data: lenData
                },
                title: {
                    text: '546',
                    left: '35%',
                    top: '40%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: 'bold',
                        fontSize: 40
                    },
                    subtext: '今日人脸注册',
                    subtextStyle: {
                        fontWeight: 'normal',
                        fontSize: 24
                    }
                },
                series: seriesObj
            };
            Echart.setOption(option);
            // Echart.resize();
            // Echart.on('mouseover', params => {
            //     let index = params.seriesIndex;
            //     lenData[index].textStyle = {
            //         color: this.colorArr[index],
            //         fontSize: 14
            //     };
            // });
        },
        other() {
        }
    }

}
</script>

<style lang="sass">
    .wraper
        width: 70%;
    #echart
        width: 100%
        height: 400px
</style>
