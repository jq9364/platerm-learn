<template>
    <div id="scene-category">
        <div class="head clear">
            <div class="title">场景管理 > 场景类型管理</div>
            <el-button @click="dialogAdd = true">新建</el-button>
        </div>
        <div class="table">
            <div class="table-head clear">
                <el-autocomplete
                    v-model="search.name"
                    placeholder="请输入场景类型名称"
                    icon="search"
                    :select-when-unmatched="true"
                    :fetch-suggestions="querySearch"
                    @select="handleSelect"
                    @keyup.enter="handleSelect"
                    :on-icon-click="handleSelect">
                </el-autocomplete>
                <div class="screen">
                    <label for="">使用技术</label>
                    <el-select
                        v-model="search.baseSdkId"
                        @change="handleSelect"
                        placeholder="请选择使用技术">
                        <el-option
                        v-for="item in sceneSkdLists"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="screen">
                    <label for="">场景类型状态</label>
                    <el-select
                        v-model="search.status"
                        @change="handleSelect"
                        placeholder="全部">
                        <el-option
                            v-for="item in statusList"
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
                    label="场景类型ID"
                    width="110px"
                    :show-overflow-tooltip = true
                    >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="场景类型名称"
                    :show-overflow-tooltip = true
                    >
                </el-table-column>
                <el-table-column
                    prop="developerInfo"
                    label="场景开发者ID&姓名"
                    :show-overflow-tooltip = "true"
                    >
                </el-table-column>
                <el-table-column
                    prop="useCompanyCount"
                    label="使用企业数量"
                    width="100px"
                    :show-overflow-tooltip = "true"
                    >
                </el-table-column>
                <el-table-column
                    prop="useSceneConut"
                    label="实例化场景总数"
                    :show-overflow-tooltip = true
                    >
                </el-table-column>
                <el-table-column
                    prop="statusText"
                    label="场景类型状态"
                    width="100px"
                    :show-overflow-tooltip = "true"
                    >
                </el-table-column>
                <el-table-column
                    prop="updateUser"
                    label="操作人"
                    :show-overflow-tooltip = "true"
                    >
                </el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="最后修改时间"
                    width="150px">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="126px"
                    >
                    <template scope="scope">
                        <span class="operation"
                            @click="checkDetail(scope.row)">查看</span>
                        <span
                            :class="[scope.row.editable ? 'operation':'invalided' ]"
                            @click="editDetail(scope.row)">编辑</span>
                        <span class="operation"
                            :class="[scope.row.deletabled ? 'operation':'invalided' ]"
                            @click="deleteRow(scope.row)">删除</span>
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
            <TypeNew
                v-if="dialogAdd"
                @changenew="newToReturn"></TypeNew>
        </el-dialog>
        <el-dialog
            :title="title"
            :visible.sync="dialogCheck"
            :close-on-click-modal = false
            :before-close="handleClose"
            v-if="dialogCheck"
            top="3%">
            <TypeCheck
                :sceneCategory = sceneCategory
                v-if="switchCorE && dialogCheck"
                @changcheck="checkToReturn" ></TypeCheck>
            <TypeEdit
                v-else
                :sceneCategory = sceneCategory
                @changedit="editToReturn"></TypeEdit>
        </el-dialog>

    </div>

    </div>
</template>

<script>
/**
 * @file   : category.vue
 * @author : jinqianqian
 * @date   : 2018-5-28 14:24:41
 */

import {mapGetters} from 'vuex';
import {TypeNew, TypeCheck, TypeEdit} from '@/components/scene';
import {categoryStatusList} from '@/commons/constant';

export default {
    name: 'category',
    data() {
        return {
            list: [],
            pageInfo: {},
            page: 1,
            search: {
                name: '',
                baseSdkId: '',
                status: ''
            },
            statusList: categoryStatusList,
            sceneSkdLists: [],

            isSearch: true,
            dialogAdd: false,
            dialogCheck: false,
            switchCorE: true,
            title: '查看',
            sceneCategory: {}
        };
    },
    components: {
        TypeNew,
        TypeCheck,
        TypeEdit
    },
    computed: {
        ...mapGetters([
            'sceneCategoryAll',
            'adminUserInfo',
            'sceneSkdList'
        ])
    },
    created() {
        this.updataList();
        this.$store.dispatch('getScenSdkList').then(() => {
            this.sceneSkdLists = [{name: '全部', id: ''}].concat(this.sceneSkdList || [])
        });

    },
    methods: {
        updataList() {
            let obj = Object.assign({}, this.search);
            obj.pageNum = this.page - 1;
            this.log(obj);
            this.$store.dispatch('getSceneCategoryList', obj).then(response => {
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
                    this.$store.dispatch('getCategoryNamelist', {
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
            this.$store.dispatch('getSceneCategoryDetail', {
                id: company.id
            }).then(data => {
                this.sceneCategory = Object.assign({}, data);
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
        deleteRow(rowData) {
            if (!rowData.deletabled) {
                return;
            }
            if (!rowData.deletable) {
                this.$alert('当前场景类型已有企业接入，只有删除企业接入后实例化的场景，才能删除此场景类型。', '', {
                    dangerouslyUseHTMLString: true
                }).then(() => {}, () => {});
                return;
            }
            this.$confirm('当前场景类型没有企业接入后实例化的场景，可以直接删除，您确认要删除吗？', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this.$store.dispatch('deleteSceneCategory', {
                    id: rowData.id
                }).then(resp => {
                    this.$message.success('该场景类型成功删除');
                    this.updataList();
                }).catch(e => {
                    if (e.code === 5025) {
                        this.$alert('当前场景类型已有企业接入，只有删除企业接入后实例化的场景，才能删除此场景类型。', '', {
                            dangerouslyUseHTMLString: true
                        }).then(() => {}, () => {});
                    } else {
                        this.$message.error('服务异常');
                    }
                });
            }, () => {}).catch(console.error);
        }
    }

};
</script>

<style lang="sass">

.avatar-uploader
    label::after
        content: ''!important

// #scene-category
.user-radio
    .el-radio
        padding-bottom: 5px

.user-checked
    .el-checkbox
        display: block

</style>
