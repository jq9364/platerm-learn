<template>
    <div>
        <el-date-picker
            v-model="datetimerange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            @change="changTime"
            end-placeholder="结束日期">
        </el-date-picker>
         <el-table
                :data="list"
                stripe
                @row-click ="checkDetail"
                fit>
                <el-table-column
                    prop="id"
                    label="时间"
                    width="90px"
                    :show-overflow-tooltip = true
                    >
                </el-table-column>

            </el-table>
    </div>
</template>

<script>
/**
 * @file   : other.vue
 * @author : jinqianqian
 * @date   : 2018-5-4 16:30:34
 */
export default {
    name: 'other',
    data() {
        return {
            datetimerange: '',
            list: [{
                id: 12222222288844444448000000
            }, {
                id: 1
            }, {
                id: 1
            }, {
                id: 1
            }, {
                id: 1
            }]
        }
    },
    methods: {
        changTime(val) {
            console.log(val);
        }
    }

}
</script>

<style lang="sass">

</style>
