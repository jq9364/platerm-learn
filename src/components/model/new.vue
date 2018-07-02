<template>
    <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="108px">
        <el-form-item label="企业名称" prop="name"  required>
            <el-input v-model="ruleForm.name" placeholder="请输入企业名称" ></el-input>
        </el-form-item>
        <el-form-item label="所属行业" prop="business" required>
            <el-select v-model="ruleForm.business" placeholder="请选择企业所属行业">
                <el-option
                    v-for="item in industrylist"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="企业人数" prop="employeesRange" required>
            <el-select v-model="ruleForm.employeesRange" placeholder="请选择企业人数范围">
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
        <el-form-item prop="detailText"  class="long-input">
            <el-input v-model="ruleForm.detailText" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="营业执照" prop="chapter" required class="chapter">
            <div class="chapterBox"
                :class="uploadImg ? 'chapterPhoto' : 'chapterMark'"
                @click="uploadChapter">
                <div :class="uploadImg ? 'hoverMark' : ''"></div>
                <i class="el-icon-plus" v-show="!uploadImg"></i>
                <img :src="ruleForm.businessLicenseImage" alt="" v-if="uploadImg">
            </div>
            <input type="file" name="file" class="el-upload__input"
                ref="input" accept="image/*"
                @change="handleChange"
            >
            <div class="imageTip">支持 png、jpg、jpeg、bmp 格式，不能低于50KB,最大不能超过2M</div>
        </el-form-item>
        <el-form-item label="营业执照编号" prop="businessCode"  required>
            <el-input v-model="ruleForm.businessCode" placeholder="请输入营业执照编号" ></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="contact" required>
            <el-input v-model="ruleForm.contact" placeholder="请输入联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="mobile" required>
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
                        @change="isShowEqu(item, index)"
                        :label="index">
                        {{item.name}}
                    </el-checkbox>
                    <el-checkbox-group v-model="equmentArr[index]">
                        <div v-for="(equItem, num) in item.commonSceneList" :key="num"
                            class="scene-box" v-show="item.sceneIsChecked">
                            <div>
                                <el-checkbox
                                    @change="checkEquSort(equItem, item, num, index)"
                                    :label="equItem.id">
                                    {{equItem.name}}
                                </el-checkbox>
                                <div class="add-merchant"
                                    v-if="item.isPayment && equItem.equIsChecked && equItem.allowBoundCustomMerchant"
                                    @click.stop.prevent="addShowMerchant(equItem, item, num, index)">
                                        <span class="operation">添加收款商户</span>
                                        <span class="merchant-tip">({{equItem.hasRootMerchant  ? '可填' : '必填'}})</span>
                                        <button class="iconRight" >
                                            <i class="el-icon-arrow-right" :class="[equItem.checkedMerchant ? 'trans' : '']"></i>
                                        </button>
                                </div>
                            </div>
                            <div v-if="item.isPayment && equItem.equIsChecked && equItem.allowBoundCustomMerchant">
                                <SceneMerchant
                                    v-show="equItem.checkedMerchant"
                                    ref="merchant"
                                    @merchantRetrun = merchantRetrun
                                    :equItem = equItem
                                    :isRequired =false
                                    >
                                     <!-- equItem.hasRootMerchant -->
                                </SceneMerchant>
                            </div>
                        </div>
                    </el-checkbox-group>
                </div>
            </el-checkbox-group>
        </el-form-item>
        <el-button v-dbClick @click="submitForm('ruleForm')">确定</el-button>
    </el-form>
</template>


<script>
/**
 * @file   : popupNew.vue
 * @author : jinqianqian
 * @created: 2017-10-9 13:33:35
 */

import distpicker from '@/assets/js/city.js';
import SceneMerchant from './scene';

export default {
    name: 'popupNew',
    data() {
        return {
            industrylist: [],
            options: distpicker,
            employeeNums: [],
            companyAttributes: [],
            SceneCategoryTree: [],
            paramKeys: ['name', 'business', 'employeesRange', 'address',
                        'businessLicenseImage', 'businessCode', 'contact',
                        'mobile', 'email', 'applyScope', 'sceneCategoryList'],
            ruleForm: {
                name: '',
                business: '',
                employeesRange: '',
                address: {},
                businessLicenseImage: '',
                businessCode: '',
                contact: '',
                mobile: '',
                email: '',
                applyScope: '',
                sceneCategoryList: [],
                // 不需要传的参数
                addressArr: [],
                detailText: ''
            },
            uploadImg: false,
            uploadImgType: false,
            merchantValidate: true,
            equmentArr: [],
            sceneError: false,
            sceneIndexArr: [],
            rules: {
                // name: [
                //     {required: true, message: '请输入企业名称', trigger: 'blur'},
                //     {max: 50, message: '字数不能超出50个', trigger: 'blur'},
                //     {validator: this.checkName, trigger: 'blur'}
                // ],
                // business: [
                //     {required: true, message: '请选择所属行业', trigger: 'change'}
                // ],
                // employeesRange: [
                //     {required: true, message: '请选择企业人数', trigger: 'change'}
                // ],
                // addressArr: [
                //     {validator: this.checkAddress, trigger: 'change'}
                // ],
                // detailText: [
                //     {validator: this.valIsSpace, trigger: 'blur'},
                //     {max: 200, message: '字数不能超出200个', trigger: 'blur'}
                // ],
                // chapter: [
                //     {validator: this.checkChapter, trigger: 'blur'}
                // ],
                // businessCode: [
                //     {validator: this.checkBusinessCode, trigger: 'blur'}
                // ],
                // contact: [
                //     {required: true, message: '请输入联系人姓名', trigger: 'blur'},
                //     {max: 20, message: '字数不能超出20个', trigger: 'blur'},
                //     {validator: this.valIsSpace, trigger: 'blur'}
                // ],
                // mobile: [
                //     {required: true, message: '请输入联系方式', trigger: 'blur'},
                //     {pattern: /(^([0-9]{3,4}-)[0-9]{7,8}$)|(^(1[34578]\d{9})$)/,
                //      message: '请填写正确联系方式(固话请添加区号)', trigger: 'blur'}
                // ],
                // email: [
                //     {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                //     {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'},
                //     {max: 50, message: '字数不能超出50个', trigger: 'blur'}
                // ],
                // applyScope: [
                //     {required: true, message: '请选择用户属性', trigger: 'change'}
                // ],
                sceneCategoryList: [
                    {validator: this.checkSceneList, trigger: 'change, blur'}
                ]
            }
        };
    },
    components: {
        SceneMerchant
    },
    watch: {
        uploadImg(newVal, oldVal) {
            this.$refs.ruleForm.validateField('chapter');
        }
    },
    created() {
        this.$store.dispatch('getIndustrys').then(data => {
            this.industrylist = data;
        });
        this.$store.dispatch('getEmployeeRange').then(data => {
            this.employeeNums = data;
        });
        this.$store.dispatch('getCompanyAttributes').then(data => {
            this.companyAttributes = data;
        });
        this.$store.dispatch('getSceneCategoryTrees').then(data => {
            this.SceneCategoryTree = JSON.parse(JSON.stringify(data));
            this.SceneCategoryTree.forEach(item => {
                item.sceneIsChecked = false;
                this.equmentArr.push([]);
                (item.commonSceneList || []).forEach(newItem => {
                    newItem.equIsChecked = false;
                    newItem.checkedMerchant = false;
                    newItem.merchant = {
                        name: '',
                        baiduPayNo: '',
                        wxPayNo: '',
                        zfbPayNo: ''
                    };
                });
            });
        });
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.isPushParamKeys()) {
                        this.log('新增参数', this.getParam(this.ruleForm, this.paramKeys));
                        // this.$store.dispatch('saveEnterprise', this.getParam(this.ruleForm, this.paramKeys)).then(resp => {
                        //     this.$emit('changenew');
                        // });
                    }
                } else {
                    return false;
                }
            });
        },
        isPushParamKeys() {
            this.merchantValidate = true;
            let arr = this.$refs.merchant;
            if (arr) {
                this.$refs.merchant.forEach((item, index) => {
                    this.$refs.merchant[index].merchantIsOk();
                });
            }
            if (!this.merchantValidate) {
                return false;
            }
            if (this.ruleForm.addressArr.length) {
                this.ruleForm.address.province = this.ruleForm.addressArr[0];
                this.ruleForm.address.city = this.ruleForm.addressArr[1];
                this.ruleForm.address.region = this.ruleForm.addressArr[2];
                this.ruleForm.address.detail = this.ruleForm.detailText;
            }
            let sceneList = [];
            (this.SceneCategoryTree || []).forEach((item, index)=> {
                if (item.sceneIsChecked) {
                    let sceneObj = {
                        id: item.id,
                        commonSceneList: []
                    };
                    item.commonSceneList.forEach((newItem, num) => {
                        if (newItem.equIsChecked) {
                            let equObj = {
                                id: newItem.id,
                                merchant: null
                            };
                            if (newItem.checkedMerchant && newItem.merchant.name) {
                                equObj.merchant = Object.assign({}, newItem.merchant);
                            }
                            sceneObj.commonSceneList.push(equObj);
                        }
                    });
                    sceneList.push(sceneObj);
                }
            });
            this.ruleForm.sceneCategoryList = sceneList;

            return true;
            // 处理 勾选场景信息
        },
        checkName(rule, value, callback) {
            this.checkNameRule(rule, value, callback, this, 'checkCompanyName', '企业');
        },
        checkAddress(rule, value, callback) {
            if (value.length) {
                callback();
            } else {
                callback('请输入企业地址');
            }
        },
        uploadChapter() {
            // 之后优化一下
            this.$refs.input.value = '';
            this.$refs.input.click();
        },
        handleChange(ev) {
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
                formData.append('businessLicenseImage', files);
                this.$store.dispatch('getImgUrl', formData).then(data => {
                    this.uploadImg = true;
                    this.ruleForm.businessLicenseImage = data;
                    this.uploadImgType = true;
                }).then(() => {
                });
                this.uploadImgType = false;
            }
        },
        checkChapter(rule, value, callback) {
            if (this.uploadImg) {
                callback();
            } else {
                callback('请上传营业执照');
            }
        },
        checkBusinessCode(rule, value, callback) {
            let reg = /^[A-Za-z0-9]{15}$|^[A-Za-z0-9]{18}$/;
            // console.log(value.length, reg.test(value));
            if (reg.test(value)) {
                this.$store.dispatch('checkBusinessCode', {
                    businessCode: value
                }).then(resp => {
                    callback();
                }).catch(e => {
                    if (e.code === 5015) {
                        callback(new Error('营业执照编号已存在'));
                    } else {
                        callback('服务异常');
                    }
                });
            } else {
                callback('请输入正确的营业执照编号');
            }
        },
        isShowEqu(item, index) {
            item.sceneIsChecked = !item.sceneIsChecked;
            this.SceneCategoryTree.splice(index, 1, item);
        },
        addShowMerchant(equInfo, item, num, index) {
            equInfo.checkedMerchant = !equInfo.checkedMerchant;
            this.SceneCategoryTree.splice(index, 1, item);
            // console.log('添加商户');
        },
        checkEquSort(equInfo, item, num, index) {
            equInfo.equIsChecked = !equInfo.equIsChecked;
            this.SceneCategoryTree.splice(index, 1, item);
            // console.log('勾选设备');
        },
        merchantRetrun(val) {
            this.merchantValidate = val;
        },
        checkSceneList(rule, value, callback) {
            let equChecked = true;
            console.log(this.sceneIndexArr, this.equmentArr);

            let that = this;
            setTimeout(()=> {
                // console.log(990, that.sceneIndexArr, that.equmentArr);
                that.sceneIndexArr.forEach(item => {
                    equChecked = equChecked && that.equmentArr[item].length;
                });

                if (that.sceneIndexArr.length && equChecked) {
                    this.sceneError = false;
                    callback();
                } else {
                    this.sceneError = true;
                    return;
                }
            });
            // console.log(this.equmentArr, equChecked);
        }

    }
};


</script>
<style lang="sass">

</style>
