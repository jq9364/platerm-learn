<template>
    <div id="enterprise">
        <div class="head clear">
            <div class="title">企业管理</div>
            <el-button
                v-show = "jurisdictionList[0]"
                @click="dialogAdd = true">新建</el-button>
        </div>
        <div class="table">
            <div class="table-head clear">
                <el-autocomplete
                    v-model="search.name"
                    placeholder="请输入企业名称"
                    icon="search"
                    :select-when-unmatched="true"
                    :fetch-suggestions="querySearch"
                    @select="handleSelect"
                    @keyup.enter="handleSelect"
                    :on-icon-click="handleSelect">
                </el-autocomplete>
                <div class="screen">
                    <label for="">用户属性</label>
                    <el-select
                        v-model="search.applyScope"
                        @change="handleSelect"
                        placeholder="请选择用户属性">
                        <el-option
                        v-for="item in companyAttributes"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="screen">
                    <label for="">使用场景</label>
                    <el-select
                        v-model="search.sceneCategoryId"
                        @change="handleSelect"
                        placeholder="请选择使用场景">
                        <el-option
                        v-for="item in sceneTypeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="screen">
                    <label for="">企业状态</label>
                    <el-select
                        v-model="search.status"
                            @change="handleSelect"
                        placeholder="请选择企业状态">
                        <el-option
                        v-for="item in companyState"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-button @click="reset" class="reset">重置</el-button>
            </div>
            <el-table
                :data="list"
                stripe
                fit>
                <el-table-column
                    prop="id"
                    label="企业ID"
                    width="90px"
                    :show-overflow-tooltip = true
                    >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="企业名称"
                    :show-overflow-tooltip = true
                    >
                </el-table-column>
                <el-table-column
                    prop="business"
                    label="所属行业"
                    width="120px"
                    :show-overflow-tooltip = "true"
                    >
                </el-table-column>
                <el-table-column
                    prop="applyScope"
                    label="用户属性"
                    width="100px"
                    :show-overflow-tooltip = "true"
                    >
                </el-table-column>
                <el-table-column
                    prop="sceneCategory"
                    label="使用场景"
                    :show-overflow-tooltip = true
                    >
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="154px"
                    :show-overflow-tooltip = "true"
                    >
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="企业状态"
                    width="100px"
                    :show-overflow-tooltip = "true"
                    >
                    <template scope="scope">
                        <span
                            :class="[scope.row.deletable ? '' : 'red' ]"
                            v-html = "scope.row.status"></span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="146px"
                    >
                    <template scope="scope">
                        <span class="operation"
                            :class="[scope.row.editable ? 'operation':'invalided' ]"
                            @click="toConsole(scope.row)">管理</span>
                        <span class="operation"
                            v-show = "jurisdictionList[1]"
                            @click="checkDetail(scope.row)">查看</span>
                        <span
                            :class="[scope.row.editable ? 'operation':'invalided' ]"
                            v-show = "jurisdictionList[2]"
                            @click="editDetail(scope.row)">编辑</span>
                        <span class="operation"
                            :class="[scope.row.deletable ? 'operation':'invalided' ]"
                            v-show = "jurisdictionList[3]"
                            @click="deleteRow(scope.$index,list)">删除</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-wrap">
            <el-pagination
                layout="prev, pager, next , total"
                @current-change="handleCurrentChange"
                :current-page = "page"
                :total="pageInfo.record">
            </el-pagination>
        </div>
        <el-dialog
            title="新建"
            :visible.sync="dialogAdd"
            :close-on-click-modal = false
            top="5%">
            <PopupNew
                v-if="dialogAdd"
                @changenew="newToReturn"></PopupNew>
        </el-dialog>
        <!-- <el-dialog
            :title="title"
            :visible.sync="dialogCheck"
            :close-on-click-modal = false
            :before-close="handleClose"
            v-if="dialogCheck"
            top="3%">
            <PopupCheck
                :enterprise = companyInfo
                @showBigImage = showBigImage
                v-if="switchCorE && dialogCheck"
                @changcheck="checkToReturn" ></PopupCheck>
            <PopupEdit
                v-else
                :enterprise = companyInfo
                @changedit="editToReturn"></PopupEdit>
        </el-dialog>
        <el-dialog
            :visible.sync="dialogBig"
            class="photodialog"
            :top="bigImageClass === 'heightImg' ? '15%' : '15%'"
            :show-close="false"
            :class="bigImageClass">
            <img alt="" :src=imgSrc>
        </el-dialog> -->
    </div>

</template>

<script>
/**
 * @file   : index.vue
 * @author : jinqianqian
 * @created: 2017-9-27 18:33:35
 */

// import {PopupNew, PopupCheck, PopupEdit} from '@/components/enterprise';
import {mapGetters} from 'vuex';
import {getClazByImageUrl} from '@/commons/files';

export default {
    name: 'enterprise',
    // components: {
    //     PopupNew,
    //     PopupCheck,
    //     PopupEdit
    // },
    data() {
        return {
            list: [],
            pageInfo: {},
            page: 1,
            search: {
                name: '',
                applyScope: '',
                sceneCategoryId: '',
                sceneType: '',
                status: ''
            },
            companyAttributes: [],
            companyState: [],
            sceneTypeList: [],
            isSearch: true,
            dialogAdd: false,
            dialogCheck: false,
            switchCorE: true,
            title: '查看',
            companyInfo: {},
            dialogBig: false,
            bigImageClass: '',
            imgSrc: ''
        };
    },
    computed: {
        ...mapGetters([
            'sceneCategoryAll',
            'adminUserInfo',
            'jurisdictionList',
            'companyAll'
        ])
    },
    created() {
        this.$store.dispatch('showJurisdiction', this.$route.path);
        this.updataList();
        this.$store.dispatch('getCompanyAttributes').then(data => {
            this.companyAttributes = [{
                name: '全部',
                value: ''
            }].concat(data);
        });
        this.$store.dispatch('getCompanyState').then(data => {
            this.companyState = [{
                name: '全部',
                value: ''
            }].concat(data);
        });
        this.$store.dispatch('getSceneCategoryAll').then(() => {
            this.sceneTypeList = [{
                name: '全部',
                id: ''
            }].concat(this.sceneCategoryAll);
        });
    },
    methods: {
        updataList() {
            let obj = Object.assign({}, this.search);
            obj.pageNum = this.page - 1;
            this.$store.dispatch('getEnterpriseList', obj).then(response => {
                this.list = JSON.parse(JSON.stringify(response.data));
                this.pageInfo = Object.assign({}, response.page);
            });
        },
        handleCurrentChange(val) {
            this.page = val;
            this.updataList();
        },
        handleSelect(item) {
            if (this.isSearch) {
                this.page = 1;
                this.updataList();
            }
        },
        querySearch(name, cb) {
            if (name) {
                clearTimeout(this.timerOut);
                this.timerOut = setTimeout(() => {
                    this.$store.dispatch('getNamelist', {
                        param: {
                            name
                        },
                        cb
                    });
                }, 300);
            } else {
                cb([]);
            }
        },
        reset() {
            this.isSearch = false;
            for (let key in this.search) {
                this.search[key] = '';
            }
            setTimeout(() => {
                this.isSearch = true;
                this.page = 1;
                this.updataList();
            }, 0);
        },
        newToReturn() {
            this.dialogAdd = false;
            this.reset();
            this.$store.dispatch('getCompanyAll');
        },
        toConsole(company) {
            if (company.editable) {
                this.$store.dispatch('getChangeCompanyInfo', {
                    companyId: company.id
                }).then(() => {
                    this.$store.dispatch('jumpToConsole');
                });
            }

        },
        checkDetail(company) {
            this.$store.dispatch('getCompanyInfo', {
                id: company.id
            }).then(data => {
                this.companyInfo = Object.assign({}, data);
                this.dialogCheck = true;
            });
        },
        editDetail(company) {
            if (company.editable) {
                this.title = '编辑';
                this.switchCorE = false;
                this.checkDetail(company);
            }
        },
        checkToReturn(val) {
            switch (val) {
                case 0:
                    this.dialogCheck = false;
                    break;
                case 1:
                    this.switchCorE = false;
                    this.title = '编辑';
                    break;
                case 2:
                    this.dialogCheck = false;
                    this.reset();
            }
        },
        editToReturn() {
            this.dialogCheck = false;
            this.title = '查看';
            this.switchCorE = true;
            this.reset();
            this.$store.dispatch('getCompanyAll');
        },
        handleClose() {
            this.dialogCheck = false;
            this.switchCorE = true;
            this.title = '查看';
        },
        deleteRow(index, rows) {
            if (!rows[index].deletable) {
                return;
            }
            this.$confirm('此操作将删除该企业信息, 是否继续?', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this.$store.dispatch('companyDelete', {
                    id: rows[index].id
                }).then(resp => {
                    this.$message.success('该企业成功删除');
                    if (rows[index].id === this.adminUserInfo.companyId) {
                        this.$store.dispatch('getAdminUserInfo');
                    }
                    // 删除数据之后 超管切换公司也得换
                    this.updataList();
                    this.$store.dispatch('getCompanyAll');
                }).catch(e => {
                    if (e.code === 5025) {
                        this.$alert('该企业下有场景正在使用，请先删除这些场景', '', {
                            dangerouslyUseHTMLString: true
                        }).then(() => {}, () => {});
                    } else {
                        this.$message.error('服务异常');
                    }
                });
            }, () => {}).catch(console.error);
        },
        showBigImage(img) {
            this.imgSrc = img;
            this.bigImageClass = getClazByImageUrl(img);
            this.dialogBig = true;
        }
    }
};

</script>
<style lang="sass">

#enterprise
    .el-checkbox
        padding: 3px 0
    .scene-capacity
        >label::before
            content: '*'
            color: #ff4949
            margin-right: 4px
        .error
            color: #ff4949;
            font-size: 12px;
            line-height: 1;
            padding-top: 4px;
            position: absolute;
            top: 0;
            left: 215px;
            margin-right: -5px;

    .scene-box
        margin: 5px 0 12px 22px
        border-radius: 5px
        padding: 5px 10px
        box-shadow: 0 0 1px 1px #dbd4d4

        .add-merchant
            float: right
            cursor: pointer

    .imageTip
        color: #97a8be
        margin: 5px 0 -5px

    .merchant-tip
        color: #7c7878


    .company-scene
        .sceneTip
            opacity: 0
            padding-left: 5px
        .el-checkbox-group
            .el-checkbox
                display: block
                margin-left: 0

        .el-checkbox:hover
            .el-checkbox__input.is-disabled + .el-checkbox__label .sceneTip
                opacity: 1
                color: #97a8be
        .sceneTip
            opacity: 0
            padding-left: 5px

</style>
