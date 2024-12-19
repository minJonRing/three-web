<template>
  <div class="home">
    <div class="head">
      <div class="words">
        <HomeTitle :anima="anima" />
      </div>
    </div>
    <!-- 主题内容 -->
    <div class="content scroll">
      <div class="layout">
        <v-container class="art">
          <v-row no-gutters>
            <v-col>
              <div class="sub">相关内容 ( content )</div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col v-for="(item, j) in menuList" :key="j" cols="6" xs="6" sm="4">
              <div class="item item-nav">
                <a class="box" @click="handleLink(item)">
                  <div class="icon">
                    <img :src="item.icon" alt="">
                  </div>
                  <div class="text">{{ item.name }}</div>
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
            <v-col v-for="(item, j) in art" :key="j" cols="6" xs="6" sm="4">
              <div class="item item-art">
                <a class="box" :href="item.link" target="_blank">
                  <div class="icon">
                    <img :src="item.icon" alt="">
                  </div>
                  <div class="text">{{ item.name }}</div>
                </a>
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters style="padding-top: 16px;">
            <v-col>
              <div class="sub">其他 ( other )</div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col v-for="(item, j) in other" :key="j" cols="6" xs="6" sm="4">
              <div class="item item-art">
                <router-link class="box" :to="item.link">
                  <div class="icon">
                    <img :src="item.icon" alt="">
                  </div>
                  <div class="text">{{ item.name }}</div>
                </router-link>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="link">
        <div class="t">微信：tqr1014080407</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import HomeTitle from '@/components/homeTitle.vue'

// @ is an alias to /src
// import CssDoodle from 'css-doodle'
import Img4 from "@/assets/image/nav/4.jpg"
import { ajax } from '@/api/ajax';
export default {
  name: 'HomeView',
  components: {
    HomeTitle,

  },
  data() {
    return {
      art: [],
      other: [
        { link: '/e-charts', name: "数字大屏", icon: Img4 }
      ],
      anima: false
    }
  },
  computed: {
    ...mapGetters(['menuList'])
  },
  mounted() {
    if (!this.menuList.length) {
      this.getDataBySoftware()
    }
    this.getDataByArt()
    setTimeout(() => {
      this.anima = true;
    }, 600);
  },
  methods: {
    ...mapActions(["setLoading", "setMenuList", "setSoftwareId"]),
    getDataBySoftware() {
      ajax({
        url: '/client/software',
      }).then(({ data }) => {
        this.setMenuList(data)
      })
    },
    getDataByArt() {
      ajax({
        url: '/client/art',
      }).then(({ data }) => {
        this.art = data.sort((x, y) => x.sort - y.sort);
      })
    },
    handleLink(i) {
      const { _id } = i;
      this.setSoftwareId(_id)
      this.$router.push(`/list`)
    },
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  overflow: hidden;
  --headHeight: 10vw;

  .head {
    position: relative;
    height: var(--headHeight);
    overflow: hidden;
    background-color: #000;

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

          &.item-art {
            .box {
              .icon {
                height: 3vw;
              }

              .text {
                font-size: clamp(12px, 1vw, 18px);
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

    .link {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      font-size: 12px;
      background-color: rgba(0, 0, 0, 1);
      backdrop-filter: blur(4px);
      padding: 0 16px;

      .t {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        color: #fff;
        text-align: center;
        line-height: 2;
      }
    }
  }
}
</style>
