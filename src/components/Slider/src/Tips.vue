<template lang="html">
    <div class="oa-slider-tips" v-if="showTip || isClick || isHover || isDraging">
        <template v-if="isClick">
            <div
                class="oa-slider-tips-inner"
                contenteditable="true"
                @blur="blurHandle"
            >
                {{computedValue}}
            </div>
        </template>
        <template v-else>
            <div class="oa-slider-tips-inner">
                {{computedValue}}
            </div>
        </template>
    </div>
</template>

<script>
const debounce = (func, delay) => {
    let timer = null;
    return val => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.call(this, val);
        }, delay);
    };
};

export default {
    name: 'SliderTips',
    data() {
        return {

        }
    },
    props: {

    },
    computed: {
        computedValue() {
            return parseFloat(this.$parent.$parent.formatHandle(this.$parent.value));
        },
        isHover() {
            return this.$parent.isHover;
        },
        isClick() {
            return this.$parent.isClick;
        },
        isDraging() {
            return this.$parent.isDraging;
        },
        showTip() {
            return this.$parent.$parent.showTip;
        }
    },
    methods: {
        blurHandle(e) {
            this.$emit('on-input', e.target.innerText);
        }
    }
}
</script>

<style lang="less">
.oa-slider-tips {
    position: absolute;
    height: 24px;
    border-radius: 3px;
    padding: 0 8px;
    background: #4a5266;
    color: #fff;
    font-size: 10px;
    line-height: 24px;
    left: 0;
    transform: translate(-25%, 4px);

    .oa-slider-tips-inner {
        outline: none;
    }
}
</style>
