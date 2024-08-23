<template>
    <div :class="['talent', active ? 'active' : '']"
        :style="{ '--indelay': inDelay + 'ms', '--outdelay': outDelay + 'ms' }">
        <Box title="入住企业" unit="" :ch="ch" :active="active">
            <div ref="echart" class="echart"></div>
        </Box>
    </div>
</template>

<script>
import Box from "../../box.vue"

import * as echarts from 'echarts';


export default {
    name: 'Talent',
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
            const chartDom = this.$refs.echart;
            const myChart = echarts.init(chartDom);

            const option = {
                color: [
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#fc8aff' },
                        { offset: 1, color: '#fcd6ff' }
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        { offset: 0, color: '#ffc969' },
                        { offset: 1, color: '#fff769' }
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        { offset: 0, color: '#3dbd69' },
                        { offset: 1, color: '#3dff69' }
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        { offset: 0, color: '#382969' },
                        { offset: 1, color: '#702969' }
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        { offset: 0, color: '#384fd6' },
                        { offset: 1, color: '#38bdd6' }
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        { offset: 0, color: '#abbdd6' },
                        { offset: 1, color: '#edbdd6' }
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        { offset: 0, color: '#8fbd24' },
                        { offset: 1, color: '#8fbd78' }
                    ]),
                ],
                grid: {
                    top: '40px',
                    left: '40px',
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
                        ['product', '企业数量', '互联网', '轻工业', '服务业', '半导体', '新能源'],
                        ['2018', 78, 30, 12, 26, 4, 6],
                        ['2019', 89, 34, 14, 30, 5, 8],
                        ['2020', 105, 40, 17, 34, 7, 11],
                        ['2021', 126, 45, 17, 42, 9, 14],
                        ['2022', 140, 48, 21, 45, 9, 17],
                        ['2023', 147, 54, 21, 46, 9, 17],
                    ]
                },
                xAxis: {
                    type: 'category',
                    axisLine: {
                        show: false,
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
                series: new Array(6).fill({
                    type: 'line',
                    smooth: true,
                    // showSymbol: false,
                    label: {
                        show: true,
                        fontSize: 10,
                        color: "#fff",
                    },
                    areaStyle: {
                        opacity: 0.3,
                    },
                })
                // [
                //     {
                //         type: 'line',
                //         smooth: true,
                //         showSymbol: false,
                //         label: {
                //             show: true,
                //             fontSize: 10,
                //             color: "#fff",
                //         },
                //         areaStyle: {
                //             opacity: 0.8,
                //         },
                //     },
                //     {
                //         type: 'line',
                //         smooth: true,
                //         label: {
                //             show: true,
                //             fontSize: 10,
                //             color: "#fff",
                //         },
                //         areaStyle: {
                //             opacity: 0.8,
                //         },
                //     },
                //     {
                //         type: 'line',
                //         smooth: true,
                //         label: {
                //             show: true,
                //             fontSize: 10,
                //             color: "#fff",
                //         },
                //         areaStyle: {
                //             opacity: 0.8,
                //         },
                //     },
                //     {
                //         type: 'line',
                //         smooth: true,
                //         label: {
                //             show: true,
                //             fontSize: 10,
                //             color: "#fff",
                //         },
                //         areaStyle: {
                //             opacity: 0.8,
                //         },
                //     }, {
                //         type: 'line',
                //         smooth: true,
                //         label: {
                //             show: true,
                //             fontSize: 10,
                //             color: "#fff",
                //         },
                //         areaStyle: {
                //             opacity: 0.8,
                //         },
                //     }
                //     , {
                //         type: 'line',
                //         smooth: true,
                //         // stack: 'value',
                //         // showSymbol: false,
                //         label: {
                //             show: true,
                //             fontSize: 10,
                //             color: "#fff",
                //         },
                //         areaStyle: {
                //             opacity: 0.8,
                //         },
                //     }
                // ]
            };
            myChart.setOption(option);
            this.myChart = myChart
        },
    }
}
</script>

<style lang="scss" scoped>
.talent {
    transition-delay: var(--outdelay);
    opacity: 0;
    transform: matrix(1, 0, 0, 1, -100, 0);
    transition-duration: 600ms;

    .box {
        .echart {
            height: 100%;
        }
    }

    &.active {
        transition-delay: var(--indelay);
        opacity: 1;
        transform: matrix(1, 0, 0, 1, 0, 0);
    }
}
</style>