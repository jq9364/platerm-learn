<template>
    <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="108px">
        <div class="region-box">
            <div class="title">基本信息</div>
            <el-form-item label="场景类型名称" prop="name"  required>
                <el-input v-model="ruleForm.name" placeholder="请输入场景类型名称" ></el-input>
            </el-form-item>
            <el-form-item label="开发者ID&姓名" prop="developerId" required>
                <el-select v-model="ruleForm.developerId" placeholder="请选择开发者ID&姓名">
                    <el-option
                        v-for="item in developerList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="使用技术" prop="baseSdkId" required>
                <el-select v-model="ruleForm.baseSdkId"
                    @change = changAbility
                    placeholder="请选择使用技术">
                    <el-option
                        v-for="item in sceneSkdList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="使用能力库" >
                <div v-html="ability" ></div>
            </el-form-item>
            <el-form-item label="系统环境" prop="systemEnvironment" required>
                <el-checkbox-group v-model="ruleForm.systemEnvironment">
                    <el-checkbox label="安卓" @change="showAndroid = !showAndroid"></el-checkbox>
                    <el-checkbox label="IOS" @change="showIos = !showIos"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="场景应用及版本" prop="businessCode">
                <div v-show = "!ruleForm.systemEnvironment.length"
                    class="invalided"
                    >请先选择系统环境</div>
                <el-upload
                    v-show="showAndroid"
                    class="avatar-uploader"
                    action="./rest/upload/uploadFile"
                    ref="uploadImg"
                    name="file"
                    :file-list="fileList1"
                    :on-change = "handlefileChange"
                    :before-upload="beforeAvatarUpload"
                    :on-success="handlefileSuccess"
                    :on-remove = "handlefileRemove"
                    :show-file-list="true">
                    <span class="operation" @click="type = 1">上传安卓app</span>
                </el-upload>
                <el-upload
                    class="avatar-uploader"
                    :class="{'p-tb-5': showAndroid}"
                    v-show="showIos"
                    action="./rest/upload/uploadFile"
                    ref="uploadImg"
                    name="file"
                    :file-list="fileList2"
                    :show-file-list="true"
                    :before-upload="beforeAvatarUpload"
                    :on-change = "handlefileChange"
                    :on-success="handlefileSuccess"
                    :on-remove = "handlefileRemove1"
                    >
                    <span class="operation" @click="type = 2">上传IOS app</span>
                </el-upload>
            </el-form-item>
            <el-form-item label="场景类型使用" prop="companyName" class="user-radio scenetype-user">
                <div>
                    <el-radio v-model="ruleForm.applicationScope" label="1">自用</el-radio>
                    <el-input
                        class="p-l-10"
                        v-model="ruleForm.companyName"
                        :disabled="ruleForm.applicationScope === '2'"
                        placeholder="请输入自用企业名称" ></el-input>
                </div>
                <el-radio v-model="ruleForm.applicationScope" label="2">开放给其他企业接入</el-radio>
            </el-form-item>
            <el-form-item label="提供SDK及版本" prop="businessCode">
                <el-upload
                    class="avatar-uploader"
                    action="./rest/upload/uploadFile"
                    ref="uploadImg"
                    name="file"
                    :file-list="fileList3"
                    :on-change = "handlefileChange"
                    :before-upload="beforeAvatarUpload"
                    :on-success="handlefileSuccess"
                    :on-remove = "handlefileRemove2"
                    :show-file-list="true">
                    <span class="operation" @click="type = 3">点击上传</span>
                </el-upload>
            </el-form-item>
            <el-form-item label="SDK使用" prop="sdkScope" class="user-radio">
                <div>
                    <el-radio v-model="ruleForm.sdkScope" label="1">自用</el-radio>
                </div>
                <el-radio v-model="ruleForm.sdkScope" label="2">开放给其他企业接入</el-radio>
            </el-form-item>
            <el-form-item label="场景类型概述" prop="description" required class="textarea">
                <el-input type="textarea"  :rows="4" v-model="ruleForm.description"
                    placeholder="请输入500字以内的产品描述" resize="none"></el-input>
                <div class="el-form-item__correct" v-show="textareaTip">还可以输入  <span>{{wordNum}}</span>  个字</div>
            </el-form-item>
        </div>

        <div class="region-box">
            <div class="title">场景默认配置</div>
            <el-form-item label="场景状态"
                label-width="90px"
                required>
                <el-radio v-model="ruleForm.sceneStatus" label="1">启用</el-radio>
                <el-radio v-model="ruleForm.sceneStatus" label="2">停用</el-radio>
            </el-form-item>
            <div class="policy-box">
                <policy
                    ref="policyInfo"
                    :newAll = true
                    :onlyCheck = onlyCheck
                    @policyIfno = policyInfoRetrun
                ></policy>
            </div>
            <el-form-item label="场景发布后，是否允许用户修改此数值"
                label-width="250px"
                >
                <el-radio v-model="allowUpdate" label="1">是</el-radio>
                <el-radio v-model="allowUpdate" label="0">否</el-radio>
            </el-form-item>
            <!-- <el-form-item label-width="24px" prop="selfPolicy">
                <el-checkbox v-model="selfPolicy" @change="isSelfPolicy">自研策略</el-checkbox>
            </el-form-item>
                <selfPolicy>
                </selfPolicy> -->
            <el-form-item label="用户范围配置" prop="userScope"
                required
                class="over-scene"
                label-width="110px">
                <el-checkbox-group v-model="userScope">
                    <el-checkbox label="1" >显示用户统一大组</el-checkbox>
                    <el-checkbox label="2" >显示白名单</el-checkbox>
                    <el-checkbox label="3" >显示黑名单</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label-width="24px">
                <el-checkbox v-model="sceneDescription">场景说明</el-checkbox>
            </el-form-item>
            <el-form-item label="场景说明" prop="description" class="textarea">
                <el-input type="textarea"  :rows="4" v-model="ruleForm.description"
                    placeholder="请输入500字以内的产品描述" resize="none"></el-input>
                <div class="el-form-item__correct" v-show="textareaTip">还可以输入  <span>{{wordNum}}</span>  个字</div>
            </el-form-item>
        </div>
        <div class="region-box">
            <div class="title">设备默认配置</div>
            <el-form-item label="关联设备" prop="createTime" >
                <!-- <div v-html="ruleForm.createTime" ></div> -->
                <div>暂无</div>
            </el-form-item>
        </div>
        <el-button v-dbClick @click="submitForm('ruleForm')">确定</el-button>
    </el-form>
</template>

<script>
/**
 * @file   : typeNew.vue
 * @author : jinqianqian
 * @date   : 2018-6-15 11:28:36
 */

import {mapGetters} from 'vuex';

export default {
    name: 'typeNew',
    data() {
        return {
            fileList1: [],
            fileList2: [],
            fileList3: [],
            appUrl: ['', '', ''],

            type: 0,
            showAndroid: false,
            showIos: false,

            textareaTip: false,
            wordNum: 20,

            selfPolicy: false,
            userScope: [],
            allowUpdate: '1',
            onlyCheck: false,

            ability: '',
            ruleForm: {
                name: '',
                developerId: '',
                baseSdkId: '',
                systemEnvironment: [],
                applicationScope: '2',
                companyName: '',
                sdkScope: '2',
                description: '',

                sceneStatus: '1'

            },

            sceneDescription: false,
            rules: {
                name: [
                    {required: true, message: '请输入开发场景名称', trigger: 'blur'},
                    {max: 20, message: '字数不能超出20个', trigger: 'blur'},
                    {validator: this.checkSceneTypeName, trigger: 'blur'}
                ],
                developerId: [
                    {required: true, message: '请选择开发者ID&姓名', pattern: /.+/, trigger: 'change'}
                ],
                baseSdkId: [
                    {required: true, message: '请选择使用技术', pattern: /.+/, trigger: 'change'}
                ],
                systemEnvironment: [
                    {validator: this.checkSystemEnvironment, trigger: 'change'}
                ],
                description: [
                    {validator: this.validateDescribe, trigger: 'change'}
                ],
                userScope: [
                    {validator: this.checkUserScope, trigger: 'change'}
                ],
                companyName: [
                    {validator: this.checkCompanyName, trigger: 'blur'},
                    {validator: this.valIsSpace, trigger: 'blur'},
                    {max: 50, message: '字数不能超出50个', trigger: 'blur'}
                ]

            }
        };
    },
    computed: {
        ...mapGetters([
            'adminUserInfo',
            'sceneSkdList',
            'developerList'
        ])
    },
    watch: {
        'ruleForm.applicationScope': {
            handler(newVal, oldVal) {
                this.$refs.ruleForm.validateField('companyName');
            }
        }
    },
    created() {
        // 接口暂时没有
        this.$store.dispatch('getDeveloperIdName');
    },
    methods: {
        abc(val) {
            console.log(val);
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // if (this.isPushParamKeys()) {
                    //     this.log('新增参数', this.getParam(this.ruleForm, this.paramKeys));
                    //     // this.$store.dispatch('saveEnterprise', this.getParam(this.ruleForm, this.paramKeys)).then(resp => {
                    //     //     this.$emit('changenew');
                    //     // });
                    // }
                } else {
                    return false;
                }
            });
        },
        isPushParamKeys() {
            // this.appUrl
            this.ruleForm.appForms = [];
        },
        beforeAvatarUpload(file) {
            // 上传文件 之前
            // console.log(file);
        },
        handlefileChange(file, fileList) {
            switch (this.type) {
                case 1 :
                    this.fileList1 = fileList.slice(-1);
                    break;
                case 2 :
                    this.fileList2 = fileList.slice(-1);
                    break;
                case 3 :
                    this.fileList3 = fileList.slice(-1);
                    break;
            }
        },
        // 上传成功的钩子
        handlefileSuccess(res, file, fileList) {
            if (res.code === 200) {
                // 上传成功
                this.appUrl[this.type - 1] = res.data;
            } else {
                this.$message.error(res.message);
            }
        },
        handlefileRemove(file, fileList) {
            this.appUrl[0] = '';
        },
        handlefileRemove1(file, fileList) {
            this.appUrl[1] = '';
        },
        handlefileRemove2(file, fileList) {
            this.appUrl[2] = '';
        },
        policyInfoRetrun() {

        },
        isSelfPolicy() {
            this.onlyCheck = this.selfPolicy;
        },
        changAbility(value) {
            (this.sceneSkdList || []).forEach(item => {
                if (item.id === value) {
                    this.ability = item.abilityName;
                }
            });
        },
        checkSceneTypeName(rule, value, callback) {
            this.checkNameRule(rule, value, callback, this, 'checkSceneCategoryName', '场景名称');
        },
        checkSystemEnvironment(rule, value, callback) {
            if (this.ruleForm.systemEnvironment.length) {
                callback();
            } else {
                callback('请选择系统环境');
            }
        },
        checkUserScope(rule, value, callback) {
            if (this.userScope.length) {
                callback();
            } else {
                callback('至少选择一种用户范围配置');
            }
        },
        checkCompanyName(rule, value, callback) {
            console.log(333, value, this.ruleForm.applicationScope);
            if (this.ruleForm.applicationScope === '1' && !value) {
                callback('请输入自用企业名称');
            } else {
                callback();
            }
        },
        validateDescribe(rule, value, callback) {
            if (value.length >= 480 && value.length <= 500) {
                let remnant  = 500 - value.length;
                this.textareaTip = true;
                this.wordNum = remnant;
                callback();
            } else if (value.length > 500) {
                this.textareaTip = false;
                let remnant  = value.length - 500;
                callback(new Error('已超出  ' + remnant + '  个字'));
            } else if (!value.replace(/[ ]/g, '') && value) {
                callback('描述不可全为空格');
            } else {
                this.textareaTip = false;
                callback();
            }
        }

    }

};
</script>

<style lang="sass">
.scenetype-user
    .el-input
        width: 300px!important
    .el-form-item__error
        top: 30px!important
</style>
