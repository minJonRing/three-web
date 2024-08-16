<template>
    <div :class="['increase', active ? 'active' : '']"
        :style="{ '--indelay': inDelay + 'ms', '--outdelay': outDelay + 'ms' }">
        <Box title="GDP增速" unit="万亿元" :ch="ch" :active="active">
            <div ref="echart" class="echart"></div>
        </Box>
    </div>
</template>

<script>
import Box from "../box.vue"

import * as echarts from 'echarts';


export default {
    name: 'Increase',
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
                    new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        { offset: 0, color: '#ae34ce' },
                        { offset: 1, color: '#3666a6' }
                    ]),
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#3347d1' },
                        { offset: 1, color: '#3378d1' }
                    ]), new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        { offset: 0, color: '#36a3a1' },
                        { offset: 1, color: '#36e38a' }
                    ]),

                ],
                grid: {
                    top: '40px',
                    left: '60px',
                    right: '20px',
                    bottom: '20px',
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
                    dimensions: ['product', '去年', '当年', '增速'],
                    source: [
                        { product: '2020', '去年': 1.54, '当年': 1.62, '增速': 5.5, b: 0 },
                        { product: '2021', '去年': 1.62, '当年': 1.82, '增速': 5.5, b: 0 },
                        { product: '2022', '去年': 1.82, '当年': 1.88, '增速': 5.5, b: 0 },
                        { product: '2023', '去年': 1.88, '当年': 2.06, '增速': 5.5, b: 0 },
                        { product: '2024', '去年': 2.06, '当年': 2.18, '增速': 5.5, b: 0 },
                    ].sort((x, y) => +y.product - +x.product).map(e => {
                        return {
                            ...e,
                            '增速': ((e['当年'] - e['去年']) / e['去年'] * 100).toFixed(2),
                            b: ((e['当年'] - e['去年']) / e['去年'] * 100).toFixed(2),
                        }
                    })
                },
                xAxis: {
                    show: false,

                },
                yAxis: {
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
                // Declare several bar series, each will be mapped
                // to a column of dataset.source by default.
                series: [
                    {
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true,
                            fontSize: 10,
                            color: "#fff",
                        },
                        // labelLine: {
                        //     show: true
                        // }
                    },
                    {
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true,
                            fontSize: 10,
                            color: "#fff",
                        }
                    },
                    {
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true,
                            fontSize: 10,
                            color: "#fff",
                            formatter: '{@增速}%'
                        }
                    }
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
.increase {
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