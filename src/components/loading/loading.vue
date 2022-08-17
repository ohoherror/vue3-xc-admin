<template>
    <div class="loading" v-show="msg.show">
        <div class="load-box">
            <img src="@/assets/img/loading.gif">
            <!--<img src="@/assets/img/loading_white.png">-->
            <span>{{ msg.title }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'loading',
    props: {
        msg: Object,
    }
}
</script>

<style scoped lang="scss">
.loading {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;

    .load-box {
        background-color: rgba(0, 0, 0, .5);
        width: 100px;
        height: 100px;
        border-radius: 5px;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, .5);
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        letter-spacing: .8px;
        font-size: 13px;

        img {
            width: 30px;
            margin-bottom: 8px;
            -webkit-animation: rotate .8s linear infinite;
        }
    }
}

@keyframes rotate {
    to {
        transform: rotate(360deg);
    }
}
</style>
