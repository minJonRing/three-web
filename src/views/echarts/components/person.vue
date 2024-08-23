<template>
    <div ref="p" :class="['person', active ? 'active' : '']"
        :style="{ '--indelay': inDelay + 'ms', '--outdelay': outDelay + 'ms' }">
        <Box title="人口" unit="万人" :ch="ch" :active="active">
            <div class="layout">
                <div class="text" :style="{ '--indelay': inDelay + 300 + 'ms', '--outdelay': outDelay + 'ms' }">
                    <div class="box cz">
                        <div class="number">
                            常住人口：<span id="count-cz"></span>
                        </div>
                        <div class="number number-d">
                            常住人口：<span id="count-cz-d"></span>
                        </div>
                    </div>
                    <div class="box lr">
                        <div class="number">
                            流入人口：<span id="count-lr"></span>
                        </div>
                        <div class="number number-d">
                            流入人口：<span id="count-lr-d"></span>
                        </div>
                    </div>
                </div>
                <div ref="echart" class="echart"></div>
            </div>
        </Box>
    </div>
</template>

<script>
import Box from "../box.vue"

import * as echarts from 'echarts';
import * as d3 from 'd3'
import { CountUp } from 'countup.js';
export default {
    name: 'Person',
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
        }
    },
    computed: {
        ch() {
            return this.eh - 56

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
            const countOption = {
                decimalPlaces: 1
            }

            const countUp = new CountUp('count-cz', 1252.3, countOption);
            countUp.start()

            const countUpD = new CountUp('count-cz-d', 1252.3, countOption);
            countUpD.start()


            const countUpLr = new CountUp('count-lr', 16.5, countOption);
            countUpLr.start()

            const countUpLrD = new CountUp('count-lr-d', 16.5, countOption);
            countUpLrD.start()

            this.initEChart()
        },
        initEChart() {
            // echart
            const chartDom = this.$refs.echart;
            const myChart = echarts.init(chartDom);

            const option = {
                color: [
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#fc8aff' },
                        { offset: 1, color: '#fcd6ff' }
                    ]), new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        { offset: 0, color: '#1f73ff' },
                        { offset: 1, color: '#1fc9ff' }
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        { offset: 0, color: '#eb3d47' },
                        { offset: 1, color: '#eb8c1c' }
                    ]),
                ],
                grid: {
                    top: '40px',
                    left: '60px',
                    right: '20px',
                    bottom: '30px',
                },
                legend: {
                    show: true,
                    right: '20px',
                    textStyle: {
                        color: "#fff"
                    },
                    icon: "circle"
                },
                dataset: {
                    source: [
                        ['product', '常住人口', '增长'],
                        ['2014', 1013.5, 22.1],
                        ['2015', 1038, 24.5],
                        ['2016', 1061, 23],
                        ['2017', 1092.1, 31.1],
                        ['2018', 1125.4, 33.3],
                        ['2019', 1161.3, 35.9],
                        ['2020', 1196.5, 35.2],
                        ['2021', 1220.4, 33.9],
                        ['2022', 1237.6, 17.2],
                        ['2023', 1252.2, 14.6],
                    ]
                },
                xAxis: {
                    type: 'category',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#fff",
                            type: 'dotted'
                        }
                    },
                    axisTick: {
                        show: false
                    }

                },
                yAxis: {
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#fff",
                            type: 'dotted'
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                // Declare several bar series, each will be mapped
                // to a column of dataset.source by default.
                series: [
                    {
                        type: 'line',
                        // stack: 'value',
                        // showSymbol: false,
                        label: {
                            show: true,
                            fontSize: 10,
                            color: "#fff",
                        },
                    },
                    {
                        type: 'line',
                        // stack: 'value',
                        // showSymbol: false,
                        label: {
                            show: true,
                            fontSize: 10,
                            color: "#fff",
                        },
                    },
                ]
            };
            myChart.setOption(option);
            this.myChart = myChart
        }
    }
}
</script>

<style lang="scss" scoped>
.person {
    transition-delay: var(--outdelay);
    opacity: 0;
    transform: matrix(1, 0, 0, 1, 0, 100);
    transition-duration: 600ms;

    .layout {
        position: relative;
        height: 100%;
        display: flex;

        .text {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 24px;

            .box {
                // position: absolute;
                position: relative;
                margin: 20px 0;
                padding-left: 40px;

                .number {
                    background: linear-gradient(0, #146ada, #fff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    color: transparent;
                    padding: 0 18px;
                    font-size: 32px;
                    line-height: 1;
                    transform: matrix(1, 0, 0, 1, -80, 0);
                    transition-delay: var(--outdelay);
                    opacity: 0;
                    transition-duration: 300ms;
                    margin-bottom: 2px;

                    span {
                        font-weight: bold;
                    }
                }

                .number-d {
                    background: linear-gradient(0, #146ada, transparent);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    transform-origin: center;
                    transform: matrix(1, 0, 0, -1, 80, 0);
                    // -webkit-mask: linear-gradient(0, #fff -100%, transparent 80%)
                    -webkit-mask: linear-gradient(0, #fff, transparent);

                    filter: blur(1px)
                }
            }
        }

        .echart {
            width: 50%;
            height: 100%;
        }

    }

    &.active {
        transition-delay: var(--indelay);
        opacity: 1;
        transform: matrix(1, 0, 0, 1, 0, 0);

        .layout {
            .text {
                .box {
                    .number {
                        transition-delay: var(--indelay);
                        opacity: 1;
                        transform: matrix(1, 0, 0, 1, 0, 0);
                    }

                    .number-d {
                        transform: matrix(1, 0, 0, -1, 0, 0);
                    }
                }
            }
        }
    }
}
</style>