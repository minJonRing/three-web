<template>
  <div class="home">
    <div class="head">
      <css-doodle class="content-doodle">
        :doodle {
        @grid: 40 / 100vmax;
        background: #12152f;
        }
        :after {
        font-family: devicons;
        content: '\@hex(@rand(58890, 59050))';
        font-size: 1.5vmax;
        color: hsla(
        @rand(360), 70%, 70%,
        @rand(.9)
        );
        }
      </css-doodle>
      <div class="words">
        <HomeTitle :anima="anima" />
      </div>
    </div>
    <!-- 主题内容 -->
    <div class="content">
      <div class="layout">
        <v-container class="art">
          <v-row no-gutters>
            <v-col>
              <div class="sub">相关内容 ( content )</div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col v-for="(item, j) in contents" :key="j" cols="6" xs="6" sm="4">
              <div class="item item-nav">
                <a class="box" @click="handleLink(item)">
                  <div class="icon">
                    <img :src="item.icon" alt="">
                  </div>
                  <div class="text">{{ item.text }}</div>
                </a>
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters style="padding-top: 16px;">
            <v-col>
              <div class="sub">相关技术 ( technique )</div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col v-for="(item, j) in logos" :key="j" cols="6" xs="6" sm="4">
              <div class="item">
                <a class="box" :href="item.href" target="_blank">
                  <div class="icon">
                    <img :src="item.icon" alt="">
                  </div>
                  <div class="text">{{ item.text }}</div>
                </a>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import LogoThree from '@/assets/image/three.png'
import LogoD3 from '@/assets/image/d3.svg'
import LogoEchart from '@/assets/image/echart.png'
import LogoVue from '@/assets/image/vue.png'
import LogoElectron from '@/assets/image/electron.svg'
import LogoReact from '@/assets/image/react.png'

import Image2 from '@/assets/image/nav/2.webp'
import Image3 from '@/assets/image/nav/3.png'
import Image4 from '@/assets/image/nav/4.jpg'
import Image5 from '@/assets/image/nav/5.png'

import HomeTitle from '@/components/homeTitle.vue'

// @ is an alias to /src
// import CssDoodle from 'css-doodle'
export default {
  name: 'HomeView',
  components: {
    HomeTitle,

  },
  data() {
    return {
      logos: [
        { icon: LogoVue, text: "Vue.js", href: "https://cn.vuejs.org/" },
        { icon: LogoReact, text: "React.js", href: "https://zh-hans.react.dev/" },
        { icon: LogoD3, text: "D3.js", href: "https://d3js.org/" },
        { icon: LogoEchart, text: "Echart.js", href: "https://echarts.apache.org/zh/index.html" },
        { icon: LogoThree, text: "Three.js", href: "https://threejs.org/" },
        { icon: LogoElectron, text: "Electron.js", href: "https://www.electronjs.org/zh/" },
      ],
      contents: [
        { icon: Image2, text: "web开发", href: "/list?type=web", link: false },
        { icon: Image3, text: "智慧大屏", href: "/list?type=big", link: false },
        { icon: Image5, text: "桌面程序", href: "/list?type=exe", link: false },
      ],
      anima: false
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.setLoading(false)
    setTimeout(() => {
      this.anima = true;
    }, 600);

    // }, 1000);
  },
  methods: {
    ...mapActions(["setLoading"]),
    handleLink(i) {
      const { href, link } = i;
      if (link) {
        window.open(href, "_blank")
      } else {
        this.$router.push(href)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  overflow: hidden;
  --headHeight: 15vw;



  .head {
    position: relative;
    height: var(--headHeight);
    overflow: hidden;

    .doodle {
      height: 100%;
      animation: r 30s linear infinite;

      @keyframes r {
        25% {
          box-shadow: var(--shadow1)
        }

        50% {
          box-shadow: var(--shadow2)
        }

        75% {
          box-shadow: var(--shadow3)
        }

        100% {
          box-shadow: var(--shadow0)
        }
      }
    }

    .words {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
    }



  }

  .content {
    // position: absolute;
    position: relative;
    // top: 0;
    // left: 0;
    // width: 100%;
    overflow: auto;
    height: calc(100% - var(--headHeight));

    .content-doodle {
      width: 100%;
      height: 100%;
    }

    .layout {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .art {
        .sub {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 16px;
        }

        .item {
          width: 100%;
          // width: 33.33%;
          // display: flex;
          // justify-content: center;
          padding: 2px;
          display: inline-block;

          .box {
            display: block;
            // backdrop-filter: blur(3px);
            background-color: #f9f9f9;
            // background-color: rgba(255, 255, 255, 0.5);
            // border: 1px solid rgba(255, 255, 255, 0.5);
            // border-radius: 10px;
            // box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
            // box-shadow: 2px 2px 4px rgba(255, 255, 255, 0.25);
            padding: 12px;
            text-decoration: none;
            cursor: pointer;

            .icon {
              height: 5vw;
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
            }
          }

          &.item-nav {
            .box {
              .icon {
                margin-bottom: 6px;

                img {
                  width: 8vw;
                  min-width: 66px;
                  object-fit: cover;

                }
              }
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
}
</style>
