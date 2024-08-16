<template>
    <div :class="['status', active ? 'active' : '']"
        :style="{ '--indelay': inDelay + 'ms', '--outdelay': outDelay + 'ms' }">
        <Box title="发展模式" unit="" :ch="ch" :active="active">
            <div ref="echart" class="echart"></div>
        </Box>
    </div>
</template>

<script>
import Box from "../box.vue"

import * as echarts from 'echarts';


export default {
    name: 'Status',
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
            myChart: null
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
                    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#f2991a' },
                        { offset: 1, color: '#f2ad1a' }
                    ])
                ],
                grid: {
                    top: '40px',
                    left: '20px',
                    right: '20px',
                    bottom: '40px',
                },
                legend: {
                    show: false,
                },
                radar: {
                    radius: "70%",
                    // shape: 'circle',
                    indicator: [
                        { name: '经济', max: 10 },
                        { name: '教育', max: 10 },
                        { name: '人文', max: 10 },
                        { name: '农业', max: 10 },
                        { name: '生态', max: 10 },
                        { name: '历史', max: 10 }
                    ],
                    splitArea: {
                        areaStyle: {
                            color: 'transparent',
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                                { offset: 0, color: '#d475d4' },
                                { offset: 1, color: '#d49ed4' }
                            ])
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                { offset: 0, color: '#3347d1' },
                                { offset: 1, color: '#3378d1' }
                            ])
                        }
                    },
                    axisName: {
                        formatter: '{value}',
                        color: '#fff',
                        fontSize: 16,
                        letterSpacing: 3
                    },
                },
                series: [
                    {
                        // name: 'Budget vs spending',
                        type: 'radar',
                        data: [
                            {
                                value: [9.5, 9.2, 8, 7, 7.8, 6.8],
                                name: 'Allocated Budget'
                            }
                        ]
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
.status {
    transition-delay: var(--outdelay);
    opacity: 0;
    transform: matrix(1, 0, 0, 1, 100, 0);
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