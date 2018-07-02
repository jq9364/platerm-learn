<template lang="html">
    <div class="oa-slider oa-slider-container">
        <div
            :class="`${prefixCls}-track-container`"
            ref="track"
            :style="{'width': `${width}px`}"
        >
            <template v-if="range">
                <div
                    ref="track1"
                    :class="[
                        'oa-slider-track',
                        'oa-slider-track-start'
                    ]"
                >
                </div>
                <slider-button
                    :value="firstValue"
                    @on-change="firstChangeHandle"
                    :class="['left', disabled ? 'disabled' : '']"
                    ref="btn1"
                >
                </slider-button>
                <div
                    :class="[
                        'oa-slider-track',
                        'oa-slider-track-middle'
                    ]"
                    ref="track2"
                >
                </div>
                <slider-button
                    :value="secondValue"
                    @on-change="secondChangeHandle"
                    :class="['right', disabled ? 'disabled' : '']"
                    ref="btn2"
                >
                </slider-button>
                <div
                    :class="[
                        'oa-slider-track',
                        'oa-slider-track-end'
                    ]"
                    ref="track3"
                >
                </div>
            </template>
            <template v-else>
                <div
                    ref="track1"
                    :class="[
                        'oa-slider-track',
                        'oa-slider-track-start'
                    ]"
                ></div>
                <slider-button
                    :value="firstValue"
                    @on-change="firstChangeHandle"
                    :class="['left', disabled ? 'disabled' : '']"
                    ref="btn1"
                >
                </slider-button>
                <div
                    :class="[
                        'oa-slider-track',
                        'oa-slider-track-end'
                    ]"
                    ref="track3"
                >
                </div>
            </template>
            <div :class="`${prefixCls}-track-min`">{{min}}</div>
            <div :class="`${prefixCls}-track-max`">{{max}}</div>
        </div>
    </div>
</template>

<script>
import SliderButton from './Button.vue';

const prefixCls = 'oa-slider';
export default {
    name: 'Slider',
    components: {SliderButton},
    data() {
        return {
            prefixCls: prefixCls,
            firstValue: 0,
            secondValue: this.max,
            totalLength: 0
        }
    },
    props: {
        width: Number,
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 1
        },
        range: {
            type: Boolean,
            default: false
        },
        showTip: {
            type: Boolean,
            default: true
        },
        showTipInput: {
            type: Boolean,
            default: false
        },
        formatHandle: {
            type: Function,
            default: val => val
        },
        firstDefaultValue: {
            type: Number,
            default: 0
        },
        secondDefaultValue: {
            type: Number,
            default: 0
        },
        disabled: {
            tyoe: Boolean,
            default: false
        }
    },
    methods: {
        firstChangeHandle(diff) {
            this.firstValue = this.firstValue + diff;
            if (this.firstValue > this.secondValue) {
                this.firstValue = this.secondValue;
            }
            else if (this.firstValue < this.min) {
                this.firstValue = this.min;
            }
            this.computedStyle();
            this.$emit('on-first-change', this.firstValue);
        },
        secondChangeHandle(diff) {
            this.secondValue = this.secondValue + diff;
            if (this.secondValue > this.max) {
                this.secondValue = this.max;
            }
            else if (this.secondValue < this.firstValue) {
                this.secondValue = this.firstValue;
            }
            this.computedStyle();
            this.$emit('on-second-change', this.secondValue);
        },
        computedStyle() {
            const refs = this.$refs;
            let btn1 = refs.btn1.$el;
            let track1 = refs.track1;
            let track3 = refs.track3;
            let {max, min, firstValue, secondValue, totalLength} = this;

            track1.style.width = ((firstValue - min) / max) * totalLength + 'px';
            btn1.style.left = firstValue / max * totalLength + 'px';
            track3.style.width = ((max - firstValue) / max) * totalLength + 'px';

            if (this.range) {
                let btn2 = refs.btn2.$el;
                let track2 = refs.track2;
                btn2.style.left = this.secondValue / max * totalLength + 'px';
                track2.style.width = ((secondValue - firstValue) / max) * totalLength + 'px';
                track3.style.width = ((max - secondValue) / max) * totalLength + 'px';
            }
        }
    },
    mounted() {
        this.totalLength = this.width || this.$refs.track.clientWidth;
        this.firstValue = this.firstDefaultValue;
        if (this.range) {
            this.secondValue = this.secondDefaultValue;
        }
        this.computedStyle();
    }
}
</script>

<style lang="less" scoped>
.oa-slider {
    .oa-slider-track-container {
        width: 374px;
        height: 4px;
        border-radius: 4px;
        position: relative;
        background-color: #bfc5d1;
        font-size: 0;
    }

    .oa-slider-track-min,
    .oa-slider-track-max {
        position: absolute;
        font-size: 12px;
        color: #81899e;
        top: 8px;
    }

    .oa-slider-track-min {
        left: 0;
    }

    .oa-slider-track-max {
        right: 0;
    }
    .oa-slider-track {
        height: 4px;
        border-radius: 4px;
        display: inline-block;
    }

    .oa-slider-track-start {
        background-color: #bfc5d1;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .oa-slider-track-middle {
        background-color: #ff9421;
        border-radius: 0;
    }

    .oa-slider-track-end {
        background-color: #05d26d;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
}
</style>
