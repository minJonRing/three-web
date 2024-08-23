<template>
    <div ref="p" :class="['nature', active ? 'active' : '']"
        :style="{ '--indelay': inDelay + 'ms', '--outdelay': outDelay + 'ms' }">
        <Box title="入驻企业" :ch="ch" :active="active">
            <div class="box">
                <div class="head">
                    <div class="n">企业名称</div>
                    <div class="t">入驻时间</div>
                </div>
                <div class="body">
                    <div class="list"
                        :style="{ '--height': `matrix(1,0,0,1,0,${-init.length * 40})`, '--time': init.length * 1200 + 'ms', '--indelay': inDelay + 300 + 'ms', '--outdelay': outDelay + 'ms' }">
                        <div class="item" v-for="(item, j) in list" :key="j">
                            <div class="n">{{ item.name }}</div>
                            <div class="t">{{ item.time }}</div>
                        </div>
                    </div>
                </div>
            </div>
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
            init: [
                { name: '袁辉科技', time: '2018' },
                { name: '青年家纺', time: '2018' },
                { name: '鸿腾科技', time: '2018' },
                { name: '远望科技', time: '2018' },
                { name: '晶晶有限公司', time: '2018' },
                { name: '云衣惠纺织', time: '2019' },
                { name: '李辉新能源', time: '2019' },
                { name: '云和家居', time: '2019' },
                { name: '云商科技', time: '2019' },
                { name: '毛云丽有限公司', time: '2020' },
                { name: '云盒科技', time: '2020' },
                { name: '里安微电子科技', time: '2021' },
                { name: '山崎配件有限公司', time: '2021' },
                { name: '索威科技', time: '2021' },
                { name: '万事达装饰用品', time: '2021' },
                { name: '优科电子', time: '2022' },
                { name: '蓝天环保高科技材料', time: '2022' },
                { name: '油墨股份有限公司', time: '2022' },
                { name: '顾家家居', time: '2023' },
                { name: '科能能源', time: '2023' },
                { name: '新钛合科技', time: '2023' },
                { name: '中快网络科技', time: '2023' },
                { name: '丙层贸易科技', time: '2023' },
                { name: '遥望网络科技', time: '2023' },
                { name: '宝玲科技', time: '2024' },
                { name: '光辉科技', time: '2024' },
            ],
            list: []
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
                    // this.init()
                }, this.inDelay + 600);
            } else {
                setTimeout(() => {
                    this.myChart?.dispose()
                }, this.outDelay + 600);
            }
        }
    },
    created() {
        this.list = [...this.init, ...this.init]
    },
    mounted() {
        // this.init()
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.nature {
    transition-delay: var(--outdelay);
    opacity: 0;
    transform: matrix(1, 0, 0, 1, 100, 0);
    transition-duration: 600ms;

    .box {
        height: 100%;
        overflow: hidden;

        .head {
            display: flex;
            color: #fff;
            padding: 0 42px;
            height: 50px;
            font-size: 16px;
            line-height: 50px;
            letter-spacing: 2px;
            // box-shadow: 0 0.2em 0.4em -0.2em rgba(255, 255, 255, .5);
            // border-bottom: 0.5px #fff solid;

            .n {
                width: 60%;
            }

            .t {
                width: 40%;
            }
        }

        .body {
            height: calc(100% - 50px);
            overflow: hidden;
            -webkit-mask: linear-gradient(0, transparent, #fff 5%, #fff 95%, transparent);

            .list {
                opacity: 0;
                transition-duration: 600ms;
                transition-delay: var(--outdelay);

                .item {
                    display: flex;
                    color: #fff;
                    padding: 0 42px;
                    height: 40px;
                    font-size: 14px;
                    line-height: 40px;
                    letter-spacing: 2px;

                    .n {
                        width: 60%;
                    }

                    .t {
                        width: 40%;
                    }
                }
            }
        }

    }

    &.active {
        transition-delay: var(--indelay);
        opacity: 1;
        transform: matrix(1, 0, 0, 1, 0, 0);

        .box {
            .body {
                .list {
                    opacity: 1;
                    transition-delay: var(--indelay);
                    animation: scroll var(--time) linear var(--indelay) forwards;
                }

                @keyframes scroll {
                    100% {
                        transform: var(--height);
                    }
                }
            }
        }
    }
}
</style>