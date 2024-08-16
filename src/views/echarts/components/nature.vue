<template>
    <div :class="['nature', active ? 'active' : '']"
        :style="{ '--indelay': inDelay + 'ms', '--outdelay': outDelay + 'ms' }">
        <Box title="自然资源" unit="平方千米" :ch="ch" :active="active">
            <div ref="echart" class="echart"></div>
            <div class="legend">
                <div class="total" :style="{ '--indelay': inDelay + 300 + 'ms', '--outdelay': outDelay + 'ms' }">
                    总面积：<span>{{ total }}</span></div>
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
import Box from "../box.vue"

import * as echarts from 'echarts';


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
            myChart: null,
            legend: [
                { product: '未使用地', value: 243, color: "#d475d4" },
                { product: '农业用地', value: 304, color: "#218fd4" },
                { product: '建设用地', value: 345, color: "#d48a2b" },
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
                    this.myChart.dispose()
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
                        { offset: 0, color: '#d475d4' },
                        { offset: 1, color: '#d49ed4' }
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#218fd4' },
                        { offset: 1, color: '#21bfd4' }
                    ]), new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        { offset: 0, color: '#d48a2b' },
                        { offset: 1, color: '#36e38a' }
                    ]),

                ],
                legend: {
                    show: false,
                    top: 'middle',
                    right: '30px',
                    width: "100px",
                    textStyle: {
                        color: "#fff"
                    },
                },
                dataset: {
                    dimensions: ['product', "value"],
                    source: [
                        { product: '未使用地', value: 243 },
                        { product: '农业用地', value: 304 },
                        { product: '建设用地', value: 345 },
                    ].sort(function (a, b) {
                        return a.value - b.value;
                    }),
                },
                series: [
                    {
                        name: '自然资源',
                        type: 'pie',
                        radius: '70%',
                        center: ['30%', '50%'],
                        roseType: 'radius',
                        label: {
                            show: false,
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        itemStyle: {
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 1)'
                        },
                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
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
        .echart {
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