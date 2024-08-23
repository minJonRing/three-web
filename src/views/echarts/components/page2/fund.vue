<template>
    <div :class="['gdp', active ? 'active' : '']"
        :style="{ '--indelay': inDelay + 'ms', '--outdelay': outDelay + 'ms' }">
        <Box title="内外资占比" unit="" :ch="ch" :active="active">
            <div ref="echart" class="echart"></div>
        </Box>
    </div>
</template>

<script>
import Box from "../../box.vue"

import * as echarts from 'echarts';


export default {
    name: 'Gdp',
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
                visualMap: {
                    min: 0,
                    max: 150,
                    show: false,
                    color: ["#f0bdff", "#edbd85", "#54bd85", "#ed6985"]
                },
                grid: {
                    top: '20px',
                    left: '20px',
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
                        ['product', '企业数量'],
                        ['内资', 95],
                        ['外资', 4],
                        ['合资', 36],
                        ['国企', 12],
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
                    show: false
                },
                // Declare several bar series, each will be mapped
                // to a column of dataset.source by default.
                series: [
                    {
                        type: 'bar',
                        label: {
                            show: true,
                            fontSize: 15,
                            color: "#fff",
                            position: 'top',
                        },
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
.gdp {
    transition-delay: var(--outdelay);
    opacity: 0;
    transform: matrix(1, 0, 0, 1, 0, 100);
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