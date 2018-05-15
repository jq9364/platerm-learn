<template>
  <div>
      <div id="main" style="width: 800px;height:400px;"></div>
      <div id="main2" style="width: 800px;height:400px;"></div>
      <div id="main3" style="width: 600px;height:400px;"></div>
      <div id="main4" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>

export default {
    name: 'Echart',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            num: 423423
        };
    },
    mounted() {
         // 漏斗图
        // this.funnel();
        // // 断点 图
        // this.duanPie();
        this.muchPie();
        // this.cirle();
        // this.abc();

    },
    methods: {
        funnel() {
            // console.log(this.$echarts);
            let myChart = this.$echarts.init(document.getElementById('main'));
            // // 引入提示框和标题组件
            // 指定图表的配置项和数据
            let option = {
                tooltip: {
                    trigger: 'item',
                    enterable: true,  // 鼠标是否可进入提示框浮层中
                    position: 'right',  // 位置
                    backgroundColor: '#b6b6b6',
                    padding: 20,
                    textStyle: {
                        color:'#000',
                        fontSize: 14,
                        lineHeight: 30
                    },
                    formatter: `<div>{d}</div>
                                <div class="tip">
                                    <span>${this.num}</span>
                                    <div class="twoLevelTip">我们都是好孩子</div>
                                <div>`, // 模板内容
                    // b  value值  c 数值 d百分比
                    alwaysShowContent: true
                },
                title: {
                    text: '漏斗图',
                    subtext: '注册数据统计'
                },
                // 修改图标的颜色
                color: ['#000', '#b6b6b6', '#f10', '#d48265', '#91c7ae', '#749f83'],
                series: [
                    {
                        type:'funnel',
                        width: '80%',  // 宽  px  百分比
                        // height: '10', // 高
                        left: '10%',
                        top: 60,
                        //x2: 80,
                        bottom: 60,
                        minSize: '0%',   // 数据最小值 min 映射的宽度
                        maxSize: '100%',  // 数据最小值 min 映射的宽度
                        sort: 'descending',  // 排列顺序 descending
                                            // 从小到大 ascending 倒序  none  data 顺序
                        gap: 2,   // 数据图形间距
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            },
                            emphasis: {
                                textStyle: {
                                    fontSize: 20
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                length: 10,
                                lineStyle: {
                                    width: 1,
                                    type: 'solid'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        },
                        data: [
                            {value: 60, name: '访问432'},
                            {value: 40, name: '咨询423'},
                            {value: 20, name: '订单423'},
                            {value: 80, name: '点击423'},
                            {value: 100, name: '展现423'}
                        ]
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        duanPie() {
            let myChart2 = this.$echarts.init(document.getElementById('main2'));
            let scaleData = [{
                'name': '工程建设',
                'value': 10
                },
                {
                    'name': '产权交易',
                    'value': 20
                },
                {
                    'name': '土地交易',
                    'value': 20
                },
                {
                    'name': '其他交易',
                    'value': 27
                },
                {
                    'name': '政府采购',
                    'value': 23
                }
            ];
            let rich = {
                white: {
                    color: '#ddd',
                    align: 'center',
                    padding: [5, 0]
                }
            };
            let placeHolderStyle = {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    color: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 0
                }
            };
            let data = [];
            for (let i = 0; i < scaleData.length; i++) {
                data.push({
                    value: scaleData[i].value,
                    name: scaleData[i].name,
                    itemStyle: {
                        normal: {
                            borderWidth: 5,
                            shadowBlur: 30,
                            // borderColor: new myChart2.graphic.LinearGradient(0, 0, 1, 1, [{
                            //     offset: 0,
                            //     color: '#7777eb'
                            // }, {
                            //     offset: 1,
                            //     color: '#70ffac'
                            // }]),
                            shadowColor: 'rgba(142, 152, 241, 0.6)'
                        }
                    }
                }, {
                    value: 4,
                    name: '',
                    itemStyle: placeHolderStyle
                });
            }
            let seriesObj = [{
                name: '',
                type: 'pie',
                clockWise: false,
                radius: [195, 200],
                hoverAnimation: false,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'outside',
                            color: '#ddd',
                            formatter: params => {
                                let percent = 0;
                                let total = 0;
                                for (let i = 0; i < scaleData.length; i++) {
                                    total += scaleData[i].value;
                                }
                                percent = ((params.value / total) * 100).toFixed(0);
                                if (params.name !== '') {
                                    return params.name + '\n{white|' + '占比' + percent + '%}';
                                } else {
                                    return '';
                                }
                            },
                            rich: rich
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                data: data
            }];
            let option = {
                backgroundColor: '#04243E',
                tooltip: {
                    show: false
                },
                legend: {
                    show: false
                },
                toolbox: {
                    show: false
                },
                series: seriesObj
            };
            myChart2.setOption(option);
        },
        muchPie() {
            let data = {
                totalCount: '20000'
            };
            let dataStyle = {
                normal: {
                    label: {show:false},
                    labelLine: {show:false}
                }
            };
            let placeHolderStyle = {
                normal : {
                    color: 'rgba(0,0,0,0)',
                    label: {show:false},
                    labelLine: {show:false}
                },
                emphasis : {
                    color: 'rgba(0,0,0,0)'
                }
            };
            // let seriesArray = [{
            //     name: '订单总量',
            //     type: 'pie',
            //     clockWise: false, // 是否是顺时针 默认
            //     radius: [190, 200],  // 内圈半径和外圈半径  ['70%', '75%']
            //     // hoverOffset: 30,   // 高亮扇区的偏移距离
            //     // legendHoverLink: false, // 高亮
            //     hoverAnimation: false,  // 是否开启 hover 在扇区上的放大动画效果。
            //     position: 'outside',
            //     startAngle: 0,
            //     // label: {
            //     //     show: true,
            //     //     position: 'outside',
            //     //     formatter: `{a}: {b}: {c} {d}`,
            //     //     // a  订单总量name   b  ser Nmae
            //     //     // c   value 值    d占的百分比
            //     //     align: 'left',
            //     //     width: '200px'
            //     // },
            //     // labelLine: {
            //     //     show: true
            //     // },
            //     data: [{
            //         value: 95147,
            //         name: '01'
            //     }]
            // }, {
            //     name: '使用人脸支付',
            //     type: 'pie',
            //     clockWise: false,
            //     radius: [170, 180],
            //     hoverAnimation: false,
            //     data: [{
            //             value: 150,
            //             name: '我们都是'
            //         },
            //         {
            //             value: 60,
            //             name: 'invisible'
            //         }
            //     ]
            // }, {
            //     name: '通过质量检测',
            //     type: 'pie',
            //     clockWise: false,
            //     radius: [150, 160],
            //     hoverAnimation: false,
            //     data: [{
            //             value: 150,
            //             name: '我们都是'
            //         },
            //         {
            //             value: 0,
            //             name: 'invisible'
            //         }
            //     ]
            // }];
            let seriesArray = [{
                name:'1',
                type:'pie',
                clockWise:false,
                radius : [125, 150],
                itemStyle : dataStyle,
                data:[
                    {
                        value:68,
                        name:'68%的人表示过的不错'
                    },
                    {
                        value:0,
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ]
            },
            {
                name:'2',
                type:'pie',
                clockWise:false,
                radius : [100, 125],
                itemStyle : dataStyle,
                data:[
                    {
                        value:29,
                        name:'29%的人表示生活压力很大'
                    },
                    {
                        value:10,
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ]
            }];
            let myChart3 = this.$echarts.init(document.getElementById('main'));
            let option = {
                backgroundColor: '#b6b6b6',
                series: seriesArray,
                legend: {
                    orient: 'vertical',
                    x: document.getElementById('main').offsetWidth / 2,
                    y: 45,
                    itemGap: 12,
                    data: ['我们都是', '29', '23']
                }
            };

            myChart3.setOption(option);
        },
        cirle() {
            let color = ['#fb734e', '#e32f46', '#94d96c', '#0bbcb7', '#1a9bfc', '#7049f0'];
            let dataStyle = {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    shadowBlur: 40,
                    borderWidth: 10,
                    shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                }
            };
            let placeHolderStyle = {
                normal: {
                    color: '#393d50',
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                },
                emphasis: {
                    color: '#393d50'
                }
            };
            let option = {
                backgroundColor: '#142058',
                title: {
                    text: '匹配度',
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 24,
                        color: '#fff',
                    }
                },
                tooltip: {
                    trigger: 'item',
                    show: true,
                    formatter: '{b} : <br/>{d}%',
                    backgroundColor: 'rgba(0,0,0,0.7)', // 背景
                    padding: [8, 10], //内边距
                    extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
                },
                legend: {
                    orient: 'vertical',
                    // icon: 'circle',
                    left: 'left',
                    top: '20',
                    itemGap: 20,
                    data: ['二级匹配度', '三级匹配度', '四级匹配度', '04', '05', '06'],
                    textStyle: {
                        color: '#fft'
                    }
                },
                series: [{
                        name: 'Line 1',
                        type: 'pie',
                        clockWise: false,
                        radius: [186, 200],
                        center: ['50%', '50%'],
                        itemStyle: dataStyle,
                        hoverAnimation: false,
                        startAngle: 90,
                        label: {
                            borderRadius: '10',
                        },
                        data: [{
                                value: 54.6,
                                name: '四级匹配度',
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: color[0]
                                        }, {
                                            offset: 1,
                                            color: color[1]
                                        }])
                                    }
                                }
                            },
                            {
                                value: 45.4,
                                name: '',
                                tooltip: {
                                    show: false
                                },
                                itemStyle: placeHolderStyle
                            },
                        ]
                    },
                    {
                        name: 'Line 2',
                        type: 'pie',
                        clockWise: false,
                        radius: [146, 160],
                        center: ['50%', '50%'],
                        itemStyle: dataStyle,
                        hoverAnimation: false,
                        startAngle: 90,
                        data: [{
                                value: 56.7,
                                name: '三级匹配度',
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: color[2]
                                        }, {
                                            offset: 1,
                                            color: color[3]
                                        }])
                                    }
                                }
                            },
                            {
                                value: 43.3,
                                name: '',
                                tooltip: {
                                    show: false
                                },
                                itemStyle: placeHolderStyle
                            },
                        ]
                    },
                    {
                        name: 'Line 3',
                        type: 'pie',
                        clockWise: false,
                        radius: [106, 120],
                        center: ['50%', '50%'],
                        itemStyle: dataStyle,
                        hoverAnimation: false,
                        startAngle: 90,
                        data: [{
                                value: 30,
                                name: '二级匹配度',
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: color[4]
                                        }, {
                                            offset: 1,
                                            color: color[5]
                                        }]),
                                    }
                                }
                            },
                            {
                                value: 0,
                                name: '',
                                tooltip: {
                                    show: false
                                },
                                itemStyle: placeHolderStyle
                            },
                        ]
                    }
                ]
            };
        },
        abc() {
            let myChart3 = this.$echarts.init(document.getElementById('main2'));
            let strArr = ['直达', '营销广告' + '\n' + 742398472983, '搜索引擎'];
            let option = {
                backgroundColor: '#bb6b',
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    top: 20,
                    right: 0,
                    itemGap: 15,
                    padding: 10,
                    itemWidth: 20,
                    itemHeight: 10,
                    // formatter: "",
                    data: strArr
                },
                grid: {
                    show: true,
                    borderWidth: 1,
                    left: '20px'
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '30%'],

                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'直达', selected:true},
                            {value:679, name:'营销广告' + '\n' + 742398472983},
                            {value:1548, name:'搜索引擎'}
                        ]
                    },
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['40%', '55%'],
                        label: {
                            normal: {
                                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                backgroundColor: '#eee',
                                borderColor: '#aaa',
                                borderWidth: 1,
                                borderRadius: 4,
                                // shadowBlur:3,
                                // shadowOffsetX: 2,
                                // shadowOffsetY: 2,
                                // shadowColor: '#999',
                                // padding: [0, 7],
                                rich: {
                                    a: {
                                        color: '#999',
                                        lineHeight: 22,
                                        align: 'center'
                                    },
                                    // abg: {
                                    //     backgroundColor: '#333',
                                    //     width: '100%',
                                    //     align: 'right',
                                    //     height: 22,
                                    //     borderRadius: [4, 4, 0, 0]
                                    // },
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 16,
                                        lineHeight: 33
                                    },
                                    per: {
                                        color: '#eee',
                                        backgroundColor: '#334455',
                                        padding: [2, 4],
                                        borderRadius: 2
                                    }
                                }
                            }
                        },
                        data:[
                            {value:335, name:'直达'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1048, name:'百度'},
                            {value:251, name:'谷歌'},
                            {value:147, name:'必应'},
                            {value:102, name:'其他'}
                        ]
                    }
                ]
            };
            myChart3.setOption(option);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
    .tip
        position: relative

    .twoLevelTip
        position: absolute
        left: 30px
        display: none

    .tip:hover
        .twoLevelTip
            display: block


</style>
