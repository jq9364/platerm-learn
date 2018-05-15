/**
 * @file   : index1.js
 * @author : jinqianqian
 * @date   : 2018-4-16 15:06:51
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', redirect: {name: 'AnnularReg'}},
        {
            path: '/Echart',
            name: 'Echart',
            component: () => import('@/views/Echart.vue'),
            redirect: {name: 'AnnularReg'},
            children: [
                {
                    path: 'AnnularReg',
                    name: 'AnnularReg',
                    component: () => import('@/components/echarts/AnnularReg.vue')
                },
                {
                    path: 'Funnel',
                    name: 'Funnel',
                    component: () => import('@/components/echarts/funnel.vue')
                },
                {
                    path: 'AnnularSce',
                    name: 'AnnularSce',
                    component: () => import('@/components/echarts/AnnularSce.vue')
                },
                {
                    path: 'LineConsume',
                    name: 'LineConsume',
                    component: () => import('@/components/echarts/LineConsume.vue')
                },
                {
                    path: 'LineHeart',
                    name: 'LineHeart',
                    component: () => import('@/components/echarts/LineHeart.vue')
                },
                {
                    path: 'Pie',
                    name: 'Pie',
                    component: () => import('@/components/echarts/Pie.vue')
                }
            ]
        },
        {
            path: '/dynamicRouter/:id',
            name: 'routerDetail',
            component: () => import('@/components/Routerdetail.vue')
        },
        {
            path: '/dynamicRouter',
            name: 'dynamicRouter',
            component: () => import('@/views/dynamicRouter.vue')
        },
        {
            path: '/Upload',
            name: 'Upload',
            component: () => import('@/views/Upload.vue')
        }, {
            path: '/other',
            name: 'other',
            component: () => import('@/views/other.vue')
        }
    ],
    scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
        return {x: 0, y: 0};
    }
    // {
    //     path: '/AnnularSce',
    //     name: 'AnnularSce',
    //     component: () => import('@/views/AnnularSce.vue')
    // },
    // {
    //     path: '/LineConsume',
    //     name: 'LineConsume',
    //     component: () => import('@/views/LineConsume.vue')
    // },
    // {
    //     path: '/LineHeart',
    //     name: 'LineHeart',
    //     component: () => import('@/views/LineHeart.vue')
    // },
    // {
    //     path: '/Pie',
    //     name: 'Pie',
    //     component: () => import('@/views/Pie.vue')
    // }
});
