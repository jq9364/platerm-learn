<template>
    <div id="app" class="clear">
        <Navmenu></Navmenu>
        <!-- <img class="log" src="./assets/Struggle.jpeg"> -->
        <transition name="abc">
            <router-view class="wraper"></router-view>
        </transition>
    </div>
</template>

<script>
import Navmenu from '@/components/common/navmenu';
export default {
    name: 'App',
    components: {
        Navmenu
    },
    data() {
        return {
            num: 1
        }
    },
    created() {
        this.num++;
    }
};
</script>

<style lang="sass">
    #app
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        padding: 30px

        .wraper, .el-menu-vertical-demo
            float: left

    .log
        width: 50%
    .top
        height: 2000px
        background: #b6b6b6
        width: 200px

    .abc-enter-active, .abc-leave-active
        transition: opacity .5s;

    .abc-enter, .abc-leave-to /* .abc-leave-active below version 2.1.8 */
        opacity: 0;


</style>
