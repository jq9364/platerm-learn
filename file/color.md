color: new echarts.graphic.LinearGradient(
        0, 0, 0, 1,
        [
            {offset: 0, color: '#000'},
            {offset: 0.5, color: '#888'},
            {offset: 1, color: '#ddd'}
        ]
    )
1/ 前4个参数用于配置渐变色的起止位置,
    依次对应 右 / 下 / 左 / 上 四个方位
2/ 第5个参数则是一个数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数.          offset的范围是0 ~ 1, 用于表示位置,
    color不用多说肯定是表示颜色了

0 0 0 1 代表从 正上方 向 正下方渐变;
0 1 0 0 代表从 正下方 向 正上方渐变;

0 0 1 1 代表从 左上方 向 右下方渐变
1 0 0 1 代表从 右上方 向 左下方渐变