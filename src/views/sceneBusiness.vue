<template>
    <div id="sceneBusiness">
        <div class="block-head">
            <span class="first-word">场景业务统计</span>
        </div>
        <div class="clear sceneBusBox">
            <div class="l-box">
                <div>
                    <span class="scene-label">人脸支付</span>
                    <el-select v-model="paySceneId" placeholder="全部"
                        @change="sceneChange">
                        <el-option
                            v-for="item in paySceneList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <!-- <span class="operation" click="payDetail">查看详情</span> -->
                </div>
                <div class="sceneTime">
                    <span :class="isAct1[0] ? 'active' : ''" @click="changClickTime(0, 0)">今日</span>
                    <span :class="isAct1[1] ? 'active' : ''" @click="changClickTime(0, 1)">本周</span>
                    <span :class="isAct1[2] ? 'active' : ''" @click="changClickTime(0, 2)">本月</span>
                    <el-date-picker
                        v-model="timeRange"
                        type="datetimerange"
                        @change = "changeTime"
                        placeholder="选择时间范围">
                    </el-date-picker>
                </div>
                <div id="payScene"></div>

            </div>
            <div class="r-box">
                <div>
                    <span class="scene-label">通行</span>
                    <el-select v-model="passSceneId" placeholder="全部"
                        @change="sceneChange">
                        <el-option
                            v-for="item in passSceneList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <!-- <span cslass="operation" click="currentDetail">查看详情</span> -->
                </div>
                <div class="sceneTime">
                    <span :class="isAct2[0] ? 'active' : ''" @click="changClickTime(1, 0)">今日</span>
                    <span :class="isAct2[1] ? 'active' : ''" @click="changClickTime(1, 1)">本周</span>
                    <span :class="isAct2[2] ? 'active' : ''" @click="changClickTime(1, 2)">本月</span>
                    <el-date-picker
                        v-model="timeRange"
                        type="datetimerange"
                        @change = "changeTime(1)"
                        placeholder="选择时间范围">
                    </el-date-picker>
                </div>
                <div id="payScene"></div>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * @file   : sregisterData.vue
 * @author : jinqianqian
 * @date   : 2018-4-16 16:46:15
 */

import {mapGetters} from 'vuex';

export default {
    name: 'sregisterData',
    data() {
        return {
            dayData: 3,
            weekData: 6,
            mounthData: 50,
            warnSwitch: false,
            isAct1: false,
            isAct2: false,
            paySceneId: '',
            passSceneId: '',
            timeRange: '',
            passSceneData: {},
            paySceneData: {},
            paySceneList: [{
                id: 1,
                name: '工卡人脸支付'
            }, {
                id: 2,
                name: 'facy人脸支付'
            }],
            passSceneList: [{
                id: 1,
                name: '闸机'
            }]
        };
    },
    computed: {
        ...mapGetters([
            'adminUserInfo'
        ])
    },
    created() {
        this.paySceneId = 1;
        this.passSceneId = 1;
        // this.getSceneList();
        // this.paySceneData =
        //     JSON.parse(JSON.stringify());
        // this.passSceneData = JSON.parse(JSON.stringify(this.getSceneData()));
    },
    methods: {
        sceneChange() {

        },
        changClickTime(type, num) {
            let startTime;
            let endTime;
            switch (num) {
                case 0:
                    startTime = '';
                    endTime = '';
                    break;
                case 1:
                    startTime = '';
                    endTime = '';
                    break;
                case 2:
                    startTime = '';
                    endTime = '';
                    break;
            }
            if (type) {
                // this.paySceneData = this.getSceneData(this.paySceneId, startTime, endTime);
            } else {
                // this.passSceneData = this.getSceneData(this.passSceneId, startTime, endTime);
            }
        },
        getSceneData(type, sceneId, startTime, endTime) {
            let data;
            this.$store.dispatch('getProductFilter', {
                companyId: this.adminUserInfo.companyId,
                sceneId: sceneId,
                startTime: startTime,
                endTime: endTime
            }).then(response => {
                data = Object.assign(response);
            });
            return data;
        },
        changeTime(val) {
            console.log(val);
            let timeArr = val.split(' - ');
            this.startTime = timeArr[0];
            this.endTime = timeArr[1];
            // this.updateList();
        },
        checkDetail() {
            this.warnSwitch = !this.warnSwitch;
        },
        getSceneList() {
            this.$store.dispatch('getPaySceneList', {
                companyId: this.adminUserInfo.companyId
            }).then(response => {
                this.paySceneList = Object.assign(response);
                this.paySceneId = this.paySceneList[0] ? this.paySceneList[0].id : '';
                this.getSceneData(0, this.paySceneId, '2018-04-24 00:00:00', '2018-04-25 00:00:00');

            });
            this.$store.dispatch('getPossSceneList', {
                companyId: this.adminUserInfo.companyId
            }).then(response => {
                this.passSceneList = Object.assign(response);
                this.passSceneId = this.passSceneList[0] ? this.passSceneList[0].id : '';
            });
        }

    }
};
</script>
<style lang="sass">

</style>
