<template>
    <div class="list">
        <div class="banner">
            <css-doodle class="content-doodle">
                :doodle {
                @grid: 40,5 / 100vmax,100%;
                background: #111;
                }
                @even {
                :after {
                color: #fff3e6;
                content: '\@hex(@rand(9500, 9700))';
                font-size: 1vw;
                transform: scale(@rand(.5, 1.5));
                }
                }

                @odd {
                :after {
                color: #ffb37f;
                content: '\@hex(@rand(9500, 9700))';
                font-size: 1vw;
                transform: scale(@rand(.5, 1.5));
                }
                }
            </css-doodle>
            <div class="title">
                {{ title }}
            </div>
        </div>
        <div class="layout">
            <v-container class="art">
                <v-row no-gutters>
                    <v-col class="item" v-for="(item, j) in logos" :key="j" cols="12" xs="12" sm="6">
                        <v-card :title="item.text">
                            <v-card-text>
                                <div class="box">
                                    <div class="icon">
                                        <img :src="item.icon" alt="">
                                    </div>
                                    <div class="word">{{ item.text }}</div>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
    name: "List",
    data() {
        return {
            title: "",
            logos: [
                { icon: 'LogoVue', text: "Vue.js", href: "https://cn.vuejs.org/" },
                { icon: 'LogoReact', text: "React.js", href: "https://zh-hans.react.dev/" },
                { icon: 'LogoD3', text: "D3.js", href: "https://d3js.org/" },
                { icon: 'LogoEchart', text: "Echart.js", href: "https://echarts.apache.org/zh/index.html" },
                { icon: 'LogoThree', text: "Three.js", href: "https://threejs.org/" },
                { icon: 'LogoElectron', text: "Electron.js", href: "https://www.electronjs.org/zh/" },
            ],
        }
    },
    created() {
        const { type } = this.$route.query;

        this.title = { 'web': 'web开发', 'big': '智慧大屏', 'exe': '桌面程序' }[type]
    }
}
</script>

<style lang="scss" scoped>
.list {
    --headHeight: 15vw;
    height: 100%;

    .banner {
        position: relative;
        height: var(--headHeight);
        min-height: 60px;

        .content-doodle {
            // height: 100%;
            overflow: hidden;
        }

        .title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(255, 255, 255, .1);
            padding: 12px 24px;
            border-radius: 4px;
            backdrop-filter: blur(4px);
            text-align: center;
            color: #fff;
            line-height: 1;
            font-size: 4vw;
            letter-spacing: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .layout {
        height: calc(100% - var(--headHeight));
        overflow: auto;

        .art {

            .item {
                width: 100%;
                padding: 12px;
                display: inline-block;
                cursor: pointer;

                .box {
                    display: flex;
                    text-decoration: none;


                    .icon {
                        height: 4vw;
                        min-height: 36px;

                        img {
                            display: block;
                            height: 100%;
                            margin: 0 auto;
                        }
                    }

                    .text {
                        font-size: clamp(12px, 1.25vw, 24px);
                        font-weight: bold;
                        text-align: center;
                        color: #111;
                        transition-duration: 300ms;
                        padding-left: 6px;
                    }
                }

                &:hover {
                    .box {
                        .text {
                            color: deepskyblue;
                        }
                    }
                }
            }
        }
    }
}
</style>