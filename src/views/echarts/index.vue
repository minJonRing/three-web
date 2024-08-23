<template>
    <div class="e-charts">
        <div class="transform">
            <div class="map"></div>
            <div class="data"></div>
            <!-- 图表 -->
            <div :class="['head', loog ? 'active' : '']">
                <div class="title">
                    <span class="text">智慧数字城市</span>
                    <span class="shimmer"></span>
                </div>
                <div class="btns">
                    <div :class="['raise', active === 1 ? 'active' : '']" @click="handlAactive(1)"><span>主页</span></div>
                    <div :class="['raise', active === 2 ? 'active' : '']" @click="handlAactive(2)"><span>园区</span></div>
                </div>
                <div class="time">{{ time }}</div>
            </div>
            <!-- 图1 -->
            <Gdp class="container l cl1" :active="active === 1" :eh="300" :inDelay="300" :outDelay="500" />
            <Increase class="container l cl2" :active="active === 1" :eh="300" :inDelay="500" :outDelay="300" />
            <Nature class="container l cl3" :active="active === 1" :eh="320" :inDelay="700" :outDelay="100" />
            <!-- page2 -->
            <IndustryP2 class="container l cl1" :active="active === 2" :eh="300" :inDelay="300" :outDelay="500" />
            <OrgP2 class="container l cl2" :active="active === 2" :eh="300" :inDelay="500" :outDelay="300" />
            <ElectricityP2 class="container l cl3 cl3-2" :active="active === 2" :eh="320" :inDelay="700"
                :outDelay="100" />
            <!-- right -->
            <Talent class="container r cr1" :active="active === 1" :eh="300" :inDelay="300" :outDelay="500" />
            <Industry class="container r cr2" :active="active === 1" :eh="300" :inDelay="500" :outDelay="300" />
            <Status class="container r cr3" :active="active === 1" :eh="320" :inDelay="700" :outDelay="100" />

            <listP2 class="container r cr1" :active="active === 2" :eh="960" :inDelay="500" :outDelay="300" />

            <!-- bottom -->
            <Person class="container m cm1" :active="active === 1" :eh="320" :inDelay="700" :outDelay="100" />
            <FundP2 class="container m cm1-2" :active="active === 2" :eh="320" :inDelay="700" :outDelay="100" />

            <Title class="container t" :active="active === 1" :inDelay="1200" :outDelay="100" />

            <!-- 图2 -->
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl';
import * as dayjs from 'dayjs'

import { ajax } from '@/api/ajax';

import Gdp from './components/gdp.vue'
import Increase from './components/increase.vue'
import Nature from './components/nature.vue'

import IndustryP2 from './components/page2/industry.vue'
import OrgP2 from './components/page2/org.vue'
import ElectricityP2 from './components/page2/electricity.vue'
import FundP2 from './components/page2/fund.vue'
import listP2 from './components/page2/list.vue'


import Talent from './components/talent.vue'
import Industry from './components/industry.vue'
import Status from './components/status.vue'

import Person from './components/person.vue'

import Title from './components/title.vue'
export default {
    components: {
        Gdp,
        Nature,
        Increase,
        Talent,
        Industry,
        Status,
        Person,
        Title,
        // 
        IndustryP2,
        OrgP2,
        ElectricityP2,
        FundP2,
        listP2
    },
    data() {
        return {
            loog: false,
            active: 0,
            title: '智能数字化平台',
            time: '',
            regions: [],
            regionsShow: [],
        }
    },
    mounted() {
        const w = window.innerWidth
        const h = window.innerHeight;
        const app = document.querySelector(".transform")
        app.style.transform = `matrix(${w / 1920},0,0,${w / 1920},0,0)`
        // 
        this.initMap()
        requestAnimationFrame(this.animate)
    },
    methods: {
        initMap() {
            const chartDom = document.querySelector('.map');
            const myChart = echarts.init(chartDom);
            ajax({
                method: 'get',
                url: '/buildings.json',
            }).then((buildingsGeoJSON) => {
                echarts.registerMap('buildings', buildingsGeoJSON);
                var regions = buildingsGeoJSON.features.map(function (feature) {
                    const name = feature.properties.name;
                    return {
                        name: name,
                        value: Math.max(Math.sqrt(feature.properties.height), 0.1),
                        height: Math.max(Math.sqrt(feature.properties.height), 0.1),
                    };
                });
                this.regions = regions;
                this.regionsShow = regions.map(function (el) {
                    return {
                        ...el,
                        label: {
                            show: ['2887'].includes(el.name),
                            distance: el.height + 2000,
                            formatter: '未来科技产业园',
                            textStyle: {
                                fontSize: 30,
                                color: "#fff"
                            }
                        }
                    };
                });
                myChart.setOption({
                    visualMap: {
                        show: false,
                        min: 0.4,
                        max: 4,
                        inRange: {
                            color: [
                                'rgba(255,255,255,1)',
                                '#4575b4',
                                '#74add1',
                                '#abd9e9',
                                '#e0f3f8',
                                // '#ffffbf',
                                // '#fee090',
                                // '#fdae61',
                                // '#f46d43',
                                // '#d73027',
                                '#5585e5'
                            ],
                            // colorAlpha: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                        }
                    },
                    series: [
                        {
                            type: 'map3D',
                            map: 'buildings',
                            shading: 'realistic',
                            // realisticMaterial: {
                            //     roughness: 0.6,
                            //     textureTiling: 20,
                            //     detailTexture: ROOT_PATH + '/data-gl/asset/woods.jpg'
                            // },
                            instancing: true,
                            environment: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0, color: '#010f21' // 天空颜色
                            }, {
                                offset: 0.7, color: '#011127' // 地面颜色
                            }, {
                                offset: 1, color: '#0d274d' // 地面颜色
                            }], false),
                            postEffect: {
                                enable: true,
                                bloom: {
                                    enable: false
                                },
                                SSAO: {
                                    enable: true,
                                    quality: 'medium',
                                    radius: 10,
                                    intensity: 1.2
                                },
                                depthOfField: {
                                    enable: false,
                                    focalDistance: 50,
                                    focalRange: 20,
                                    fstop: 2.5,
                                    blurRadius: 50
                                }
                            },
                            groundPlane: {
                                show: false,
                                color: '#333'
                            },
                            light: {
                                main: {
                                    // color: "#000",
                                    intensity: 1,
                                    shadow: true,
                                    shadowQuality: 'high',
                                    alpha: 30
                                },
                                ambient: {
                                    // color: "#999",
                                    intensity: 0.2
                                },
                                // ambientCubemap: {
                                //     texture: '/canyon.hdr',
                                //     exposure: 2,
                                //     diffuseIntensity: 1,
                                //     specularIntensity: 1
                                // }
                            },
                            viewControl: {
                                // autoRotate: true,
                                minBeta: -360,
                                maxBeta: 360,
                                distance: 60,
                                alpha: 0,
                                beta: -40,
                                animation: true,
                                animationDurationUpdate: 1400,
                                animationEasingUpdate: "cubicInOut"
                            },
                            itemStyle: {
                                areaColor: '#666'
                            },
                            label: {
                                color: 'white'
                            },
                            silent: true,
                            instancing: true,
                            boxWidth: 200,
                            boxHeight: 1,
                            data: regions
                        }
                    ]
                });

                setTimeout(() => {
                    myChart.setOption({
                        series: {
                            viewControl: {
                                distance: 260,
                                alpha: 80,
                                beta: 0,
                            },
                            data: this.regions
                        }
                    })
                    this.loog = true;
                    this.myChart = myChart;
                    this.handlAactive(1, 600)
                }, 300);
            });

        },
        animate() {
            this.time = dayjs().format('YYYY-MM-DD HH:mm:ss');
            requestAnimationFrame(this.animate)
        },
        handlAactive(v, delay = 0) {
            if (v) {
                this.active = 0;
                setTimeout(() => {
                    if (v === 1) {
                        this.myChart.setOption({
                            series: {
                                viewControl: {
                                    center: [0, 0, 0],
                                    distance: 220,
                                    alpha: 80,
                                    beta: 0,
                                },
                                data: this.regions
                            }
                        })
                    } else if (v === 2) {
                        this.myChart.setOption({
                            series: {
                                viewControl: {
                                    center: [0, 0, 0],
                                    distance: 80,
                                    alpha: 40,
                                    beta: -60,
                                },
                                data: this.regionsShow
                            }
                        })
                    }
                    setTimeout(() => {
                        this.active = v
                    }, delay);
                }, 300);
            }

        }
    }
}
</script>

<style lang="scss" scoped>
@property --mask {
    syntax: "<angle>";
    inherits: false;
    initial-value: 33deg;
}

.e-charts {
    position: relative;
    height: 100%;
    background-color: #000;

    .transform {
        position: absolute;
        width: 1920px;
        height: 1080px;
        position: absolute;
        top: calc(50% - 540px);
        left: calc(50% - 960px);
        overflow: hidden;

        .map {
            height: 100%;
        }

        .data {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, rgba(0, 0, 0, .7), transparent, rgba(0, 0, 0, .7));
            pointer-events: none;
        }

        .head {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding: 18px;
            z-index: 9;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
                position: relative;
                --shimmer-hue-1: 213deg;
                --shimmer-sat-1: 95%;
                --shimmer-lit-1: 91%;
                --shimmer-hue-2: 248deg;
                --shimmer-sat-2: 100%;
                --shimmer-lit-2: 86%;
                --shimmer-hue-3: 293deg;
                --shimmer-sat-3: 78%;
                --shimmer-lit-3: 89%;
                --glow-hue: 222deg;
                --shadow-hue: 180deg;
                --spring-easing: linear(0, 0.002, 0.01 0.9%, 0.038 1.8%, 0.156, 0.312 5.8%, 0.789 11.1%, 1.015 14.2%,
                        1.096, 1.157, 1.199, 1.224 20.3%, 1.231, 1.231, 1.226, 1.214 24.6%,
                        1.176 26.9%, 1.057 32.6%, 1.007 35.5%, 0.984, 0.968, 0.956, 0.949 42%,
                        0.946 44.1%, 0.95 46.5%, 0.998 57.2%, 1.007, 1.011 63.3%, 1.012 68.3%,
                        0.998 84%, 1);
                --spring-duration: 1.33s;

                font-weight: 600;
                font-size: 20px;
                padding: 6px 12px;
                border-radius: 6px;
                opacity: 0;
                transform: matrix(1, 0, 0, 1, -50, 0);
                transition: all var(--spring-duration) var(--spring-easing);
                text-transform: unset;

                .text {
                    background: linear-gradient(90deg, #fff, #4d8fe0);
                    -webkit-background-clip: text;
                    /* 对文字应用背景裁剪 */
                    -webkit-text-fill-color: transparent;
                    letter-spacing: 4px;
                    font-size: 30px;
                    color: transparent;
                }

                .shimmer {
                    position: absolute;
                    inset: -40px;
                    border-radius: inherit;
                    mix-blend-mode: color-dodge;
                    mix-blend-mode: plus-lighter;
                    pointer-events: none;
                    /* mask-image: linear-gradient(90deg, transparent 20%, black 88%, transparent 90%);
                mask-size: 200% 200%;*/
                    mask-position: center;
                    mask-image: conic-gradient(from var(--mask, 0deg),
                            transparent 0%,
                            transparent 10%,
                            black 36%,
                            black 45%,
                            transparent 50%,
                            transparent 60%,
                            black 85%,
                            black 95%,
                            transparent 100%);
                    mask-size: cover;
                    animation: spin 3s linear infinite both -0.5s;

                    &::before,
                    &::after {
                        transition: all 0.6s ease;
                        opacity: 1;
                        content: "";
                        border-radius: inherit;
                        position: absolute;
                        inset: 40px;
                    }

                    &::before {
                        box-shadow: 0 0 3px 2px hsl(var(--shimmer-hue-1) 20% 95%),
                            0 0 7px 4px hsl(var(--shimmer-hue-1) 20% 80%),
                            0 0 13px 8px hsl(var(--shimmer-hue-2) 40% 60%),
                            0 0 22px 6px hsl(var(--shimmer-hue-2) 20% 40%);
                        z-index: -1;
                    }

                    &::after {
                        box-shadow: inset 0 0 0 1px hsl(var(--shimmer-hue-2) 70% 95%),
                            inset 0 0 3px 1px hsl(var(--shimmer-hue-2) 100% 80%),
                            inset 0 0 9px 1px hsl(var(--shimmer-hue-2) 100% 70%);
                        z-index: 2;
                    }

                    @keyframes wipe {
                        0% {
                            mask-position: 200% center;
                        }

                        100% {
                            mask-position: 0% center;
                        }
                    }

                    @keyframes spin {
                        0% {
                            --mask: 0deg;
                        }

                        100% {
                            --mask: 360deg;
                        }
                    }
                }

            }

            .btns {
                position: relative;
                display: flex;

                // &::before {
                //     content: "";
                //     position: absolute;
                //     bottom: 0px;
                //     left: calc(50% - 25px);
                //     width: 50px;
                //     height: 10px;
                //     background-color: #5596ff;
                // }

                .raise {
                    transition-duration: 260ms;
                    border: 1px #5596ff solid;
                    color: #5b93c5;
                    padding: 9px 24px;
                    cursor: pointer;
                    margin: 0 12px;
                    font-size: 14px;

                    &:hover,
                    &:focus,
                    &.active {
                        border-color: #4fa5de;
                        color: #fff;
                        // box-shadow: inset 0 0 0.5em #4fa5de;
                        box-shadow: 0 0.5em 0.8em -0.4em #4fa5de;
                    }
                }
            }

            .time {
                color: #fff;
                font-size: 14px;
                width: 228px;
                text-align: right;
            }

            &.active {
                .title {
                    opacity: 1;
                    transform: matrix(1, 0, 0, 1, 0, 0);
                }
            }
        }

        .container {
            position: absolute;
            top: 0;

            z-index: 9;
            width: 480px;
            padding: 0 10px;

            &.l {
                left: 0;
            }

            &.cl1 {
                top: 100px;
            }

            &.cl2 {
                top: 420px;
            }

            &.cl3 {
                top: 740px;
            }

            &.cl3-2 {
                width: calc(100% - 960px);
            }

            &.r {
                right: 0;
            }

            &.cr1 {
                top: 100px;
            }

            &.cr2 {
                top: 420px;
            }

            &.cr3 {
                top: 740px;
            }

            &.cm1 {
                top: 740px;
                left: 480px;
                width: calc(100% - 960px);
            }

            &.cm1-2 {
                top: 740px;
                left: calc(100% - 960px);
                width: 480px;
            }

            &.t {
                top: 100px;
                left: 480px;
                width: calc(100% - 960px);
            }
        }
    }
}
</style>