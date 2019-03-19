<template>
    <el-form :html="developer" label-width="108px">
        <div class="region-box">
            <div class="title">开发者信息</div>
            <el-form-item label="开发者姓名" required>
                <div v-html="developer.name"></div>
            </el-form-item>
            <el-form-item label="开发者身份" required>
                <div v-html="developer.typeText"></div>
            </el-form-item>
            <el-form-item label="企业名称" required>
                <div v-html="developer.companyName"></div>
            </el-form-item>
            <el-form-item label="所属行业" required>
                <div v-html="developer.business.name"></div>
            </el-form-item>
            <template v-if = showPersonal>
                <el-form-item label="身份证照片" prop="idCardUrl" required class="id-imgbox">
                    <div class="imgbox clear">
                        <div class="chapterBox chapterPhoto"
                            @click="showBigImage(developer.idCardFrontUrl)">
                            <img :src="developer.idCardFrontUrlShow" alt="">
                        </div>
                        <div class="chapterBox chapterPhoto"
                            @click="showBigImage(developer.idCardBackUrl)">
                            <img :src="developer.idCardBackUrlShow" alt="">
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="身份证编号" required>
                    <div v-html="developer.idCardNumber"></div>
                </el-form-item>
            </template>
            <template v-else>
                <el-form-item label="企业人数" required>
                    <div v-html="developer.employeesRange.name"></div>
                </el-form-item>
                <el-form-item label="企业地址" required>
                    <div v-html="developer.addressText"></div>
                </el-form-item>
                <el-form-item label="营业执照" required class="chapter">
                     <div class="chapterBox chapterPhoto"
                        @click="showBigImage(developer.businessLicenseImage)">
                        <img :src="developer.businessLicenseImageShow">
                    </div>
                </el-form-item>
                <el-form-item label="营业执照编号" required>
                    <div v-html="developer.businessCode"></div>
                </el-form-item>
            </template>
        </div>
        <div class="region-box">
            <div class="title">联系方式</div>
            <el-form-item label="联系人电话" required>
                <div v-html="developer.mobile"></div>
            </el-form-item>
            <el-form-item label="联系邮箱" required>
                <div v-html="developer.email"></div>
            </el-form-item>
        </div>
        <div v-for="(item, key) in developer.sceneCategoryList"
            :key = key>
            <div class="region-box-title">
                <div class="title">开发内容</div>
            </div>
            <el-form-item label="" required>
                <div>集成新场景</div>
            </el-form-item>
            <el-form-item label="意向使用技术" required>
                <div v-html="item.baseSdkVO ? item.baseSdkVO.name: ''"></div>
            </el-form-item>
            <el-form-item label="系统环境" required>
                <el-checkbox-group v-model="item.systemEnvironmentList">
                    <el-checkbox label="安卓" disabled></el-checkbox>
                    <el-checkbox label="IOS" disabled></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="开发场景名称" required>
                <div v-html="item.name"></div>
            </el-form-item>
            <el-form-item label="开发场景概述" required>
                <div v-html="item.description"></div>
            </el-form-item>
        </div>

        <div v-for="(item, key) in developer.commonSceneList"
            :key = key>
            <div class="region-box-title">
                <div class="title">开发内容</div>
            </div>
            <el-form-item label="" required>
                <div>集成新设备</div>
            </el-form-item>
            <el-form-item label="开发场景" required>
                <div v-html="item.sceneCategoryName"></div>
            </el-form-item>
            <el-form-item label="选择使用SDK" required>
                <div v-html="item.sceneCategorySdkName"></div>
            </el-form-item>
            <el-form-item label="设备分类" required>
                <div v-html="item.deviceCategorySdkName"></div>
            </el-form-item>
            <el-form-item label="开发设备名称" required>
                <div v-html="item.name"></div>
            </el-form-item>
            <el-form-item label="设备分类" required>
                <div v-html="item.description"></div>
            </el-form-item>
        </div>
        <el-form-item label="开发者状态" prop="status" >
            <span v-html="developer.statusText"></span>
            <span v-show="developer.reason"
                class="p-l-10">驳回原因: {{developer.reason}}</span>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime" >
            <div v-html="developer.createTime" ></div>
        </el-form-item>
        <el-form-item label="最后修改时间" prop="updateTime" >
            <div v-html="developer.updateTime" ></div>
        </el-form-item>
        <el-form-item label="最后操作人" prop="updateUser" >
            <div v-html="developer.updateUser" ></div>
        </el-form-item>
        <div v-show="developer.status === 5">
            <el-button @click="HandleState(1)">通过</el-button>
            <el-button @click="HandleState(6)">驳回</el-button>
        </div>
        <el-button v-show="developer.status === 1"
                @click="toIndex(1)">编辑</el-button>
        <el-button v-show="developer.status === 6"
                @click="toIndex(0)">关闭</el-button>
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
            showPersonal: true,
            showContent: true,
            typeList: {}
        };
    },
    props: {
        developer: Object
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
                    customClass: 'company-reson',
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
            this.$store.dispatch('updataeDeveloperStatus', {
                id: this.developer.id,
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
            if (img) {
                this.$emit('showBigImage', img);
            }
        }
    },
    created() {
        // this.log(333, this.developer.status);
        this.showPersonal = this.developer.type === 1;
        this.showContent = this.developer.developContent === 1;
        // 场景 待处理
    }
};


</script>
<style lang="sass">



</style>
