// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

// 转换 es6 新的API
import 'babel-polyfill';

// 引入 自己写的组件
import './components/componentRegister.js';

// -----------------ElementUI-------------------
// 完整引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 局部引入 首先 安装一个 插件
// import {Menu, Submenu, MenuItem, Tabs, TabPane} from 'element-ui';

// 单独引入
// import DatePicker from '../node_modules/element-ui/packages/date-picker/index';
// import TimePicker from '../node_modules/element-ui/packages/time-picker/index';
// import TimeSelect from '../node_modules/element-ui/packages/time-select/index';


// ------------- 国际化---------------
// import locale from 'element-ui/lib/locale/lang/en';
// Vue.use(ElementUI, {locale});

// import lang from 'element-ui/lib/locale/lang/en'
// import locale from 'element-ui/lib/locale'

// // 设置语言
// locale.use(lang)

// -----------------ElementUI-------------------




// -------------** Echarts  引入--------------
// 全部引入
// const echarts = require('echarts');

// 按需
// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts');

// 漏斗图
require('echarts/lib/chart/funnel');
// 饼图
require('echarts/lib/chart/pie');

require('echarts/lib/chart/line');

// 配置项
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/grid');
require('echarts/lib/component/legend');
require('echarts/lib/component/graphic');

// -------------** Echarts  引入--------------


Vue.use(ElementUI);
// Vue.use(Menu);
// Vue.use(Submenu);
// Vue.use(MenuItem);
// Vue.use(Tabs);
// Vue.use(TabPane);
// Vue.use(DatePicker);
// Vue.use(TimePicker);
// Vue.use(TimeSelect);


Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
});
