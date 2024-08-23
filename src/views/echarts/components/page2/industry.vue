<template>
    <div ref="p" :class="['nature', active ? 'active' : '']"
        :style="{ '--indelay': inDelay + 'ms', '--outdelay': outDelay + 'ms' }">
        <Box title="产业结构" :ch="ch" :active="active">
            <div ref="echart" class="d3-3d"></div>
            <div class="legend">
                <!-- <div class="total" :style="{ '--indelay': inDelay + 300 + 'ms', '--outdelay': outDelay + 'ms' }">
                    总面积：<span>{{ total }}</span></div> -->
                <div class="item" v-for="(item, j) in legend" :key="j"
                    :style="{ '--color': item.color, '--indelay': (inDelay + 300 + j * 100) + 'ms', '--outdelay': outDelay + 'ms' }">
                    {{
                        item.product
                    }} <span>{{ item.value }}</span></div>
            </div>
        </Box>
    </div>
</template>

<script>
import Box from "../../box.vue"

import * as echarts from 'echarts';

import 'echarts-gl';
export default {
    name: 'Nature',
    props: {
        active: {
            type: Boolean,
            default: false
        },
        eh: {
            type: Number,
            default: 100
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
    components: {
        Box
    },
    data() {
        return {
            legend: [
                { product: '互联网', value: 54, color: "#2b54ff" },
                { product: '轻工业', value: 21, color: "#a6d1ff" },
                { product: '服务业', value: 46, color: "#d48a2b" },
                { product: '半导体', value: 9, color: "#a896ff" },
                { product: '新能源', value: 17, color: "#fc6369" },
            ]
        }
    },
    computed: {
        total() {
            return this.legend.map(({ value }) => value).reduce((x, y) => {
                return x + y
            }, 0)
        },
        ch() {
            return this.eh - 56

        }
    },
    watch: {
        active(data) {
            console.log(data)
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
            const chartDom = this.$refs.echart;
            const myChart = echarts.init(chartDom);

            const option = {
                color: [
                    new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        { offset: 0, color: '#2b54ff' },
                        { offset: 1, color: '#a8965e' }
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        { offset: 0, color: '#a6d1ff' },
                        { offset: 1, color: '#ffb0ff' }
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        { offset: 0, color: '#d48a2b' },
                        { offset: 1, color: '#36e38a' }
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        { offset: 0, color: '#a896ff' },
                        { offset: 1, color: '#a86369' }
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        { offset: 0, color: '#fc6369' },
                        { offset: 1, color: '#ffcf69' }
                    ]),

                ],
                dataset: {
                    dimensions: ['product', "value"],
                    source: this.legend.sort(function (a, b) {
                        return a.value - b.value;
                    }),
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['10%', '70%'],
                        center: ['30%', '50%'],
                        label: {
                            show: false,
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        padAngle: 6,
                        itemStyle: {
                            borderRadius: 10
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            myChart.setOption(option);
            this.myChart = myChart
        },
    }
}
</script>

<style lang="scss" scoped>
.nature {
    transition-delay: var(--outdelay);
    opacity: 0;
    transform: matrix(1, 0, 0, 1, -100, 0);
    transition-duration: 600ms;

    .box {
        .d3-3d {
            height: 100%;
        }

        .legend {
            position: absolute;
            top: 0;
            left: 50%;
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            letter-spacing: 1px;

            .total {
                position: relative;
                padding: 12px 12px 12px 36px;
                background-color: rgba(9, 36, 116, 0.5);
                color: #fff;
                line-height: 1;

                box-shadow: inset 0 0 10px rgba(158, 172, 216, 0.8);
                margin-bottom: 18px;

                &::before {
                    content: "";
                    position: absolute;
                    top: calc(50% - 6px);
                    left: 12px;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background-color: #97b8ee;
                }

                span {
                    color: #97b8ee;
                }

                transition-delay: var(--outdelay);
                opacity: 0;
                transform: matrix(1, 0, 0, 1, -20, 0);
                transition-duration: 600ms;
            }

            .item {
                position: relative;
                padding: 9px 12px 9px 36px;
                color: #fff;
                line-height: 1;
                font-size: 12px;

                &::before {
                    content: "";
                    position: absolute;
                    top: calc(50% - 4px);
                    left: 14px;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: var(--color);
                }

                span {
                    color: var(--color);
                }

                transition-delay: var(--outdelay);
                opacity: 0;
                transform: matrix(1, 0, 0, 1, -20, 0);
                transition-duration: 600ms;
            }
        }
    }

    &.active {
        transition-delay: var(--indelay);
        opacity: 1;
        transform: matrix(1, 0, 0, 1, 0, 0);

        .box {
            .legend {

                .total,
                .item {
                    transition-delay: var(--indelay);
                    opacity: 1;
                    transform: matrix(1, 0, 0, 1, 0, 0);
                }
            }
        }
    }
}
</style>