<template>
    <div :class="['box', active ? 'active' : '']">
        <div v-if="title" class="b-title">
            <div class="zs left"></div>
            <div class="zs right"></div>
            <div class="text">
                <slot name="title">
                    <span>{{ title }}</span>
                    <span>{{ unit }}</span>
                </slot>
            </div>
        </div>
        <div ref="content" class="content" :style="{ height: `${ch}px` }">
            <svg class="border" :width="cw" :height="ch" :viewBox="viewBox" version="1.1">
                <polyline :points="polylinePath1" fill="transparent" stroke="#0d377c" stroke-linecap="square"
                    stroke-width="4" />
                <polyline :points="polylinePath2" fill="transparent" stroke="#0d377c" stroke-linecap="square"
                    stroke-width="4" />
                <polygon class="polygon" v-for="(i, j) in points" :key="j" height="100%" width="100%" :points="i"
                    fill="#5596ff" :style="{ '--delay': j > 5 ? (j - 5) * 100 + 'ms' : j * 100 + 'ms' }">
                </polygon>
            </svg>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Box',
    props: {
        title: {
            type: String,
            default: ""
        },
        unit: {
            type: String,
            default: ""
        },
        ch: {
            type: Number,
            default: 100
        },
        active: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            cw: 0,
            viewBox: '0 0 100 100',
            polylinePath1: "",
            polylinePath2: "",
            points: [],
        }
    },
    mounted() {
        // this.cw = this.$refs.content;
        const { clientWidth, clientHeight } = this.$refs.content;
        this.cw = clientWidth;
        this.viewBox = `0 0 ${clientWidth} ${clientHeight}`;
        const w = 10;
        this.polylinePath1 = `${w},0 0,${w} 0,${clientHeight - w} ${w},${clientHeight}`;
        this.polylinePath2 = `${clientWidth - w},0 ${clientWidth},${w} ${clientWidth},${clientHeight - w} ${clientWidth - w},${clientHeight}`;
        const p = 6;
        const pc = 5;
        const t = 10
        const tc = 5
        const ic = 10
        const pointsA = []
        for (let i = 0; i < 3; i++) {
            pointsA.push(`${p},${t + tc + i * ic} ${p + pc},${t + i * ic} ${p + pc},${t + tc + i * ic} ${p},${t + tc * 2 + i * ic}`)
        }
        const pointsB = []
        for (let i = 2; i >= 0; i--) {
            pointsB.push(`${p},${clientHeight - t - tc - i * ic} ${p + pc},${clientHeight - t - i * ic} ${p + pc},${clientHeight - t - tc - i * ic} ${p},${clientHeight - t - tc * 2 - i * ic}`)
        }
        const pointsC = []
        for (let i = 0; i < 3; i++) {
            pointsC.push(`${clientWidth - p},${t + tc + i * ic} ${clientWidth - p - pc},${t + i * ic} ${clientWidth - p - pc},${t + tc + i * ic} ${clientWidth - p},${t + tc * 2 + i * ic}`)
        }
        const pointsD = []
        for (let i = 2; i >= 0; i--) {
            pointsD.push(`${clientWidth - p},${clientHeight - t - tc - i * ic} ${clientWidth - p - pc},${clientHeight - t - i * ic} ${clientWidth - p - pc},${clientHeight - t - tc - i * ic} ${clientWidth - p},${clientHeight - t - tc * 2 - i * ic} `)
        }
        this.points = [...pointsA, ...pointsB, ...pointsC, ...pointsD]
    }
}
</script>

<style lang="scss" scoped>
.box {
    .b-title {
        position: relative;
        background: linear-gradient(90deg, rgba(10, 46, 103, .6), rgba(10, 46, 103, .3), rgba(10, 46, 103, .6));
        overflow: hidden;
        margin-bottom: 20px;

        .zs {
            position: absolute;
            top: 0;
            width: 2px;
            height: 100%;
            background-color: #5596ff;
            pointer-events: none;

            &.left {
                left: 0;
                transform: matrix(1.1, 0, 0, 1.1, 0, 0);
                transition-duration: 600ms;

                &::before {
                    position: absolute;
                    content: "";
                    width: 0;
                    height: 0;
                    border: 3px #5596ff solid;
                    top: 0;
                    left: 1px;
                    border-right-color: transparent;
                    border-bottom-color: transparent;
                }

                &::after {
                    position: absolute;
                    content: "";
                    width: 0;
                    height: 0;
                    border: 3px #5596ff solid;
                    bottom: 0;
                    left: 1px;
                    border-top-color: transparent;
                    border-right-color: transparent;
                }
            }

            &.right {
                right: 0;
                transform: matrix(1.1, 0, 0, 1.1, 0, 0);
                transition-duration: 600ms;

                &::before {
                    position: absolute;
                    content: "";
                    width: 0;
                    height: 0;
                    border: 3px #5596ff solid;
                    top: 0;
                    right: 1px;
                    border-bottom-color: transparent;
                    border-left-color: transparent;
                }

                &::after {
                    position: absolute;
                    content: "";
                    width: 0;
                    height: 0;
                    border: 3px #5596ff solid;
                    bottom: 0;
                    right: 1px;
                    border-top-color: transparent;
                    border-left-color: transparent;
                }
            }
        }

        .text {
            height: 36px;
            line-height: 36px;
            padding: 0 18px;
            font-size: 15px;
            color: #fefefe;
            letter-spacing: 2px;
            display: flex;
            justify-content: space-between;
        }

        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0px;
            width: 0px;
            height: 2px;
            /* background: linear-gradient(90deg, #fff, #5596ff 80%, #5596ff 82%, #fff); */
            background: #fff;
            border-top-right-radius: 1px;
            border-bottom-right-radius: 1px;
            -webkit-mask: linear-gradient(90deg, transparent, #fff 90%);
        }


    }

    .content {
        position: relative;
        --w: 10px;
        clip-path: polygon(0 var(--w), var(--w) 0, calc(100% - var(--w)) 0, 100% var(--w), 100% calc(100% - var(--w)), calc(100% - var(--w)) 100%, var(--w) 100%, 0 calc(100% - var(--w)));
        background: linear-gradient(90deg, rgba(10, 46, 103, .2), rgba(10, 46, 103, 0), rgba(10, 46, 103, .2));

        .border {
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;

            .polygon {
                opacity: 0;
                animation: opacity 1800ms linear var(--delay) infinite;
            }

            @keyframes opacity {
                12% {
                    opacity: 1;
                }

                24% {
                    opacity: 0;
                }

                100% {
                    opacity: 0;
                }
            }
        }


    }

    &.active {
        .b-title {
            .zs {
                transform: matrix(1, 0, 0, 1, 0, 0);
            }

            &::after {
                animation: animate 1000ms ease-in var(--indelay);
            }

            @keyframes animate {
                35% {
                    width: 100px;
                }

                45% {
                    width: 100px;
                }

                100% {
                    width: 0;
                    left: 100%;
                }
            }
        }
    }
}
</style>