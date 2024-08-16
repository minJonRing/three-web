<template>
    <div ref="p" :class="['industry', active ? 'active' : '']"
        :style="{ '--indelay': inDelay + 'ms', '--outdelay': outDelay + 'ms' }">
        <Box title="产业增速占比" unit="" :ch="ch" :active="active">
            <div ref="echart" class="d3">
                <div class="title">全年增速: {{ industry }} 亿元</div>
            </div>
        </Box>
    </div>
</template>

<script>
import Box from "../box.vue"

import * as echarts from 'echarts';
import * as d3 from 'd3'

export default {
    name: 'Industry',
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
            industry: 0
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
                    d3.select('.d3').selectAll('*').remove();
                }, this.outDelay + 600);

            }
        }
    },
    mounted() {
        // this.init()
    },
    methods: {
        init() {
            const width = this.$refs.p.clientWidth;
            const height = this.ch;
            const margin = 20;

            // 创建 SVG 容器
            const svg = d3.select(".d3")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
            // .append("g")
            // .attr("transform", `translate(${width / 2}, ${height / 2})`);
            const radius = (Math.min(width / 3, height) - margin * 2) / 20;
            const arc = d3.arc()
                .innerRadius(radius * 7)  // 内环半径
                .outerRadius(radius * 10)       // 外环半径
                .startAngle(0);

            const list = [
                {
                    svg,
                    arc,
                    backgroundColor: [{ offset: '0%', color: 'rgb(0% 7% 29%)' }, { offset: '100%', color: 'rgb(17% 43% 79%)' }],
                    foregroundColor: [{ offset: '0%', color: 'rgb(73% 38% 64%)' }, { offset: '100%', color: 'rgb(73% 61% 64%)' }],
                    value: 51,
                    titleText: "第一产业"
                },
                {
                    svg,
                    arc,
                    backgroundColor: [{ offset: '0%', color: 'rgb(0% 7% 29%)' }, { offset: '100%', color: 'rgb(17% 43% 79%)' }],
                    foregroundColor: [{ offset: '0%', color: 'rgb(13% 41% 89%)' }, { offset: '100%', color: 'rgb(13% 66% 89%)' }],
                    value: 1299,
                    titleText: "第二产业"
                },
                {
                    svg,
                    arc,
                    backgroundColor: [{ offset: '0%', color: 'rgb(0% 7% 29%)' }, { offset: '100%', color: 'rgb(17% 43% 79%)' }],
                    foregroundColor: [{ offset: '0%', color: 'rgb(60% 12% 26%)' }, { offset: '100%', color: 'rgb(100% 28% 48%)' }],
                    value: 3762,
                    titleText: "第三产业"
                }
            ]
            this.createCircle(list, { width, height })
        },
        createCircle(list, { width, height }) {
            const total = list.map(({ value }) => value).reduce((x, y) => x + y, 0)
            this.industry = total;
            for (let i in list) {
                const { svg, arc, backgroundColor, foregroundColor, value, titleText } = list[i];
                const progress = (value / total * 100).toFixed(2) / 100
                // console.log(progress)
                const group = svg.append("g")
                    .attr("width", width / 3)
                    .attr("height", height)
                    .attr("transform", `translate(${(width / 6 * (i * 2 + 1) - i * 10)}, ${height / 2 + 40})`);

                const bId = "linear-gradient-background" + Math.floor(Math.random() * 1000)
                const fId = "linear-gradient-foreground" + Math.floor(Math.random() * 1000)
                // 定义一个线性渐变
                const linearGradientBackground = group.append("defs")
                    .append("linearGradient")
                    .attr("id", bId) // 定义 ID，后续应用时引用
                    .attr("x1", "0%")
                    .attr("y1", "0%")
                    .attr("x2", "100%")
                    .attr("y2", "100%");

                for (let i in backgroundColor) {
                    const { offset, color } = backgroundColor[i];
                    linearGradientBackground
                        .append("stop")
                        .attr("offset", offset)
                        .attr("stop-color", color);
                }

                const linearGradientForeground = group.append("defs")
                    .append("linearGradient")
                    .attr("id", fId) // 定义 ID，后续应用时引用
                    .attr("x1", "100%")
                    .attr("y1", "0%")
                    .attr("x2", "100%")
                    .attr("y2", "100%");

                for (let i in foregroundColor) {
                    const { offset, color } = foregroundColor[i];
                    linearGradientForeground
                        .append("stop")
                        .attr("offset", offset)
                        .attr("stop-color", color);
                }

                // 起始角度
                const background = group.append("path")
                    .datum({ endAngle: 0 })
                    .style("fill", `url(#${bId})`)
                    .attr("d", arc);

                const foreground = group.append("path")
                    .datum({ endAngle: 0 })  // 初始化为 0 进度
                    .style("fill", `url(#${fId})`)
                    .style("stroke-linecap", "round")
                    .attr("d", arc);

                background.transition()
                    .duration(1000)
                    .attrTween("d", (d) => {
                        const interpolate = d3.interpolate(0, 2 * Math.PI * 1);
                        return (t) => {
                            d.endAngle = interpolate(t);
                            return arc(d);
                        };
                    });

                foreground.transition()
                    .duration(1000)  // 1 秒钟完成动画
                    .attrTween("d", (d) => {
                        const interpolate = d3.interpolate(0, 2 * Math.PI * progress);
                        return (t) => {
                            d.endAngle = interpolate(t);
                            return arc(d);
                        };
                    });

                const text = group.append("text")
                    .attr("text-anchor", "middle")
                    .attr("dy", ".35em")
                    .style("font-size", "18px")
                    .style('fill', `url(#${fId})`)
                    .text(`0%`);

                text.transition()
                    .duration(1000)
                    .tween("text", function () {
                        const interpolate = d3.interpolateNumber(0, progress * 100);
                        return function (t) {
                            this.textContent = interpolate(t).toFixed(2) + '%';
                        };
                    });

                const title = group.append("text")
                    .attr("text-anchor", "middle")
                    .attr("dy", ".35em")
                    // .attr('opacity', '0.7')
                    .style("font-family", "微软雅黑")
                    .style("font-size", "16px")
                    .style("letter-spacing", "4px")
                    .style('fill', 'transparent')
                    .style('transform', 'translateY(-100px)')
                    .text(titleText);

                title.transition()
                    .duration(1000)
                    .styleTween("fill", function () {
                        return d3.interpolate("transparent", foregroundColor[foregroundColor.length - 1].color);
                    });
                const v = group.append("text")
                    .attr("text-anchor", "middle")
                    .attr("dy", ".35em")
                    // .attr('opacity', '0.7')
                    .style("font-family", "微软雅黑")
                    .style("font-size", "12px")
                    .style('fill', 'transparent')
                    .style('transform', 'translateY(-76px)')
                    .text(value + '亿元');

                v.transition()
                    .duration(1000)
                    .styleTween("fill", function () {
                        return d3.interpolate("transparent", foregroundColor[0].color);
                    });
            }

        }
    }
}
</script>

<style lang="scss" scoped>
.industry {
    transition-delay: var(--outdelay);
    opacity: 0;
    transform: matrix(1, 0, 0, 1, 100, 0);
    transition-duration: 600ms;

    .box {
        .d3 {
            position: relative;
            // font-family: '微软雅黑';
            height: 100%;

            // transform: translateY();
            .title {
                position: absolute;
                top: 10px;
                left: 50%;
                color: #fff;
                font-size: 16px;
                padding: 6px 9px;
                border: 1px rgb(18% 49% 88%) solid;
                box-shadow: inset 0 0 6px rgb(18% 49% 88%);
                transform: translateX(-50%);
                line-height: 1;
            }
        }
    }

    &.active {
        transition-delay: var(--indelay);
        opacity: 1;
        transform: matrix(1, 0, 0, 1, 0, 0);
    }
}
</style>