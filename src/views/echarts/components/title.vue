<template>
    <div ref="t" :class="['title', active ? 'active' : '']"
        :style="{ '--indelay': inDelay + 'ms', '--outdelay': outDelay + 'ms' }">
        <div ref="echart" class="echart"></div>
    </div>
</template>

<script>

import * as echarts from 'echarts';
export default {
    name: 'Person',
    props: {
        active: {
            type: Boolean,
            default: false
        },
        inDelay: {
            type: Number,
            default: 0
        },
        outDelay: {
            type: Number,
            default: 0
        }

    },
    data() {
        return {
        }
    },
    watch: {
        active(data) {
            if (data) {
                setTimeout(() => {
                    this.init()
                }, this.inDelay + 600);
            } else {
                setTimeout(() => {
                    this.myChart?.dispose()
                }, this.outDelay + 600);

            }
        }
    },
    mounted() {
        // this.init()
    },
    methods: {
        init() {
            // echart
            const chartDom = this.$refs.echart;
            const myChart = echarts.init(chartDom);
            const option = {
                graphic: {
                    elements: [
                        {
                            type: 'text',
                            left: 'center',
                            top: 'center',
                            style: {
                                text: '面向世界 引领未来 服务全球',
                                fontSize: 34,
                                font: "宋体",
                                // fontWeight: 'bold',
                                lineDash: [0, 200],
                                lineDashOffset: 0,
                                fill: 'transparent',
                                stroke: '#fff',
                                lineWidth: 0.5
                            },
                            keyframeAnimation: {
                                duration: 1600,
                                loop: false,
                                keyframes: [
                                    {
                                        percent: 0.7,
                                        style: {
                                            fill: 'transparent',
                                            lineDashOffset: 200,
                                            lineDash: [200, 0]
                                        }
                                    },
                                    {
                                        // Stop for a while.
                                        percent: 0.8,
                                        style: {
                                            fill: 'transparent',
                                            stroke: '#fff'
                                        }
                                    },
                                    {
                                        percent: 1,
                                        style: {
                                            fill: '#fff',
                                            stroke: 'transparent'
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            };

            myChart.setOption(option);
            this.myChart = myChart
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    transition-delay: var(--outdelay);
    height: 60px;
    opacity: 0;
    transition-duration: 600ms;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        opacity: 0;
        transition-duration: 600ms;
        width: 10px;
        height: calc(100% - 4px);
        border: 2px #fff solid;
        border-right: none;
        transition-delay: var(--outdelay);
    }

    &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 50%;
        opacity: 0;
        transition-duration: 600ms;
        width: 10px;
        height: calc(100% - 4px);
        border: 2px #fff solid;
        border-left: none;
        transition-delay: var(--outdelay);
    }

    .echart {
        height: 100%;
    }

    &.active {
        transition-delay: var(--indelay);
        opacity: 1;

        &::before {
            transition-delay: var(--indelay);
            left: 10px;
            opacity: 1;
        }

        &::after {
            transition-delay: var(--indelay);
            right: 10px;
            opacity: 1;
        }

        .echart {
            background: linear-gradient(90deg, rgba(10, 46, 103, .2), rgba(10, 46, 103, 0), rgba(10, 46, 103, .2));
        }

    }
}
</style>