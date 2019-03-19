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
                        :label="item.idName"
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
            <el-form-item label="场景类型使用" prop="companyName"
                class="user-radio scenetype-user"
                :class="{invalided: !(appUrl[0] || appUrl[1])}"
                >
                <div>
                    <el-radio v-model="ruleForm.applicationScope"
                        :disabled="!(appUrl[0] || appUrl[1])"
                        label="1"
                        >自用</el-radio>
                    <el-input
                        class="p-l-10"
                        v-model="ruleForm.companyName"
                        :disabled="!(appUrl[0] || appUrl[1]) || ruleForm.applicationScope === '2'"
                        placeholder="请输入自用企业名称" ></el-input>
                </div>
                <el-radio v-model="ruleForm.applicationScope"
                    :disabled="!(appUrl[0] || appUrl[1])"
                    label="2">开放给其他企业接入</el-radio>
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
            <el-form-item label="SDK使用" prop="sdkScope"
                :class="{invalided: !appUrl[2]}"
                class="user-radio">
                <div>
                    <el-radio v-model="ruleForm.sdkScope"
                        :disabled="!appUrl[2]"
                        label="1">自用</el-radio>
                </div>
                <el-radio v-model="ruleForm.sdkScope"
                    :disabled="!appUrl[2]"
                    label="2"
                    >开放给其他企业接入</el-radio>
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
                <el-radio v-model="sceneStatus" label="1">启用</el-radio>
                <el-radio v-model="sceneStatus" label="2">停用</el-radio>
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
                class="scene-group"
                label-width="110px">
                <el-checkbox v-model="userScope.userTeam"
                    @change="checkBox">显示用户统一大组</el-checkbox>
                <el-checkbox v-model="userScope.whiteList"
                    @change="checkBox">显示白名单</el-checkbox>
                <el-checkbox v-model="userScope.blackList"
                    @change="checkBox">显示黑名单</el-checkbox>
            </el-form-item>
            <el-form-item label-width="24px">
                <el-checkbox v-model="sceneDescription">场景说明</el-checkbox>
            </el-form-item>
            <el-form-item label="场景说明" prop="sceneDescription" class="textarea">
                <el-input
                    type="textarea"
                    :rows="4"
                    :disabled="!sceneDescription"
                    v-model="ruleForm.sceneDescription"
                    placeholder="请输入500字以内的产品描述" resize="none"></el-input>
                <div class="el-form-item__correct" v-show="textareaTip2">还可以输入  <span>{{wordNum2}}</span>  个字</div>
            </el-form-item>
        </div>
        <div class="region-box">
            <div class="title">设备默认配置</div>
            <el-form-item label="关联设备" prop="createTime" >
                <!-- <div v-html="ruleForm.createTime" ></div> -->
                <div>暂无</div>
            </el-form-item>
        </div>
        <div class="region-box service">
            <div class="title">服务配置</div>
            <el-form-item label="回调地址" prop="callbackUrl" >
                <el-tooltip effect="dark" content="Top Left 提示文字" placement="top">
                     <span class="mark-tip"></span>
                </el-tooltip>
                <el-input v-model="ruleForm.callbackUrl" placeholder="请输入回调地址"></el-input>
            </el-form-item>
            <el-form-item label="获取结果方式">
                <el-radio v-model="getResultType" label="0">同步返回</el-radio>
                <el-radio v-model="getResultType" label="1">轮询返回</el-radio>
            </el-form-item>
            <el-form-item label="获取结果地址" prop="getResultUrl" >
               <el-input v-model="ruleForm.getResultUrl" placeholder="请输入获取结果地址"></el-input>
            </el-form-item>
            <el-form-item label="通知结果地址" prop="noticeUrl" >
               <el-input v-model="ruleForm.noticeUrl" placeholder="请输入通知结果地址"></el-input>
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
import Vue from 'vue';
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
            textareaTip2: false,
            wordNum2: 20,
            selfPolicy: false,
            userScope: {
                userTeam: false,
                whiteList: false,
                blackList: false
            },
            allowUpdate: '1',
            sceneStatus: '1',
            getResultType: '0',
            onlyCheck: false,
            ResultType: false,
            ability: '',
            paramKeys: ['name', 'developerId', 'baseSdkId', 'systemEnvironment',
                        'applicationScope', 'sdkScope', 'sceneCategoryDefaultTemplateForm',
                        'appForms'],
            // companyName  appForms
            ruleForm: {
                name: '',
                developerId: '',
                baseSdkId: '',
                systemEnvironment: [],
                applicationScope: '1',
                companyName: '',
                sdkScope: '1',
                description: '',
                sceneDescription: '',
                sceneCategoryTemplateForm: {}
            },
            sceneDescription: false,
            rules: {
                // name: [
                //     {required: true, message: '请输入开发场景名称', trigger: 'blur'},
                //     {max: 20, message: '字数不能超出20个', trigger: 'blur'},
                //     {validator: this.checkSceneTypeName, trigger: 'blur'}
                // ],
                // developerId: [
                //     {required: true, message: '请选择开发者ID&姓名', pattern: /.+/, trigger: 'change'}
                // ],
                // baseSdkId: [
                //     {required: true, message: '请选择使用技术', pattern: /.+/, trigger: 'change'}
                // ],
                // systemEnvironment: [
                //     {validator: this.checkSystemEnvironment, trigger: 'change'}
                // ],
                // description: [
                //     {required: true, message: '请输入开发场景概述', trigger: 'change'},
                //     {validator: this.validateDescribe, trigger: 'change'}
                // ],
                // sceneDescription: [
                //     {validator: this.validateDescribe2, trigger: 'change'}
                // ],
                // userScope: [
                //     {validator: this.checkUserScope, trigger: 'change'}
                // ],
                // companyName: [
                //     {validator: this.checkCompanyName, trigger: 'blur'},
                //     {validator: this.valIsSpace, trigger: 'blur'},
                //     {max: 50, message: '字数不能超出50个', trigger: 'blur'}
                // ],
                callbackUrl: [
                    {max: 500, message: '字数不能超出500个', trigger: 'blur'}
                ],
                getResultUrl: [
                    {max: 500, message: '字数不能超出500个', trigger: 'change'},
                    {validator: this.checkResultUrl, trigger: 'change'}
                ],
                noticeUrl: [
                    {max: 500, message: '字数不能超出500个', trigger: 'blur'}
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
        // 'appUrl': {
        //     handler(newVal, oldVal) {
        //         if (!(newVal[0] && newVal[0])) {
        //             // this.ruleForm.applicationScope = '1';
        //             this.ruleForm.companyName = '';
        //         }
        //         if (!newVal[2]) {
        //             // this.ruleForm.sdkScope = '1';
        //         }
        //     },
        //     deep: true
        // }
    },
    created() {
        // 接口暂时没有
        this.$store.dispatch('getDeveloperIdName');
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.isPushParamKeys();
                    this.log('新增参数', this.getParam(this.ruleForm, this.paramKeys));
                    // this.$store.dispatch('saveEnterprise', this.getParam(this.ruleForm, this.paramKeys)).then(resp => {
                    //     this.$emit('changenew');
                    // });
                } else {
                    return false;
                }
            });
        },
        isPushParamKeys() {
            // 策略回显
            this.$refs.policyInfo.getPolicyBaseInfo();
            // 上传文件组合传参
            this.ruleForm.appForms = [];
            this.appUrl.forEach((item, key) => {
                let obj = {};
                if (item) {
                    obj.type = key + 1;
                    obj.url = item;
                    this.ruleForm.appForms.push(obj);
                }
            });
            // 处理 应用 sdk user 传参
            this.ruleForm = this.pushParamKeys(this.ruleForm, [])
            let sceneDate = this.ruleForm.sceneCategoryTemplateForm;
            // this.ruleForm.sceneCategoryTemplateForm
            sceneDate.sceneStatus = Number(this.sceneStatus);
            // console.log(4444, this.sceneStatus, sceneDate.userScope);
            // sceneDate.userScope = this.userScope;
        },
        policyInfoRetrun(policyInfo) {
            let obj = policyInfo;
            obj.allowUpdate = Number(this.allowUpdate);
            this.ruleForm.sceneCategoryTemplateForm = Object.assign({}, obj);
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
            Vue.set(this.appUrl, 0, '');
        },
        handlefileRemove1(file, fileList) {
            Vue.set(this.appUrl, 1, '');
        },
        handlefileRemove2(file, fileList) {
            Vue.set(this.appUrl, 2, '');
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
        checkBox() {
            this.$refs.ruleForm.validateField('userScope');
        },
        checkUserScope(rule, value, callback) {
            let isOk = Object.values(this.userScope).reduce((total, val) => {
                return total || val;
            });
            if (isOk) {
                callback();
            } else {
                callback('至少选择一种用户范围配置');
            }
        },
        checkResultUrl(rule, value, callback) {
            if (this.getResultType === '1' && !this.ruleForm.getResultUrl) {
                callback('请输入获取结果地址');
            } else {
                callback();
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
        },
        validateDescribe2(rule, value, callback) {
            if (value.length >= 480 && value.length <= 500) {
                let remnant  = 500 - value.length;
                this.textareaTip2 = true;
                this.wordNum2 = remnant;
                callback();
            } else if (value.length > 500) {
                this.textareaTip2 = false;
                let remnant  = value.length - 500;
                callback(new Error('已超出  ' + remnant + '  个字'));
            } else if (!value.replace(/[ ]/g, '') && value) {
                callback('描述不可全为空格');
            } else {
                this.textareaTip2 = false;
                callback();
            }
        }
    }
};
</script>
<script>
// let isAdd = newVal.length > oldVal.length;
// this.checkIsTipUser(isAdd, 1, newVal[newVal.length - 1]);
        // checkIsTipUser(isAdd, type, value) {
        //     let isOk = this.checkUserExisted(this.ruleForm.blackList, this.ruleForm.whiteList)
        //                 && isAdd;
        //     let str = type ? '白' : '黑';
        //     let str1 = type ? '黑' : '白';
        //     if (isOk) {
        //         this.$message.error('该' + value + '用户已出现在' + str + '名单中, 不能加入' + str1 + '名单');
        //     }

        // },
</script>

<style lang="sass">
.scenetype-user
    .el-input
        width: 300px!important
    .el-form-item__error
        top: 30px!important
.scene-group
    .el-checkbox
        display: block
    .el-checkbox+.el-checkbox
        margin-left: 0px
.service
    .el-form-item
        .el-form-item__content
            .el-input
                width: 260px
            .el-form-item__error
                left: 280px
</style>
