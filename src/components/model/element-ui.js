/**
 * @file   : sceneConsue.js
 * @author : zhulei
 * @date   : 2018-6-25 16:51:37
 */
import * as types from '../mutation-types';
import sceneConsue from 'api/sceneConsue';
import {getButTime} from 'commons/getTime';

const state = {
    pay: {
        info: [],
        avage: [], // 平均耗时
        top: [], // top
        X: [], // x轴
        complete: true,
        time: getButTime(0),
        cur: 0,
        type: 7,
        List: [{
            id: 7,
            name: '工卡人脸支付'
        }],
        name: '人脸支付'
    },
    pass: {
        info: [],
        avage: [], // 平均耗时
        top: [], // top
        X: [], // x轴
        complete: true,
        time: getButTime(0),
        cur: 0,
        type: 2,
        List: [{
            id: 2,
            name: '人脸闸机'
        }],
        name: '通行'
    }
};

const getters = {
    pay: state => state.pay,
    pass: state => state.pass
};

const actions = {
    async getSceneConsue({commit}, {sceneId, startTime, endTime, type}) {
        let info = await sceneConsue.getKeyItemData({sceneId, startTime, endTime});
        commit('SET_SCENE_INFO', {info, type});
    },
    async aveTimeCost({commit}, params) {
        try {
            return Promise.resolve(await sceneConsue.aveTimeCost(params));
        } catch (e) {
            return Promise.reject(e);
        }
    },
    async payTimeCost({commit}, params) {
        try {
            return Promise.resolve(await sceneConsue.payTimeCost(params));
        } catch (e) {
            return Promise.reject(e);
        }
    },
    async passTimeCost({commit}, params) {
        try {
            return Promise.resolve(await sceneConsue.passTimeCost(params));
        } catch (e) {
            return Promise.reject(e);
        }
    },
    viewRender({commit, dispatch}, {sceneId, count, startTime, endTime, type}) {
        if (type) {
            return Promise.all([
                dispatch('aveTimeCost', {sceneId, startTime, endTime}),
                dispatch('passTimeCost', {sceneId, startTime, endTime, count})
            ]).then(result => {
                let {X = [], list = []} = result[0];
                if (X.length || list.length || result[1].length) {
                    commit('SET_AVETIME_COST', {X, list, type});
                    commit('SET_PSSTIME_COST', result[1]);
                    commit('SET_COMPLETE', {type, status: true});
                } else {
                    commit('SET_COMPLETE', {type, status: false});
                }
            }).catch(e => {
                return Promise.reject(e);
            });
        } else {
            return Promise.all([
                dispatch('aveTimeCost', {sceneId, startTime, endTime}),
                dispatch('payTimeCost', {sceneId, startTime, endTime, count}),
            ]).then(result => {
                let {X = [], list = []} = result[0];
                if (X.length || list.length || result[1].length) {
                    commit('SET_AVETIME_COST', {X, list, type});
                    commit('SET_PAYTIME_COST', result[1]);
                    commit('SET_COMPLETE', {type, status: true});
                } else {
                    commit('SET_COMPLETE', {type, status: false});
                }
            }).catch(e => {
                return Promise.reject(e);
            });
        }
    }
};

const mutations = {
    [types.SET_SCENE_INFO](state, {info, type}) {
        if (type) {
            state.pass.info = info;
        } else {
            state.pay.info = info;
        }
    },
    [types.SET_AVETIME_COST](state, {X, list, type}) {
        if (type) {
            state.pass.avage = list;
            state.pass.X = X;
        } else {
            state.pay.avage = list;
            state.pay.X = X;
        }
    },
    [types.SET_PAYTIME_COST](state, top) {
        state.pay.top = top;
    },
    [types.SET_PSSTIME_COST](state, top) {
        state.pass.top = top;
    },
    [types.SET_COMPLETE](state, {status, type}) {
        if (type) {
            state.pass.complete = status;
        } else {
            state.pay.complete = status;
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
if (this.paySceneList.lenght) {
    this.sceneList = Object.assign([], this.passSceneList);
    this.sceneId = (this.sceneList[0] || {}).id;
} else {
    this.$store.dispatch('getPaySceneList', {
        companyId: this.adminUserInfo.companyId
    }).then(() => {
        this.sceneList = Object.assign([], this.passSceneList);
        this.sceneId = (this.sceneList[0] || {}).id;
    });
}

if (!this.passSceneList.lenght) {
    this.$store.dispatch('getPassSceneList', {
        companyId: this.adminUserInfo.companyId
    });
}
