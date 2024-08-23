<template>
    <div ref="p" :class="['nature', active ? 'active' : '']"
        :style="{ '--indelay': inDelay + 'ms', '--outdelay': outDelay + 'ms' }">
        <Box title="2023年电力使用情况" :ch="ch" :active="active">
            <div ref="echart" class="echart"></div>
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

        }
    },
    computed: {
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
            const getVirtualData = (year) => {
                const date = +echarts.time.parse(year + '-01-01');
                const end = +echarts.time.parse(+year + 1 + '-01-01');
                const dayTime = 3600 * 24 * 1000;
                const data = [];
                for (let time = date; time < end; time += dayTime) {
                    data.push([
                        echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
                        Math.floor(Math.random() * 10000)
                    ]);
                }
                return data;
            }
            const data = getVirtualData('2016')
            const option = {
                legend: {
                    show: false,
                    textStyle: {
                        color: "#fff"
                    },
                    // icon: "circle"
                },
                visualMap: {
                    min: 0,
                    max: 10000,
                    type: 'piecewise',
                    orient: 'horizontal',
                    left: 'center',
                    top: 5,
                    textStyle: {
                        color: "#fff"
                    }
                },

                calendar: {
                    top: 50,
                    left: 50,
                    right: 30,
                    bottom: 20,
                    cellSize: ['auto', 13],
                    range: '2016',
                    itemStyle: {
                        color: 'transparent',
                        borderWidth: 1,
                        borderColor: '#90bafc'
                        // borderWidth: 0.5
                    },
                    yearLabel: { show: false },
                    dayLabel: {
                        show: true,
                        color: "#fff"
                    },
                    monthLabel: {
                        show: true,
                        color: "#fff"
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#4570ff',
                            width: 1.5,
                            type: 'solid'
                        }
                    },
                },
                series: [
                    //     {
                    //     type: 'heatmap',
                    //     coordinateSystem: 'calendar',
                    //     data: getVirtualData('2016'),
                    //     universalTransition: {
                    //         enabled: true
                    //     },
                    //     itemStyle: {
                    //         color: 'transparent',
                    //     }
                    // },
                    {
                        name: 'Steps',
                        type: 'scatter',
                        coordinateSystem: 'calendar',
                        data: data,
                        symbolSize: function (val) {
                            return val[1] / 500;
                        },
                        itemStyle: {
                            color: '#ddb926'
                        }
                    },
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
    transform: matrix(1, 0, 0, 1, 0, 100);
    transition-duration: 600ms;

    .echart {
        height: 100%;
        // color: transparent;
    }

    &.active {
        transition-delay: var(--indelay);
        opacity: 1;
        transform: matrix(1, 0, 0, 1, 0, 0);

    }
}
</style>