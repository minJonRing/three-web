<template>
    <div class="home">
        <div ref="echart" id="chart">
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3'
// @ is an alias to /src
// import CssDoodle from 'css-doodle'
export default {
    name: 'HomeView',
    data() {
        return {
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {

            const data = [
                {
                    label: 'A',
                    value: 30,
                    children: [
                        { label: 'A1', value: 15 },
                        { label: 'A2', value: 15 },
                    ],
                },
                {
                    label: 'B',
                    value: 50,
                    children: [
                        { label: 'B1', value: 20 },
                        { label: 'B2', value: 30 },
                    ],
                },
                {
                    label: 'C',
                    value: 20,
                    children: [
                        { label: 'C1', value: 10 },
                        { label: 'C2', value: 10 },
                        { label: 'C3', value: 10 },
                    ],
                },
            ];

            const width = 800;
            const height = 600;
            const radius = 150;
            const radiusTransform = 170;

            const svg = d3
                .select('#chart')
                .append("svg")
                .attr('width', width)
                .attr('height', height);

            const mainGroup = svg
                .append('g')
                .attr('transform', `translate(${width / 2}, ${height / 2})`);

            const color = d3.scaleOrdinal(d3.schemeCategory10);

            const pie = d3.pie().value(d => d.value);
            const arc = d3.arc().innerRadius(50).outerRadius(radius);

            mainGroup
                .selectAll('path')
                .data(pie(data))
                .enter()
                .append('path')
                .attr('d', arc)
                .attr('fill', d => color(d.data.label))
                .attr('stroke', '#fff')
                .attr('stroke-width', 2)
                .on('mouseover', handleMouseOver)
                .on('mouseout', handleMouseOut);

            mainGroup.selectAll('text')
                .data(pie(data))
                .enter()
                .append('text')
                .attr('transform', d => {
                    const [x, y] = arc.centroid(d); // 获取扇形中心点
                    return `translate(${x}, ${y})`;
                })
                .attr('text-anchor', 'middle') // 居中对齐
                .attr('dy', '0.35em') // 调整垂直居中
                .style('fill', '#fff') // 文字颜色
                .style('font-size', '14px') // 字体大小
                .text(d => d.data.label)

            const childGroup = svg.append('g').append('g')
                .attr('transform', `translate(${width / 2}, ${height / 2})`);;

            function handleMouseOver(event, d) {
                childGroup.selectAll('*').remove();
                if (!d.data.children) return;

                const subPie = d3
                    .pie()
                    .value(d => d.value)
                    .startAngle(d.startAngle)
                    .endAngle(d.endAngle);

                const innerRadius = radiusTransform;
                const outerRadius = radiusTransform + 80;

                const subArc = d3
                    .arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius);

                childGroup
                    .selectAll('path')
                    .data(subPie(d.data.children))
                    .enter()
                    .append('path')
                    .attr('d', subArc)
                    .attr('fill', (d, i) => color(d.data.label + i))
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 1)
                    .attr('opacity', 0)
                    .transition()
                    .duration(200)
                    .delay(200)
                    .attr('opacity', 1)
                // 
                const childPie = pie(d.data.children); // 生成子数据的饼图
                const { startAngle } = d
                childGroup.selectAll(`.child-text`)
                    .data(childPie)
                    .enter()
                    .append('text')
                    .attr('class', `child-text`)
                    .attr('transform', c => {
                        const v = { ...c, startAngle: startAngle + c.startAngle, endAngle: startAngle + c.endAngle }
                        console.log(c, startAngle)
                        return `translate(${subArc.centroid(v)})`
                    })
                    .attr('text-anchor', 'middle')
                    .attr('dy', '0.35em')
                    .style('fill', '#fff')
                    .style('font-size', '14px')
                    .text(child => child.data.label);

                d3.select(event.currentTarget)
                    .transition()
                    .duration(400)
                    .attr('d', d3.arc().innerRadius(50).outerRadius(radiusTransform))
            }

            function handleMouseOut() {
                childGroup.selectAll('*').transition()
                    .duration(400)
                    .attr('opacity', 0)
                    .remove();

                d3.select(event.currentTarget)
                    .transition()
                    .duration(400)
                    .attr('d', d3.arc().innerRadius(50).outerRadius(radius))
            }

        },
    }
}
</script>

<style lang="scss" scoped>
.home {
    height: 100%;
    overflow: hidden;

    #chart {
        position: relative;
        // font-family: '微软雅黑';
        height: 800px;
        width: 600px;
    }
}
</style>