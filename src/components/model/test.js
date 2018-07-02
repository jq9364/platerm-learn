/**
 * @file   : index.js
 * @author : zhangjun36
 * @created: 2017-9-27 17:17:26
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', redirect: {name: 'enterprise'}},
        // {path: '*', redirect: {name: 'enterprise'}},
        {
            path: '/enterprise',
            name: 'enterprise',
            component: () => import('@/views/enterprise/index.vue')
        },
        {

            path: '/recognitionLib',
            component: () => import('@/views/recognitionLib/index.vue'),
            children: [
                {
                    path: 'face',
                    name: 'face',
                    component: () => import('@/views/recognitionLib/_id/face')
                }
            ]
        },
        {
            path: '/scene',
            component: () => import('@/views/scene/index'),
            children: [
                {
                    path: 'info',
                    name: 'sceneInfo',
                    component: () => import('@/views/scene/_id/info')
                },
                {
                    path: 'category',
                    name: 'sceneCategory',
                    component: () =>
                        import('@/views/scene/_id/category')
                },
                {
                    path: 'order/:sceneId/:companyId',
                    name: 'order',
                    component: () =>
                        import('@/views/scene/_id/order')
                },
                {
                    path: 'pass/:sceneId/:companyId',
                    name: 'pass',
                    component: () =>
                        import('@/views/scene/_id/pass')
                },
                {
                    name: 'passRecord',
                    path: 'passRecord/:sceneId/:deviceId',
                    component: () =>
                        import('@/views/scene/_id/passRecord')
                }

            ]
        },
        {
            path: '/equipment',
            component: () => import('@/views/equipment/index'),
            children: [
                {
                    path: 'info',
                    name: 'deviceInfo',
                    component: () => import('@/views/equipment/_id/info')
                },
                {
                    path: 'address',
                    name: 'deviceAddress',
                    component: () =>
                        import('@/views/equipment/_id/address')
                },
                {
                    path: 'category',
                    name: 'deviceCategory',
                    component: () =>
                        import('@/views/equipment/_id/category')
                }
            ]
        },
        {
            path: '/user',
            component: () => import('@/views/user/index'),
            children: [
                {
                    path: 'info',
                    name: 'suerInfo',
                    component: () => import('@/views/user/_id/info')
                },
                {
                    path: 'singleImport',
                    name: 'singleImport',
                    component: () => import('@/views/user/_id/singleImport')
                },
                {
                    path: 'batchImport',
                    name: 'batchImport',
                    component: () => import('@/views/user/_id/batchImport')
                },
                {
                    path: 'importexcel',
                    name: 'importexcel',
                    component: () => import('@/views/user/_id/importExcel')
                },
                {
                    path: 'importUser',
                    name: 'importUser',
                    component: () => import('@/views/user/_id/ImportUser')
                },
                {
                    path: 'inviteSubmit/:requestId?/:num?',
                    name: 'inviteSubmit',
                    component: () => import('@/views/user/_id/inviteUserSubmit')
                },
                {
                    path: 'singleImportSuccess/:account?/:imageUrl?/:userName?',
                    name: 'singleImportSuccess',
                    component: () => import('@/views/user/_id/singleImportSuccess')
                }
            ]
        },
        {
            path: '/jurisdiction',
            component: () => import('@/views/jurisdiction/index'),
            children: [
                {
                    path: 'roleManagement',
                    name: 'roleManagement',
                    component: () => import('@/views/jurisdiction/_id/roleManagement')
                },
                {
                    path: 'roleAssignment',
                    name: 'roleAssignment',
                    component: () =>
                        import('@/views/jurisdiction/_id/roleAssignment')
                }
            ]
        },
        {
            path: '/journal',
            component: () => import('@/views/journal/index'),
            children: [
                {
                    path: 'userIdentification',
                    name: 'userIdentification',
                    component: () => import('@/views/journal/_id/userIdentification')
                }
            ]
        },
        {
            path: '/strategy',
            component: () => import('@/views/strategy/index'),
            children: [
                {
                    path: 'info',
                    name: 'strategyInfo',
                    component: () => import('@/views/strategy/_id/info')
                }
            ]
        },
        {
            path: '/developer',
            component: () => import('@/views/developer/index'),
            children: [
                {
                    path: 'info',
                    name: 'developer',
                    component: () => import('@/views/developer/_id/info')
                }
            ]
        },
        {
            path: '/application',
            component: () => import('@/views/application/index'),
            children: [
                {
                    path: 'general',
                    
                    component: () => import('@/views/application/_id/general')
                }
            ]
        },
        {
            path: '/registry',
            component: () => import('@/views/registry/index'),
            children: [
                {
                    path: 'info',
                    component: () => import('@/views/registry/_id/info')
                }
            ]
        },
        {
            path: '/statistical',
            component: () => import('@/views/statistical/index'),
            children: [
                {
                    path: 'registration',
                    name: 'statisticalreport-registration',
                    component: () =>
                        import('@/views/statistical/_id/registration')
                },
                {
                    path: 'recognition',
                    name: 'recognition',
                    component: () =>
                        import('@/views/statistical/_id/recognition')
                }
            ]
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0};
    }
});

