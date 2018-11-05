<template>
    <div class="bigPic">
        <img width="900" :src="`http://localhost:${port}/carimages/${picshowState.id}/${picshowState.album}/${pic}`">
        <button class="lBtn" @click="goPrev">&lt;</button>
        <button class="rBtn" @click="goNext">&gt;</button>
    </div>
</template>
<script>
export default {
    computed: {
        picshowState() {
            //获取车辆的信息
            return this.$store.state.picshowState;
        },
        pic() {
            var _state = this.$store.state.picshowState;
            return this.$store.state.picshowState.info.images[_state.album][_state.idx];
        },
        port() {
            return this.$store.state.indexSereverState.SERVER_PORT;
        }
    },
    methods: {
        goNext() {
            // this.$store.commit("goNext")
            this.$store.dispatch('goNext');
        },
        goPrev() {
            this.$store.dispatch('goPrev');
        }
    }
};
</script>
<style>
.bigPic {
    width: 900px;
    position: relative;
}
.leftPart button {
    position: absolute;
    top: 0;
    width: 200px;
    height: 100%;
    opacity: 0;
}
.lBtn {
    position: absolute;
    left: 0;
    bottom: 50%;
    transform: translateY(50%);
    width: 70px;
    height: 30px;
    background: rgba(29, 26, 250, 0.5);
    font-size: 30px;
    line-height: 30px;
    color: white;
}
.rBtn {
    font-size: 30px;
    line-height: 30px;
    color: white;
    position: absolute;
    z-index: 100;
    bottom: 50%;
    transform: translateY(50%);
    right: 0;
    width: 70px;
    height: 30px;
    background: rgba(29, 26, 250, 0.5);
}
</style>