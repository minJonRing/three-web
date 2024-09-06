<template>
  <div class="home">
    <div class="head">
      <css-doodle class="doodle">
        :doodle {
        @size: 1px;
        overflow: hidden;
        transform: translate(-100%, -100%);
        border-radius: 50%;
        filter: url(#filter);
        --shadow0:@m100(@r(100vw) @r(100vh) @r(20vmin, 40vmin) @r(20vmin) @pd(#11cbd7, #c6f1e7, #ffffff, #fa4659));
        --shadow1:@m100(@r(100vw) @r(100vh) @r(20vmin, 40vmin) @r(20vmin) @pd(#11cbd7, #c6f1e7, #ffffff, #00bfff));
        --shadow2:@m100(@r(100vw) @r(100vh) @r(20vmin, 40vmin) @r(20vmin) @pd(#11cbd7, #c6f1e7, #ffffff, #fa4659));
        --shadow3:@m100(@r(100vw) @r(100vh) @r(20vmin, 40vmin) @r(20vmin) @pd(#11cbd7, #c6f1e7, #ffffff, #00bfff));
        box-shadow: var(--shadow0)
        }
      </css-doodle>
      <svg width="0">
        <filter id="filter">
          <feTurbulence type="fractalNoise" baseFrequency=".01" numOctaves="10" />
          <feDisplacementMap in="SourceGraphic" scale="180" />
        </filter>
      </svg>
    </div>
    <div class="content">
      <css-doodle class="content-doodle">
        :doodle {
        @grid: 1 / 100vw 100vh / #0a0c27;
        }
        background-size: 200px 200px;
        background-image: @doodle(
        @grid: 6 / 100%;
        @size: 4px;
        font-size: 4px;
        color: hsl(@r240, 30%, 50%);
        box-shadow: @m3x5(
        calc(4em - @nx*1em) @ny(*1em)
        @p(@m3(currentColor), @m2(#0000)),
        calc(2em + @nx*1em) @ny(*1em)
        @lp
        );
        );
      </css-doodle>
      <div class="list">
        <div class="item" v-for="(item, j) in logos" :key="j">
          <a class="box" :href="item.href" target="_blank">
            <div class="icon">
              <img :src="item.icon" alt="">
            </div>
            <div class="text">{{ item.text }}</div>
          </a>
        </div>
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
// @ is an alias to /src
// import CssDoodle from 'css-doodle'
export default {
  name: 'HomeView',
  data() {
    return {
      logos: [
        { icon: LogoVue, text: "Vue.js", href: "https://cn.vuejs.org/" },
        { icon: LogoReact, text: "React.js", href: "https://zh-hans.react.dev/" },
        { icon: LogoD3, text: "D3.js", href: "https://d3js.org/" },
        { icon: LogoEchart, text: "Echart.js", href: "https://echarts.apache.org/zh/index.html" },
        { icon: LogoThree, text: "Three.js", href: "https://threejs.org/" },
        { icon: LogoElectron, text: "Electron.js", href: "https://www.electronjs.org/zh/" },
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.setLoading(false)
    }, 3000);
  },
  methods: {
    ...mapActions(["setLoading"])
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  overflow: hidden;
  --headHeight: 60px;

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
  }


  .content {
    // position: absolute;
    position: relative;
    // top: 0;
    // left: 0;
    // width: 100%;
    height: calc(100% - var(--headHeight));

    .content-doodle {
      width: 100%;
      height: 100%;
    }

    .list {
      position: absolute;
      top: 0;
      left: 50%;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      max-width: 900px;
      margin: 0 auto;
      transform: translateX(-50%);

      .item {
        width: 33.33%;
        display: flex;
        justify-content: center;
        padding: 12px;

        .box {
          backdrop-filter: blur(3px);
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 10px;
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
          min-width: 180px;
          position: relative;
          padding: 12px;
          text-decoration: none;

          .icon {
            height: 80px;

            img {
              display: block;
              height: 100%;
              margin: 0 auto;
            }
          }

          .text {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
