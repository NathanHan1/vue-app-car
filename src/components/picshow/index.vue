<template>
    <div class="picshow" ref="picshow">
        <div class="letPart">
            <Datu></Datu>
        </div>
        <div class="rightPart">
            <Tuji></Tuji>
            <MoreCar></MoreCar>
            <smallPic></smallPic>
        </div>
        <Button class="btn" @click="back">返回</Button>
    </div>
</template>
<script>
import Datu from './Datu.vue';
import MoreCar from './MoreCar.vue';
import Tuji from './Tuji.vue';
import smallPic from './smallPic.vue';

export default {
    components: {
        Datu,
        MoreCar,
        Tuji,
        smallPic
    },
    computed: {
        height() {
            return window.document.body.clientHeight;
        },
        width() {
            return window.document.body.clientWidth;
        }
    },
    created() {
        this.$store.dispatch('init');
    },
    mounted() {
        this.$refs.picshow.style.height = this.height + 'px';
        this.$refs.picshow.style.width = this.width + 'px';
    },
    methods: {
        change() {
            this.$store.state.indexSereverState = 'sjl';
            console.log(this.$store.state.indexSereverState);
        },
        back() {
            this.$store.commit('changeShowPic', { isShowPic: false });
        }
    }
};
</script>
<style>
.picshow {
    width: 1200px;
    height: 1200px;
    position: fixed;
    left: 0;
    top: 0;
    background: black;
    color: white;
    z-index: 999;
}
.rightPart {
    position: absolute;
    right: 0;
    top: 0;
    width: 350px;
    height: 100%;
}

.btn{
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 9999;
    width: 70px;
    height: 40px;
}
</style>
