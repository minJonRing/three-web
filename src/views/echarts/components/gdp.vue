<template>
    <div :class="['gdp', active ? 'active' : '']"
        :style="{ '--indelay': inDelay + 'ms', '--outdelay': outDelay + 'ms' }">
        <Box title="区县GDP" unit="万亿元" :ch="ch" :active="active">
            <div ref="echart" class="echart"></div>
        </Box>
    </div>
</template>

<script>
import Box from "../box.vue"

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
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#2169e3' },
                        { offset: 1, color: '#21a8e3' }
                    ])
                ],
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
                    dimensions: ['product', '2022', '2023',],
                    source: [
                        { product: '云河', 2022: 2651.25, 2023: 2936.43, },
                        { product: '上新', 2022: 2560.53, 2023: 2668.5, },
                        { product: '水滨', 2022: 2184.8, 2023: 2467.9, },
                        { product: '平海', 2022: 2063.95, 2023: 2230.69, },
                        { product: '秀山', 2022: 2003.06, 2023: 2091.5, },
                        { product: '庆祥', 2022: 1970.1, 2023: 2087.4, },
                        { product: '北化', 2022: 1226.03, 2023: 1270.39, },
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
                            fontSize: 10,
                            color: "rgb(13% 66% 89%)",
                            position: 'top',
                        },
                    },
                    {
                        type: 'bar',
                        label: {
                            show: true,
                            fontSize: 10,
                            color: "rgb(95% 68% 10%)",
                            position: 'top'
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
.gdp {
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