<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="108px">
        <el-form-item label="企业id" prop="id">
            <div v-html="ruleForm.id"></div>
        </el-form-item>
        <el-form-item label="企业名称" prop="name"  required >
            <el-input v-model="ruleForm.name" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="所属行业" prop="business" required>
            <el-select v-model="ruleForm.business">
                <el-option
                    v-for="item in industrylist"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="企业人数" prop="employeesRange" required>
            <el-select v-model="ruleForm.employeesRange" >
                <el-option
                    v-for="item in employeeNums"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="企业地址" prop="addressArr" required>
            <el-cascader
                v-model="ruleForm.addressArr"
                :options="options"
                placeholder="请选择省市区"
                filterable
            ></el-cascader>
        </el-form-item>
        <el-form-item prop="detail"  class="long-input">
            <el-input v-model="ruleForm.detail" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="营业执照" prop="chapter" class="chapter" required>
            <div class="chapterBox chapterPhoto"
                @click="uploadChapter">
                <i class="el-icon-plus" v-show="uploadImg"></i>
                <div class="hoverMark"></div>
                <img :src="ruleForm.businessLicenseImage" alt="">
            </div>
            <input type="file" name="file" class="el-upload__input"
                ref="input" @change="handleChange" accept="image/*">
            <div class="imageTip">支持 png、jpg、jpeg、bmp 格式，不能低于50KB,最大不能超过2M</div>
        </el-form-item>
        <el-form-item label="营业执照编号" prop="businessCode"  required>
            <el-input v-model="ruleForm.businessCode" placeholder="请输入营业执照编号" ></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="contact" required>
            <el-input v-model="ruleForm.contact" placeholder="请输入联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile" required>
            <el-input v-model="ruleForm.mobile" placeholder="请输入手机号码或固定电话"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email" required>
            <el-input v-model="ruleForm.email" placeholder="请输入企业邮箱"></el-input>
        </el-form-item>
        <el-form-item label="用户属性" prop="applyScope" required>
            <el-select v-model="ruleForm.applyScope" placeholder="请选择用户属性">
                <el-option
                v-for="item in companyAttributes"
                :key="item.value"
                :label="item.name"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="使用场景" prop="sceneCategoryList" class="scene-capacity">
            <div class="error" v-if="sceneError">请选择使用场景及场景下的设备</div>
            <el-checkbox-group v-model="sceneIndexArr">
                <div v-for="(item, index) in this.SceneCategoryTree" :key="index">
                    <el-checkbox
                        :disabled = item.disabled
                        :checked="item.checked"
                        @change="isShowEqu(item, index)"
                        :label="index">
                        {{item.name}}
                    </el-checkbox>
                    <el-checkbox-group v-model="equmentArr[index]">
                        <div v-for="(equItem, num) in item.commonSceneList" :key="num"
                            class="scene-box" v-show="item.checked">
                            <div>
                                <el-checkbox
                                    :disabled = "equItem.cancelable"
                                    :checked= equItem.checked
                                    @change="checkEquSort(equItem, item, num, index)"
                                    :label="equItem.id">
                                    {{equItem.name}}
                                </el-checkbox>
                                <div class="add-merchant"
                                    v-if="equItem.checked && equItem.allowBoundCustomMerchant"
                                    @click.stop.prevent="addShowMerchant(equItem, item, num, index)">
                                        <span class="operation">添加收款商户</span>
                                        <span class="merchant-tip">({{equItem.hasRootMerchant  ? '可填' : '必填'}})</span>
                                        <button class="iconRight" >
                                            <i class="el-icon-arrow-right" :class="[equItem.checkedMerchant ? 'trans' : '']"></i>
                                        </button>
                                </div>
                            </div>
                            <div v-if="equItem.checked && equItem.allowBoundCustomMerchant">
                                <!-- <SceneMerchant
                                    ref="merchant"
                                    v-show="equItem.checkedMerchant"
                                    @merchantRetrun = merchantRetrun
                                    :merchant = equItem.merchant
                                    :equItem = equItem
                                    :hasRootMerchant  = equItem.hasRootMerchant >
                                </SceneMerchant> -->
                            </div>
                        </div>
                    </el-checkbox-group>
                </div>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime" >
            <div v-html="enterprise.createTime" ></div>
        </el-form-item>
        <el-form-item label="最后操作人" prop="updateUser" >
            <div v-html="enterprise.updateUser" ></div>
        </el-form-item>
        <el-button @click="submitForm('ruleForm')" v-dbClick>确定</el-button>
        </el-form>
    </div>

</template>


<script>
/**
 * @file   : popupNew.vue
 * @author : jinqianqian
 * @created: 2017-10-9 13:33:35
 */

import distpicker from '@/assets/js/city.js';
// import SceneMerchant from './scene';

export default {
    name: 'popupEdit',
    props: {
        enterprise: Object
    },
    components: {
        // SceneMerchant
    },
    data() {
        return {
            options: distpicker,
            openKey: false,
            employeeNums: [],
            industrylist: [],
            companyAttributes: [],
            collectingChannels: [],
            SceneCategoryTree: [],
            ruleForm: {},
            paramKeys: ['id', 'name', 'business', 'employeesRange', 'address',
                        'businessLicenseImage', 'businessCode', 'contact',
                        'email', 'applyScope', 'sceneCategoryList'],
            merchant: {
                name: '',
                baiduPayNo: '',
                wxPayNo: '',
                zfbPayNo: ''
            },
            equmentArr: [],
            sceneCategoryList: [],
            sceneIndexArr: [],
            uploadImg: false,
            uploadImgType: false,
            merchantValidate: true,
            sceneError: false,
            rules: {
                name: [
                    {required: true, message: '请输入企业名称', trigger: 'blur'},
                    {max: 50, message: '字数不能超出50个', trigger: 'blur'},
                    {validator: this.checkName, trigger: 'blur'}
                ],
                business: [
                    {required: true, message: '请选择所属行业', trigger: 'change'}
                ],
                employeesRange: [
                    {required: true, message: '请选择企业人数', trigger: 'change'}
                ],
                address: [
                    {validator: this.checkAddress, trigger: 'change'}
                ],
                detail: [
                    {validator: this.valIsSpace, trigger: 'blur'},
                    {max: 200, message: '字数不能超出200个', trigger: 'blur'}
                ],
                chapter: [
                    {validator: this.checkChapter, trigger: 'change'}
                ],
                businessCode: [
                    {validator: this.checkBusinessCode, trigger: 'blur'}
                ],
                contact: [
                    {required: true, message: '请输入联系人姓名', trigger: 'blur'},
                    {max: 20, message: '字数不能超出20个', trigger: 'blur'},
                    {validator: this.valIsSpace, trigger: 'blur'}
                ],
                mobile: [
                    {required: true, message: '请输入联系方式', trigger: 'blur'},
                    {validator: this.checkMobile, trigger: 'blur'}
                ],
                email: [
                    {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                    {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'},
                    {max: 50, message: '字数不能超出50个', trigger: 'blur'}
                ],
                applyScope: [
                    {required: true, message: '请选择用户属性', trigger: 'change'},
                    {validator: this.checkApplyScope, trigger: 'change'}
                ],
                sceneCategoryList: [
                    {validator: this.checkSceneList, trigger: 'change, blur'}
                ]
            }
        };
    },
    created() {
        this.ruleForm = JSON.parse(JSON.stringify(this.enterprise));

        this.toValByObj(this.ruleForm, 'business');
        this.toValByObj(this.ruleForm, 'employeesRange');
        this.toValByObj(this.ruleForm, 'applyScope');
        this.ruleForm.detail = this.ruleForm.address.detail;
        // console.log(222, this.ruleForm);

        this.sceneShow();
        this.$store.dispatch('getIndustrys').then(data => {
            this.industrylist = data;
        });
        this.$store.dispatch('getEmployeeRange').then(data => {
            this.employeeNums = data;
        });
        this.$store.dispatch('getCompanyAttributes').then(data => {
            this.companyAttributes = data;
        });
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.isPushParamKeys()) {
                        this.log(this.getParam(this.ruleForm, this.paramKeys));
                        this.$store.dispatch('reviseEnterprise', this.getParam(this.ruleForm, this.paramKeys)).then(resp => {
                            this.$emit('changedit');
                        });
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        isPushParamKeys() {
            if (!this.merchantValidate) {
                this.$message.error('请完善设备相关的商户信息');
                return false;
            }
            if (this.ruleForm.addressArr.length) {
                this.ruleForm.address.province = this.ruleForm.addressArr[0];
                this.ruleForm.address.city = this.ruleForm.addressArr[1];
                this.ruleForm.address.region = this.ruleForm.addressArr[2];
                this.ruleForm.address.detail = this.ruleForm.detail;
            }
            this.sceneCategoryList = [];
            let treeData = JSON.parse(JSON.stringify(this.SceneCategoryTree));
            treeData.forEach((item, index)=> {
                if (item.checked) {
                    this.sceneCategoryList[index] = {
                        id: item.id,
                        commonSceneList: []
                    };
                    item.commonSceneList.forEach((newItem, num) => {
                        if (newItem.checked) {
                            let obj = {
                                id: newItem.id,
                                merchant: null
                            };
                            if (newItem.checkedMerchant && newItem.merchant.name) {
                                obj.merchant = Object.assign({}, newItem.merchant);
                            }
                            this.sceneCategoryList[index].commonSceneList.push(obj);
                        }
                    });
                }
            });
            this.ruleForm.sceneCategoryList = this.sceneCategoryList;
            return true;
        },
        sceneShow() {
            this.SceneCategoryTree = JSON.parse(JSON.stringify(this.ruleForm.sceneCategoryList));
            this.SceneCategoryTree.forEach(item => {
                let arr = [];
                let noCancelable = false;
                item.commonSceneList.forEach(newItem => {
                    noCancelable = noCancelable || newItem.checked;
                });
                item.disabled = noCancelable;
                this.equmentArr.push(arr);
            });
        },
        // 检查参数是否发生变动
        checkParamChanged(param, value) {
            return this.enterprise[param] === value;
        },
        checkName(rule, value, callback) {
            if (this.checkParamChanged('name', value)) {
                return callback();
            }
            this.checkNameRule(rule, value, callback, this, 'checkCompanyName', '企业');
        },
        checkMobile(rule, value, callback) {
            if (this.checkParamChanged('mobile', value)) {
                callback();
            } else {
                this.paramKeys.push('mobile');
                // 如果发生变化 验证电话正则
                const reg = /(^([0-9]{3,4}-)[0-9]{7,8}$)|(^(1[34578]\d{9})$)/;
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(new Error('请填写正确手机号 或 固话(加区号)'));
                }
            }
        },
        checkAddress(rule, value, callback) {
            if (value.length) {
                callback();
            } else {
                callback('请输入企业地址');
            }
        },
        uploadChapter() {
            this.$refs.input.click();
        },
        handleChange(ev) {
            let files = ev.target.files[0] ? ev.target.files[0] : '';
            const ImageFilter = /image\/jpeg|image\/png|image\/jpg|image\/bmp/;
            // console.log('图片信息', files);
            if (!ImageFilter.test(files.type)) {
                this.uploadImgType = true;
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
                formData.append('businessLicenseImage', files);
                this.$store.dispatch('getImgUrl', formData).then(data => {
                    this.ruleForm.businessLicenseImage = data;
                });
                this.uploadImgType = false;
            }
        },
        checkChapter(rule, value, callback) {
            if (this.ruleForm.businessLicenseImage.indexOf('http') > -1) {
                callback();
            } else {
                callback('请上传营业执照');
            }
        },
        checkBusinessCode(rule, value, callback) {
            let reg = /^[A-Za-z0-9]{15}$|^[A-Za-z0-9]{18}$/;
            if (reg.test(value)) {
                callback();
            } else {
                callback('请输入正确的营业执照编号');
            }
        },
        checkApplyScope(rule, value, callback) {
            if (this.enterprise.applyScope === value) {
                callback();
            } else {
                if (this.enterprise.changeApplyScope) {
                    callback();
                } else {
                    callback(new Error('不允许修改用户属性'));
                }
            }
        },
        isShowEqu(item, index) {
            let noCancelable = false;
            item.commonSceneList.forEach(equItem => {
                noCancelable = noCancelable || equItem.checked;
            });
            if (!noCancelable) {
                item.checked = !item.checked;
            }
            if (item.checked) {
                this.sceneIndexArr.push(index);
            } else {
                let num = this.sceneIndexArr.indexOf(index);
                this.sceneIndexArr.splice(num, 1);
            }
            this.SceneCategoryTree.splice(index, 1, item);
        },
        addShowMerchant(equInfo, item, num, index) {
            // if (!equInfo.merchantDeletable) {
            //     this.$message.error('此商户号被正在使用的设备所关联使用着,不允许修改');
            //     return;
            // }
            equInfo.checkedMerchant = !equInfo.checkedMerchant;
            this.SceneCategoryTree.splice(index, 1, item);
            console.log('添加商户');
        },
        checkEquSort(equInfo, item, num, index) {
            equInfo.checked = !equInfo.checked;
            this.SceneCategoryTree.splice(index, 1, item);
            console.log('勾选设备');
        },
        merchantRetrun(val) {
            this.merchantValidate = val;
        },
        checkSceneList(rule, value, callback) {
            let equChecked = true;
            let that = this;
            setTimeout(()=> {
                // console.log(990, that.sceneIndexArr, that.equmentArr);
                this.sceneIndexArr.forEach(item => {
                    equChecked = equChecked && that.equmentArr[item].length;
                });

                that.merchantValidate = true;
                let arr = that.$refs.merchant;
                if (arr) {
                    that.$refs.merchant.forEach((item, index) => {
                        that.$refs.merchant[index].merchantIsOk();
                    });
                }

                if (that.sceneIndexArr.length && equChecked) {
                    this.sceneError = false;
                } else {
                    this.sceneError = true;
                }
                callback();
            });
        }
    }
};


</script>

<style lang="sass">

</style>

