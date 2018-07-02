<template lang="html">
    <div
        class="oa-slider-button-container"
        v-click-outside="clickOutsideHandle"
    >
        <div
            class="oa-slider-button"
            @mousedown="mousedownHandle"
            @mouseenter="mouseenterHandle"
            @mouseleave="mouseleaveHandle"
        >
        </div>
        <div class="oa-slider-button-val" v-if="disabled">{{value}}</div>
        <slider-tips @on-input="changeHandle" v-else></slider-tips>
    </div>
</template>

<script>
import SliderTips from './Tips.vue';
import ClickOutside from 'directive/clickOutside';
export default {
    name: 'SliderButton',
    components: {SliderTips},
    directives: {ClickOutside},
    data() {
        return {
            isDraging: false,
            isHover: false,
            isClick: false,
            startX: 0,
            currentX: 0
        }
    },
    props: {
        value: Number
    },
    computed: {
        min() {
            return this.$parent.min;
        },
        max() {
            return this.$parent.max;
        },
        totalLength() {
            return this.$parent.totalLength;
        },
        disabled() {
            return this.$parent.disabled;
        }
    },
    methods: {
        clickOutsideHandle() {
            this.isClick = false;
        },
        changeHandle(val) {
            if (Number.isNaN(+val) || val > this.max || val < this.min) {
                this.$emit('on-error', val);
            }
            else {
                this.$emit('on-change', val - this.value);
                this.isClick = false;
            }
        },
        mousedownHandle(e) {
            e.preventDefault();
            this.onDragStart(e);
        },
        mouseenterHandle() {
            this.isHover = true;
        },
        mouseleaveHandle() {
            this.isHover = false;
        },
        onDragStart(e) {
            if (this.$parent.disabled) return;
            this.isFocus = true;
            this.isClick = true;
            this.startX = e.clientX;
            window.addEventListener('mousemove', this.onDraging);
            window.addEventListener('mouseup', this.onDragEnd);
            window.addEventListener('contextmenu', this.onDragEnd);
        },
        onDraging(e) {
            this.isDraging = true;
            this.isClick = false;

            let diff = 0;
            this.currentX = e.clientX;
            diff = (this.currentX - this.startX) / this.totalLength * this.max;
            this.startX = this.currentX;
            this.$emit('on-change', diff);
        },
        onDragEnd(e) {
            this.isDraging = false;

            window.removeEventListener('mousemove', this.onDraging);
            window.removeEventListener('mouseup', this.onDragEnd);
            window.removeEventListener('contextmenu', this.onDragEnd);
        }
    }
}
</script>

<style lang="less">
.oa-slider-button-container {
    position: absolute;
    top: 0;
    transform: translateY(-50%);
    z-index: 100;
    background: #fff;
}
.oa-slider-button {
    width: 14px;
    height: 24px;
    box-sizing: border-box;
    border-radius: 3px;
    border: 1px solid #bfc5d1;
    cursor: pointer;
}

.oa-slider-button-container.left {
    transform: translate(-50%, -50%);
}
.oa-slider-button-container.right {
    transform: translate(-50%, -50%);
}

.oa-slider-button-container.disabled {
    top: 2px;
    .oa-slider-button {
        width: 5px;
        height: 14px;
        background: #00073e;
        border: none;
        border-radius: 1px;
    }

    .oa-slider-button-val {
        position: absolute;
        display: inline-block;
        font-size: 12px;
        color: #81899e;
        transform: translate(-25%, 6px);
    }
}
</style>
