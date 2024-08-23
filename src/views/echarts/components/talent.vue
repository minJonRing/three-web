<template>
    <div :class="['talent', active ? 'active' : '']"
        :style="{ '--indelay': inDelay + 'ms', '--outdelay': outDelay + 'ms' }">
        <Box title="人才引进" unit="人" :ch="ch" :active="active">
            <div ref="echart" class="echart"></div>
        </Box>
    </div>
</template>

<script>
import Box from "../box.vue"

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
                        ['product', '本科', '硕士', '博士'],
                        ['2018', 13945, 3541, 1320],
                        ['2019', 15410, 3990, 1652],
                        ['2020', 14011, 4520, 1755],
                        ['2021', 14856, 4355, 1945],
                        ['2022', 15241, 4952, 2123],
                        ['2023', 16452, 5867, 2452],
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
                        }
                    },
                    {
                        type: 'line',
                        // stack: 'value',
                        // showSymbol: false,
                        label: {
                            show: true,
                            fontSize: 10,
                            color: "#fff",
                        }
                    },
                ]
            };
            myChart.setOption(option);
            this.myChart = myChart
            setTimeout(() => {
                // loop()
            }, 3000);
            const loop = () => {
                const option = {
                    dataset: {
                        dimensions: ['product', '2022', '2023',],
                        source: [
                            { product: '云河', 2022: (Math.random() * 200 + 20).toFixed(2), 2023: (Math.random() * 200 + 20).toFixed(2), },
                            { product: '上新', 2022: (Math.random() * 200 + 20).toFixed(2), 2023: (Math.random() * 200 + 20).toFixed(2), },
                            { product: '水滨', 2022: (Math.random() * 200 + 20).toFixed(2), 2023: (Math.random() * 200 + 20).toFixed(2), },
                            { product: '平海', 2022: (Math.random() * 200 + 20).toFixed(2), 2023: (Math.random() * 200 + 20).toFixed(2), },
                            { product: '秀山', 2022: (Math.random() * 200 + 20).toFixed(2), 2023: (Math.random() * 200 + 20).toFixed(2), },
                            { product: '庆祥', 2022: (Math.random() * 200 + 20).toFixed(2), 2023: (Math.random() * 200 + 20).toFixed(2), },
                            { product: '北化', 2022: (Math.random() * 200 + 20).toFixed(2), 2023: (Math.random() * 200 + 20).toFixed(2), },
                            // { product: '临平', 2022: (Math.random() * 200 + 20).toFixed(2), 2023: (Math.random() * 200 + 20).toFixed(2), },
                            // { product: '富阳', 2022: (Math.random() * 200 + 20).toFixed(2), 2023: (Math.random() * 200 + 20).toFixed(2), },
                            // { product: '临安', 2022: (Math.random() * 200 + 20).toFixed(2), 2023: (Math.random() * 200 + 20).toFixed(2), },
                        ]
                    },
                }
                myChart.setOption(option);
                setTimeout(() => {
                    loop()
                }, 3000);
            }

        },
    }
}
</script>

<style lang="scss" scoped>
.talent {
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