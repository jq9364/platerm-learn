<template>
    <el-form :html="enterprise" ref="enterprise" label-width="112px">
        <!-- <el-form-item label="企业id" prop="id">
            <div v-html="enterprise.id"></div>
        </el-form-item> -->
        <el-form-item label="企业名称" prop="name"  required >
            <div v-html="enterprise.name"></div>
        </el-form-item>
        <el-form-item label="所属行业" prop="businessText" required>
            <div v-html="enterprise.businessText"></div>
        </el-form-item>
        <el-form-item label="企业人数" prop="employeesRangeText" required>
            <div v-html="enterprise.employeesRangeText" ></div>
        </el-form-item>
        <el-form-item label="企业地址" prop="addressText" >
            <div v-html="enterprise.addressText" ></div>
        </el-form-item>
        <el-form-item label="营业执照" prop="chapter" required>
            <div class="chapterBox chapterPhoto" @click="showBigImage(enterprise.businessLicenseImage)"
                v-if="enterprise.businessLicenseImage">
                <img :src="enterprise.businessLicenseImage" alt="">
            </div>
        </el-form-item>
        <el-form-item label="营业执照编号" prop="businessCode" required>
            <div v-html="enterprise.businessCode"></div>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="contact" required>
            <div v-html="enterprise.contact"></div>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile" required>
            <div v-html="enterprise.mobile"></div>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email" required>
            <div v-html="enterprise.email" ></div>
        </el-form-item>
        <el-form-item label="用户属性" prop="applyScopeText" required>
            <div v-html="enterprise.applyScopeText" ></div>
        </el-form-item>
        <!-- <el-form-item label="使用场景" prop="sceneTypeId" class="companyScene" required>
            <el-checkbox-group v-model="enterprise.scenesText">
                    <el-checkbox
                        v-for="item in sceneTypes"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        disabled
                        >
                    </el-checkbox>
                </el-checkbox-group>
        </el-form-item> -->
        <!-- <div v-if="enterprise.isPayment && enterprise.isPayChannel">
            <el-form-item label="收款商户主体" prop="merchantName"  required>
                <div v-html="enterprise.merchant.name" ></div>
            </el-form-item>
            <el-form-item label="百度钱包商户号" prop="baiduPayNo">
                <div v-html="enterprise.merchant.baiduPayNo" ></div>
            </el-form-item>
            <el-form-item label="支付宝商户号" prop="zfbPayNo" >
                <div v-html="enterprise.merchant.zfbPayNo" ></div>
            </el-form-item>
            <el-form-item label="微信商户号" prop="wxPayNo" >
                <div v-html="enterprise.merchant.wxPayNo" ></div>
            </el-form-item>
        </div> -->
        <el-form-item label="创建时间" prop="createTime" >
            <div v-html="enterprise.createTime" ></div>
        </el-form-item>
        <el-form-item label="最后修改时间" prop="updateTime" >
            <div v-html="enterprise.updateTime" ></div>
        </el-form-item>
        <el-form-item label="最后操作人" prop="updateUser" >
            <div v-html="enterprise.updateUser" ></div>
        </el-form-item>
        <el-form-item label="企业状态" prop="status" >
            <span v-html="enterprise.status"></span>
            <span
                v-show="!enterprise.editable && enterprise.deletable"
                class="p-l-10">驳回原因: {{enterprise.reason}}</span>
        </el-form-item>
        <div v-show="!enterprise.editable && !enterprise.deletable">
            <el-button @click="HandleState(1)">通过</el-button>
            <el-button @click="HandleState(3)">驳回</el-button>
        </div>
        <el-button v-show="enterprise.editable" @click="toIndex(1)">编辑</el-button>
        <el-button v-show="!enterprise.editable && enterprise.deletable" @click="toIndex(0)">关闭</el-button>
    </el-form>
</template>


<script>
/**
 * @file   : popupNew.vue
 * @author : jinqianqian
 * @created: 2017-10-9 13:33:35
 */

export default {
    name: 'popupCheck',
    data() {
        return {
            SceneCategoryTree: [],
            equmentArr: []
        };
    },
    props: {
        enterprise: Object
    },
    methods: {
        HandleState(state) {
            if (state === 1) {
                // 通过
                this.postState(state);
            } else {
                // 驳回
                this.$prompt('请输入驳回原因', '', {
                    confirmButtonText: '确认驳回',
                    showCancelButton: false,
                    // inputType: 'textarea',
                    inputValidator: this.checkReason,
                    inputErrorMessage: '请输入200字以内的驳回原因'
                }).then(({value}) => {
                    this.postState(state, value);
                }).catch(() => {
                });
            }
        },
        postState(state, reason) {
            this.$store.dispatch('updataeCompanyStatus', {
                id: this.enterprise.id,
                status: state,
                reason: reason
            }).then(() => {
                this.$emit('changcheck', 2);
            });
        },
        checkReason(value) {
            if (value) {
                if (!value.replace(/[ ]/g, '')) {
                    return '驳回原因不可全为空格';
                } else if (value.length > 200) {
                    return '驳回字数最大为200';
                } else {
                    return true;
                }
            } else {
                return '请输入200字以内的驳回原因';
            }
        },
        toIndex(val) {
            console.log(333, val);
            this.$emit('changcheck', val);
        },
        showBigImage(img) {
            this.$emit('showBigImage', img);
        }
    },
    created() {
        this.$store.dispatch('getSceneCategoryTrees').then(data => {
            this.SceneCategoryTree = JSON.parse(JSON.stringify(data));
            this.SceneCategoryTree.forEach(item => {
                this.equmentArr.push([]);
                item.showEque = true;
                (item.commonSceneList || []).forEach(newItem => {
                    newItem.openMerchant = true;
                });
            });
            console.log(this.SceneCategoryTree, this.equmentArr);
        });
        // 场景 待处理
        console.log(this.enterprise);
        console.log(this.enterprise.statusVal);
    }
};


</script>
<style lang="sass">



</style>
