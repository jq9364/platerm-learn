<template>
    <el-form
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
        :show-message =showMessage
        label-width="108px">
        <div class="region-box">
            <div class="title">开发者信息</div>
            <el-form-item label="开发者姓名" prop="name"  required>
                <el-input v-model="ruleForm.name" placeholder="请输入开发者名称" ></el-input>
            </el-form-item>
            <el-form-item label="开发者身份" prop="type" required>
                <el-select v-model="ruleForm.type" placeholder="请选择开发者身份">
                    <el-option
                        v-for="item in typeList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所在企业" prop="companyName" required>
                <el-input v-model="ruleForm.companyName" placeholder="请输入企业名称" ></el-input>
            </el-form-item>
            <el-form-item label="所属行业" prop="business">
                <el-select v-model="ruleForm.business" placeholder="请选择企业所属行业">
                    <el-option
                        v-for="item in industrylist"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <template v-if = showPersonal>
                <!-- showPersonal -->
                <!-- 个人开发者 -->
                <el-form-item label="身份证照片" prop="idCardUrl" required class="id-imgbox">
                    <div class="imgbox clear">
                        <div class="chapterBox"
                            :class="ruleForm.idCardFrontUrl ? 'chapterPhoto' : 'chapterMark'"
                            @click="uploadChapter(1)">
                            <div :class="ruleForm.idCardFrontUrl ? 'hoverMark' : ''"></div>
                            <i class="el-icon-plus" v-show="!ruleForm.idCardFrontUrl"></i>
                            <div class="text-tip" v-show="!ruleForm.idCardFrontUrl">正面</div>
                            <img :src="ruleForm.idCardFrontUrl" alt=""
                                    v-if="ruleForm.idCardFrontUrl">
                        </div>
                        <input type="file" name="file" class="el-upload__input"
                            ref="input1" accept="image/*"
                            @change="handleChange($event, 1)"
                        >
                        <div class="chapterBox"
                            :class="ruleForm.idCardBackUrl ? 'chapterPhoto' : 'chapterMark'"
                            @click="uploadChapter(2)">
                            <div :class="ruleForm.idCardBackUrl ? 'hoverMark' : ''"></div>
                            <i class="el-icon-plus" v-show="!ruleForm.idCardBackUrl"></i>
                            <div class="text-tip" v-show="!ruleForm.idCardBackUrl">反面</div>
                            <img :src="ruleForm.idCardBackUrl" alt=""
                                    v-if="ruleForm.idCardBackUrl">
                        </div>
                        <input type="file" name="file" class="el-upload__input"
                            ref="input2" accept="image/*"
                            @change="handleChange($event, 2)"
                        >
                    </div>
                    <div class="imageTip">支持 png、jpg、jpeg、bmp 格式，不能低于50KB,最大不能超过2M</div>
                </el-form-item>
                <el-form-item label="身份证编号" :prop="showPersonal ? 'idCardNumber' : ''" required>
                    <el-input v-model="ruleForm.idCardNumber" placeholder="请输入身份证编号" ></el-input>
                </el-form-item>
            </template>
            <template v-else>
                <!-- 企业开发者 -->
                <el-form-item label="企业人数" :prop="showPersonal ? '' : 'employeesRange'" required>
                    <el-select v-model="ruleForm.employeesRange" placeholder="请选择企业人数范围">
                        <el-option
                            v-for="item in employeeNums"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="企业地址">
                    <el-cascader
                        v-model="ruleForm.addressArr"
                        :options="options"
                        placeholder="请选择省市区"
                        filterable
                    ></el-cascader>
                </el-form-item>
                <el-form-item :prop="showPersonal ? '' : 'detailText'"  class="long-input">
                    <el-input v-model="ruleForm.detailText" placeholder="请输入详细地址"></el-input>
                </el-form-item>
                <el-form-item label="营业执照" prop="businessLicenseImage" required class="chapter">
                    <div class="chapterBox"
                        :class="ruleForm.businessLicenseImage ? 'chapterPhoto' : 'chapterMark'"
                        @click="uploadChapter(0)">
                        <div :class="ruleForm.businessLicenseImage ? 'hoverMark' : ''"></div>
                        <i class="el-icon-plus" v-show="!ruleForm.businessLicenseImage"></i>
                        <img :src="ruleForm.businessLicenseImage" alt=""
                            v-if="ruleForm.businessLicenseImage">
                    </div>
                    <input type="file" name="file" class="el-upload__input"
                        ref="input" accept="image/*"
                        @change="handleChange($event, 0)"
                    >
                    <div class="imageTip">支持 png、jpg、jpeg、bmp 格式，不能低于50KB,最大不能超过2M</div>
                </el-form-item>
                <el-form-item label="营业执照编号" :prop="showPersonal ? '' : 'businessCode' " required>
                    <el-input v-model="ruleForm.businessCode" placeholder="请输入营业执照编号" ></el-input>
                </el-form-item>
            </template>
        </div>
        <div class="region-box">
            <div class="title">联系方式</div>
            <el-form-item label="联系人电话" prop="mobile" required>
                <el-input v-model="ruleForm.mobile" placeholder="请输入手机号码或固定电话"></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱" prop="email" required>
                <el-input v-model="ruleForm.email" placeholder="请输入企业邮箱"></el-input>
            </el-form-item>
        </div>
        <div class="region-box-title">
            <div class="title">开发内容</div>
        </div>
        <el-form-item label="" prop="developContent" required>
            <el-select v-model="ruleForm.developContent" placeholder="请选择开发内容">
                <el-option
                    v-for="item in developContentList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <template v-if= showContent>
            <!--  -->
            <el-form-item label="意向使用技术" prop="baseSdkId" required>
                <el-select v-model="ruleForm.baseSdkId" placeholder="请选择意向使用技术">
                    <el-option
                        v-for="item in baseSdkList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="系统环境" prop="systemEnvironment" required>
                <el-checkbox-group v-model="ruleForm.systemEnvironment">
                    <el-checkbox label="安卓"></el-checkbox>
                    <el-checkbox label="IOS"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="开发场景名称" prop="sceneName" required>
                <el-input v-model="ruleForm.sceneName" placeholder="请输入开发场景名称"></el-input>
            </el-form-item>
            <el-form-item label="开发场景概述" prop="sceneDescription" required class="textarea">
                <el-input type="textarea"  :rows="4" v-model="ruleForm.sceneDescription" placeholder="请输入500字以内的产品描述" resize="none"></el-input>
                <div class="el-form-item__correct" v-show="textareaTip">还可以输入  <span>{{wordNum}}</span>  个字</div>
            </el-form-item>
        </template>

        <template v-else>
            <el-form-item label="选择开发场景" prop="sceneCategoryId" required>
                <el-select v-model="ruleForm.sceneCategoryId"
                    @change="changeScene"
                    placeholder="请选择开发场景">
                    <el-option
                        v-for="item in sceneList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择使用SDK" prop="sceneCategorySdkId" required>
                <el-select v-model="ruleForm.sceneCategorySdkId"
                    no-data-text="请先选择开发场景"
                    placeholder="请选择使用SDK">
                    <el-option
                        v-for="item in deviceSdkList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设备分类" prop="deviceCategoryId" required>
                <el-select v-model="ruleForm.deviceCategoryId" placeholder="请选择设备分类">
                    <el-option
                        v-for="item in dviceCategory"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开发设备名称" prop="deviceName" required>
                <el-input v-model="ruleForm.deviceName" placeholder="请输入开发设备名称"></el-input>
            </el-form-item>
            <el-form-item label="开发设备概述" prop="description" required class="textarea">
                <el-input type="textarea"  :rows="4" v-model="ruleForm.deviceDescription" placeholder="请输入500字以内的产品描述" resize="none"></el-input>
                <div class="el-form-item__correct" v-show="textareaTip">还可以输入  <span>{{wordNum}}</span>  个字</div>
            </el-form-item>
        </template>

        <el-button v-dbClick @click="submitForm('ruleForm')">确定</el-button>
    </el-form>
</template>


<script>
/**
 * @file   : popupNew.vue
 * @author : jinqianqian
 * @created: 2017-10-9 13:33:35
 */

import {mapGetters} from 'vuex';
import distpicker from '@/assets/js/city.js';

export default {
    name: 'popupNew',
    data() {
        return {
            typeList: [{
                name: '个人开发者',
                value: 1
            }, {
                name: '企业开发者',
                value: 2
            }],
            developContentList: [{
                name: '开发新场景',
                value: 1
            }, {
                name: '集成新设备',
                value: 2
            }],
            industrylist: [],
            options: distpicker,
            employeeNums: [],
            baseSdkList: [],

            sceneList: [],
            deviceSdkList: [],
            dviceCategory: [],

            showPersonal: true,
            showContent: true,
            wordNum: 0,
            textareaTip: false,
            paramKeys: ['name', 'type', 'companyName', 'business', 'mobile', 'email',
                        'developContent'],
            ruleForm: {
                name: '',
                type: '',
                companyName: '',
                business: '',
                mobile: '',
                email: '',

                // 个人
                idCardFrontUrl: '',
                idCardBackUrl: '',
                idCardNumber: '',

                // 企业
                employeesRange: '',
                address: {},
                businessLicenseImage: '',
                businessCode: '',
                addressArr: [],

                developContent: '',

                baseSdkId: '',
                systemEnvironment: [],
                sceneName: '',
                sceneDescription: '',

                sceneCategoryId: '',
                sceneCategorySdkId: '',
                deviceCategoryId: '',
                deviceName: '',
                deviceDescription: ''
            },
            showMessage: true,
            rules: {
                name: [
                    {required: true, message: '请输入开发者名称', trigger: 'blur'},
                    {validator: this.valIsSpace, trigger: 'blur'},
                    {max: 20, message: '字数不能超出20个', trigger: 'blur'}
                ],
                type: [
                    {required: true, message: '请选择开发者身份', pattern: /.+/, trigger: 'change'}
                ],
                companyName: [
                    {required: true, message: '请输入企业名称', trigger: 'blur'},
                    {validator: this.valIsSpace, trigger: 'blur'},
                    {max: 50, message: '字数不能超出50个', trigger: 'blur'}
                ],
                business: [
                    {required: true, message: '请选择所属行业', trigger: 'change'}
                ],

                idCardUrl: [
                    {validator: this.checkIdCardUrl, trigger: 'change'}
                ],
                idCardNumber: [
                    {required: true, message: '请输入身份证号', trigger: 'blur'},
                    {pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                     message: '请填写正确身份证号', trigger: 'blur'},
                    {validator: this.checkidCardNumber, trigger: 'blur'}
                ],

                employeesRange: [
                    {required: true, message: '请选择企业人数', trigger: 'change'}
                ],
                detailText: [
                    {max: 200, message: '字数不能超出200个', trigger: 'blur'},
                    {validator: this.valIsSpace, trigger: 'blur'},
                    {validator: this.checkDetailText, trigger: 'blur'}
                ],
                businessLicenseImage: [
                    {required: true, message: '请上传营业执照', trigger: 'change'}
                ],
                businessCode: [
                    {validator: this.checkBusinessCode, trigger: 'blur'}
                ],

                mobile: [
                    {required: true, message: '请输入联系方式', trigger: 'blur'},
                    {pattern: /(^([0-9]{3,4}-)[0-9]{7,8}$)|(^(1[34578]\d{9})$)/,
                     message: '请填写正确联系方式', trigger: 'blur'}
                ],
                email: [
                    {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                    {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'},
                    {max: 50, message: '字数不能超出50个', trigger: 'blur'}
                ],

                developContent: [
                    {required: true, message: '请选择意开发内容', pattern: /.+/, trigger: 'change'}
                ],

                baseSdkId: [
                    {required: true, message: '请选择意向使用技术', pattern: /.+/, trigger: 'change'}
                ],
                systemEnvironment: [
                    {validator: this.checkSystemEnvironment, trigger: 'change'}
                ],
                sceneName: [
                    {required: true, message: '请输入开发场景名称', trigger: 'blur'},
                    {max: 20, message: '字数不能超出20个', trigger: 'blur'},
                    {validator: this.checkSceneTypeName, trigger: 'blur'}
                ],
                sceneDescription: [
                    {validator: this.validateDescribe, trigger: 'change'}
                ],
                sceneCategoryId: [
                    {required: true, message: '请选择开发场景', pattern: /.+/, trigger: 'change'}
                ],
                sceneCategorySdkId: [
                    {required: true, message: '请选择使用SDK', pattern: /.+/, trigger: 'change'}
                ],
                deviceName: [
                    {required: true, message: '请输入开发设备名称', trigger: 'blur'},
                    {validator: this.valIsSpace, trigger: 'blur'},
                    {max: 20, message: '字数不能超出20个', trigger: 'blur'},
                    {validator: this.checkDeviceTypeName, trigger: 'blur'}
                ],
                deviceCategoryId: [
                    {required: true, message: '请选择设备分类', pattern: /.+/, trigger: 'change'}
                ],
                deviceDescription: [
                    {validator: this.validateDescribe, trigger: 'change'}
                ]

            }
        };
    },
    watch: {
        'ruleForm.type': {
            handler(newVal, oldVal) {
                this.showPersonal = this.ruleForm.type === 1;
                this.showMessage = false;
                setTimeout(() => {
                    this.$refs.ruleForm.validate();
                    this.showMessage = true;
                }, 500);
            }
        },
        'ruleForm.developContent': {
            handler(newVal, oldVal) {
                this.showContent = this.ruleForm.developContent === 1;
                console.log(this.ruleForm.developContent, this.showContent);
            }
        },
        'ruleForm.idCardFrontUrl': {
            handler(newVal, oldVal) {
                this.$refs.ruleForm.validateField('idCardUrl');
            }
        },
        'ruleForm.idCardBackUrl': {
            handler(newVal, oldVal) {
                this.$refs.ruleForm.validateField('idCardUrl');
            }
        },
        'ruleForm.businessLicenseImage': {
            handler(newVal, oldVal) {
                this.$refs.ruleForm.validateField('businessLicenseImage');
            }
        }
    },
    created() {
        this.$store.dispatch('getIndustrys').then(data => {
            this.industrylist = data;
        });
        this.$store.dispatch('getEmployeeRange').then(data => {
            this.employeeNums = data;
        });
        this.$store.dispatch('getbaseSdkList').then(data => {
            this.baseSdkList = data;
        });
        this.$store.dispatch('getDeviceSdkByScene').then(data => {
            this.sceneList = data;
        });
        this.$store.dispatch('getdDviceCategory').then(data => {
            this.dviceCategory = data;
        });
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.isPushParamKeys();
                    this.log(this.getParam(this.ruleForm, this.paramKeys));
                    this.$store.dispatch('saveDeveloper', this.getParam(this.ruleForm, this.paramKeys)).then(resp => {
                        this.$emit('changenew');
                    });

                } else {
                    return false;
                }
            });
        },
        isPushParamKeys() {

            if (this.showPersonal) {
                this.pushParamKeys(['idCardFrontUrl', 'idCardBackUrl', 'idCardNumber']);
                this.arrayRemoveElements(['employeesRange', 'address',
                                    'businessLicenseImage', 'businessCode']);
            } else {
                if (this.ruleForm.addressArr.length) {
                    this.ruleForm.address.province = this.ruleForm.addressArr[0];
                    this.ruleForm.address.city = this.ruleForm.addressArr[1];
                    this.ruleForm.address.region = this.ruleForm.addressArr[2];
                    this.ruleForm.address.detail = this.ruleForm.detailText;
                }
                this.arrayRemoveElements(['idCardFrontUrl', 'idCardBackUrl', 'idCardNumber']);
                this.pushParamKeys(['employeesRange', 'address',
                                    'businessLicenseImage', 'businessCode']);
            }

            if (this.showContent) {
                let sceneObj = {};

                sceneObj.baseSdkId = this.ruleForm.baseSdkId;
                sceneObj.systemEnvironment = this.ruleForm.systemEnvironment;
                sceneObj.name = this.ruleForm.sceneName;
                sceneObj.description = this.ruleForm.sceneDescription;

                this.ruleForm.sceneCategoryForm = Object.assign({}, sceneObj);
                this.pushParamKeys(['sceneCategoryForm']);
                this.arrayRemoveElements(['commonSceneForm']);
            } else {
                let deviceObj = {};

                deviceObj.sceneCategoryId = this.ruleForm.sceneCategoryId;
                deviceObj.sceneCategorySdkId = this.ruleForm.sceneCategorySdkId;
                deviceObj.deviceCategoryId = this.ruleForm.deviceCategoryId;
                deviceObj.name = this.ruleForm.deviceName;
                deviceObj.description = this.ruleForm.deviceDescription;
                this.ruleForm.commonSceneForm = Object.assign({}, deviceObj);
                this.pushParamKeys(['commonSceneForm']);
                this.arrayRemoveElements(['sceneCategoryForm']);
            }

        },
        checkDetailText(rule, value, callback) {
            if (value && !this.ruleForm.addressArr.length) {
                callback('请先选择省市区');
            } else {
                callback();
            }
        },
        uploadChapter(val) {
            let str = '';
            switch (val) {
                case 0:
                    str = 'input';
                    break;
                case 1:
                    str = 'input1';
                    break;
                case 2:
                    str = 'input2';
                    break;
            }
            this.$refs[str].value = '';
            this.$refs[str].click();
        },
        handleChange(ev, index) {
            // console.log('获取信息', ev, index);
            let files = ev.target.files[0] ? ev.target.files[0] : '';
            const ImageFilter = /image\/jpeg|image\/png|image\/jpg|image\/bmp/;
            if (!ImageFilter.test(files.type)) {
                this.$message({
                    message: '请上传jpg/png格式的图片',
                    type: 'warning'
                });
            } else if (files.size < 50 * 1024 || files.size > 2 * 1024 * 1024) {
                this.$message({
                    message: '请上传正确大小的图片',
                    type: 'warning'
                });
            } else {
                let formData = new FormData();
                let imgType = '';
                let imgUrl = '';
                let post = '';
                switch (index) {
                    case 0:
                        imgType = 'businessLicenseImage';
                        imgUrl = 'businessLicenseImage';
                        post = 'getImgUrl';
                        break;
                    case 1:
                        imgType = 'idCardImage';
                        imgUrl = 'idCardFrontUrl';
                        post = 'getIdImgUrl';
                        break;
                    case 2:
                        imgType = 'idCardImage';
                        imgUrl = 'idCardBackUrl';
                        post = 'getIdImgUrl';
                        break;
                }
                formData.append(imgType, files);
                this.$store.dispatch(post, formData).then(data => {
                    this.ruleForm[imgUrl] = data;
                    console.log(this.ruleForm[imgUrl], 555);
                }).then(() => {
                });
            }
        },
        checkIdCardUrl(rule, value, callback) {
            if (this.ruleForm.idCardFrontUrl && this.ruleForm.idCardBackUrl) {
                callback();
            } else {
                callback(new Error());
                this.$message.warning('请上传正反身份证照片');
            }
        },
        checkBusinessCode(rule, value, callback) {
            let reg = /^[A-Za-z0-9]{15}$|^[A-Za-z0-9]{18}$/;
            if (reg.test(value)) {
                this.$store.dispatch('checkBusinessCodeRule', {
                    businessCode: value
                }).then(resp => {
                    callback();
                }).catch(() => {
                    callback('请输入正确的营业执照编号');
                });
            } else {
                callback('请输入正确的营业执照编号');
            }
        },
        checkSystemEnvironment(rule, value, callback) {
            if (this.ruleForm.systemEnvironment.length) {
                callback();
            } else {
                callback('请选择意系统环境');
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
        checkSceneTypeName(rule, value, callback) {
            this.checkNameRule(rule, value, callback, this, 'checkSceneCategoryName', '场景名称');
        },
        checkDeviceTypeName(rule, value, callback) {
            if (this.ruleForm.sceneCategoryId) {
                this.$store.dispatch('checkDeviceName', {
                    businessCode: value
                }).then(resp => {
                    callback();
                }).catch(() => {
                    callback('改场景下的设备名称已存在');
                });
            } else {
                callback('请先选择开发场景');
            }
        },
        changeScene(val) {
            this.sceneList.forEach(item => {
                if (item.id === val) {
                    this.deviceSdkList = Object.assign([], item.developerSdks);
                }
            });
            this.ruleForm.sceneCategorySdkId = '';
        },
        pushParamKeys(arr) {
            arr.forEach(item => {
                let index = this.paramKeys.indexOf(item);
                if (index === -1) {
                    this.paramKeys.push(item);
                }
            });
        },
        arrayRemoveElements(arr) {
            arr.forEach(item => {
                let index = this.paramKeys.indexOf(item);
                if (index > -1) {
                    this.paramKeys.splice(index, 1);
                }
            });
        },
        checkidCardNumber(rule, value, callback) {
            this.$store.dispatch('checkidCardNumberRule', {
                idCardNumber: value
            }).then(resp => {
                callback();
            }).catch(error => {
                if (error.code === 5015) {
                    callback('该身份证号已存在');
                } else {
                    callback('服务异常');
                }
            });
        },
        checksPersonal() {
            this.$refs.ruleForm.validateField('idCardUrl');
        },
        checkContent() {

        }
    }
};


</script>
<style lang="sass">

</style>
