<template>
    <div>
        <h2>animated 动画</h2>
        <div>
            <transition
                name="fade"
                enter-active-class="animated slideInDown"
                leave-active-class="animated slideOutUp"
                >
            <div
                v-if="isShow"
                class="animated">上面 头部</div>
            </transition>
            <div
                v-if="!isShow"
                :class="isShow ? 'fadeInDown' : 'fadeInUp'"
                class="animated"
                >
                下面底部
            </div>
        </div>
                <!-- :class="isShow ? 'fadeInDown' : 'fadeInUp'" -->

        <button @click="isShow = !isShow">
            点击我
        </button>
    </div>
</template>

<script>
/**
 * @file   : Animated.vue
 * @author : jinqianqian
 * @date   : 12/18/2018, 11:46:35 AM
 */
export default {
    name: 'Animated',
    data() {
        return {
            isShow: true,
            fadeIn: false
        };
    },
    methods: {
    }

};
</script>

<style lang="sass" scoped>

</style>
