<template>
    <div class="filings">
        <div class="box">
            <span>微信:112233333</span>
            <span>QQ:11231231</span>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.filings {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 24px;
    background-color: rgba(255, 255, 255, 1);
    backdrop-filter: blur(4px);
    z-index: 9;

    .box {
        max-width: 1200px;
        margin: 0 auto;
        font-size: 13px;
        line-height: 24px;
        text-align: center;

        span {
            display: inline-block;
            margin: 0 40px;
        }
    }
}
</style>