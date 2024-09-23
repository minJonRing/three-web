<template>
    <div :class="['nav', menu ? 'active' : '']">
        <div class="d d1"></div>
        <div class="d d2"></div>
        <div class="d d3"></div>
        <div class="box">
            <div class="list">
                <div class="item" style="--delay:300ms;--outdelay:150ms" @click="handleLink('/')">
                    <img :src="Image1" />
                    <div class="text">主页</div>
                </div>
                <div class="item" style="--delay:350ms;--outdelay:100ms" @click="handleLink('/')">
                    <img :src="Image2" />
                    <div class="text">web开发</div>
                </div>
                <div class="item" style="--delay:400ms;--outdelay:50ms" @click="handleLink('/e-charts')">
                    <img :src="Image3" />
                    <div class="text">智慧大屏</div>
                </div>
                <div class="item" style="--delay:450ms;--outdelay:0ms" @click="handleLink('/')">
                    <img :src="Image4" />
                    <div class="text">数字阮生</div>
                </div>
                <div class="item" style="--delay:500ms;--outdelay:0ms">
                    <div class="lx">微信: 112233333</div>
                    <div class="lx">邮箱: 101400000@qq.com</div>
                </div>
            </div>
        </div>
        <!-- <Filings /> -->
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Image1 from '@/assets/image/nav/1.png'
import Image2 from '@/assets/image/nav/2.webp'
import Image3 from '@/assets/image/nav/3.png'
import Image4 from '@/assets/image/nav/4.jpg'
import Filings from '@/components/filings.vue'
export default {
    components: {
        Filings
    },
    data() {
        return {
            Image1,
            Image2,
            Image3,
            Image4,
        }
    },
    computed: {
        ...mapGetters(['menu'])
    },
    mounted() {

    },
    methods: {
        ...mapActions(['setMenu']),
        handleLink(v) {
            // this.setMenu(false)
            this.$router.push(v)
        }
    }
}
</script>

<style lang="scss" scoped>
.nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    opacity: 0;
    user-select: none;
    transition-delay: 600ms;
    overflow: hidden;
    pointer-events: none;

    .d {
        position: absolute;
        top: 10%;
        left: -100%;
        height: 80%;
        width: 300%;
        background-color: rgba(255, 255, 255, 1);
        transform: rotate(-45deg);
        // transition-timing-function: ease-in;
        transition-duration: 600ms;
        transform-origin: center center;
        transition-delay: 300ms;

        &.d1 {
            transform: rotate(-45deg) translateY(-200%);

        }

        &.d2 {
            transform: rotate(-45deg) scaleY(0);
            z-index: 1;
        }

        &.d3 {
            transform: rotate(-45deg) translateY(200%);
        }
    }

    .box {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;

        .list {
            width: 60%;

            .item {
                position: relative;
                display: block;
                height: 80px;
                margin: 32px 0;
                text-decoration: none;
                overflow: hidden;
                opacity: 0;
                transform: translateX(-100px);
                transition-delay: var(--outdelay);
                cursor: pointer;
                transition-duration: 600ms;

                &::after {
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    background-color: #fff;
                    opacity: 0;
                    left: 100%;
                    bottom: 0;
                    transition-duration: 300ms;
                }

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    // image-orientation: flip;
                    object-fit: cover;
                }

                .text {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    color: #fff;
                    background-color: rgba(0, 0, 0, .5);
                    backdrop-filter: blur(4px);
                    transition-duration: 600ms;
                    letter-spacing: 4px;
                }

                .lx {
                    color: #000;
                    font-size: 14px;
                    line-height: 26px;
                }

                &:hover {
                    &::after {
                        left: 0;
                        opacity: 1;
                    }

                    .text {
                        backdrop-filter: blur(0);
                    }
                }
            }
        }
    }

    &.active {
        pointer-events: auto;
        transition-delay: 0ms;
        opacity: 1;

        .d {
            transition-delay: 0;

            &.d1 {
                transform: rotate(-45deg) translateY(-99%);
            }

            &.d2 {
                transform: rotate(-45deg) scaleY(1);
            }

            &.d3 {
                transform: rotate(-45deg) translateY(99%);
            }
        }

        .box {
            .list {
                .item {

                    opacity: 1;
                    transform: translateX(0);
                    transition-delay: var(--delay);
                }
            }
        }
    }
}
</style>