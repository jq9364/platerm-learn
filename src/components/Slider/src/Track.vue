<template lang="html">
    <div
        :class="[
            'oa-slider-track',
            `oa-slider-track-${type}`
        ]"
        :style="{'width': `${trackWidth}px`}"
    >
    </div>
</template>

<script>
export default {
    name: 'SliderTrack',
    props: {
        type: {
            type: String,
            isRequire: true
        }
    },
    computed: {
        // firstValue() {
        //     return this.$parent.firstValue;
        // },
        // secondValue() {
        //     return this.$parent.secondValue;
        // },
        // isRange() {
        //     return this.$parent.range;
        // },
        // totalTrackWidth() {
        //     return this.$parent.width;
        // },
        // max() {
        //     return this.$parent.max;
        // },
        // min() {
        //     return this,$parent.min;
        // },
        trackWidth() {
            let {min, max, range, firstValue, secondValue, totalLength} = this.$parent;

            if (this.type === 'start') {
                return
            }
            else if (this.type === 'end') {
                return range
                    ? ((max - secondValue) / max) * totalLength
                    : ((max - firstValue) / max) * totalLength;
            }
            else if (this.type === 'middle' && range) {
                return ((secondValue - firstValue) / max) * totalLength;
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>
