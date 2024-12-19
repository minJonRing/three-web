<template>
    <div class="list">
        <div class="banner">
            <ListBackground :software="software" />
        </div>
        <div class="layout">
            <div class="btns">
                <v-btn v-for="(item, j) in menuList" :key="j" elevation="8" color="blue-darken-4" variant="outlined"
                    @click="handleBtn(item)">
                    {{ item.name }}
                </v-btn>
            </div>
            <v-container class="art">
                <v-row no-gutters>
                    <v-col v-for="(item, j) in list" :key="item._id" cols="12" lg="2" md="3" sm="3" xs="6">
                        <div class="item" :style="{ '--back': `url(${item.cover})` }">
                            <a class="box" @click="handleLink(item)" :style="{ '--delay': (j + 1) * 200 + 'ms' }">
                                <div class="info">
                                    <div class="text">{{ item.name }}</div>
                                    <div class="art">
                                        <div class="icon" v-for="(i, j) in item.artId" :key="j">
                                            <img :src="i.icon" />
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
import ListBackground from '@/components/ListBackground.vue';
import { ajax } from '@/api/ajax';
import { mapActions, mapGetters } from 'vuex';
export default {
    name: "List",
    components: {
        ListBackground
    },
    data() {
        return {
            software: {},
            list: [],
            color: ['#fff', '#ddd', '#888']
        }
    },
    computed: {
        ...mapGetters(['softwareId', 'menuList'])
    },
    watch: {
        softwareId(data) {
            this.getData(data)
            this.getDataList(data)
        }
    },
    created() {
        if (this.softwareId) {
            this.getData(this.softwareId)
            this.getDataList(this.softwareId)
        }
    },
    methods: {
        ...mapActions(["setLoading", "setSoftwareId"]),
        getData(id) {
            ajax({
                url: `/client/software/${id}`,
            }).then(({ data }) => {
                this.software = data;
            })
        },
        getDataList(id) {
            this.list = [];
            ajax({
                url: `/client/programBySoftwareId`,
                data: {
                    id
                }
            }).then(({ data }) => {
                this.list = data;
                this.setLoading(0)
            })
        },
        handleLink({ _id }) {
            this.$router.push(`/item/${_id}`)
        },
        handleBtn({ _id }) {
            if (this.softwareId === _id) {
                return
            }
            this.setLoading(1)
            this.setSoftwareId(_id)
        }
    }
}
</script>

<style lang="scss" scoped>
.list {
    --headHeight: 12vw;
    height: 100%;
    overflow: auto;

    .banner {
        position: relative;
        height: var(--headHeight);
        min-height: 60px;
    }

    .layout {
        height: calc(100% - var(--headHeight));
        overflow: auto;

        .btns {
            padding: 24px 0 0;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;

            .v-btn {
                margin: 0 6px;
            }
        }

        .art {


            .item {
                width: 100%;
                display: inline-block;
                padding: 12px;

                .box {
                    position: relative;
                    display: block;
                    width: 100%;
                    height: 100%;
                    text-decoration: none;
                    background-image: var(--back);
                    background-size: cover;
                    background-position: center center;
                    aspect-ratio: 9 / 12;
                    cursor: pointer;
                    perspective: 800px;
                    transform-style: preserve-3d;
                    overflow: hidden;
                    // border-radius: 4px;
                    box-shadow: rgba(0, 0, 0, 0.7) 2px 2px 4px -1px, ;
                    opacity: 0;
                    transform: matrix(1, 0, 0, 1, 0, -20);
                    animation: show 600ms ease-out var(--delay) forwards;

                    &::after {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, .1);
                        z-index: 1;
                        transition-duration: 600ms;
                    }

                    .info {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        width: 100%;
                        --path: 0 0, 100% 15px, 100% 100%, 0 100%;
                        clip-path: polygon(var(--path));
                        background-color: #111;
                        z-index: 2;
                        padding-top: 15px;
                        border-right: 2px #000 solid;
                        transition-duration: 600ms;

                        .text {
                            width: 100%;
                            font-size: clamp(12px, 1.25vw, 16px);
                            letter-spacing: 2px;
                            font-weight: bold;
                            text-align: center;
                            color: #fff;
                            transform: translate3d(0, 0, 20px);
                            transition-duration: 600ms;
                            padding: 6px 0;

                        }

                        .art {
                            display: flex;
                            width: 100%;
                            bottom: 0;
                            left: 0;
                            padding: 9px;

                            .icon {
                                width: 20px;
                                height: 20px;

                                img {
                                    display: block;
                                    width: 100%;
                                    height: 100%;
                                }

                                &+.icon {
                                    margin-left: 6px;
                                }
                            }
                        }
                    }

                    @keyframes show {
                        100% {
                            opacity: 1;
                            transform: matrix(1, 0, 0, 1, 0, 0);
                        }
                    }

                }

                &:hover {
                    .box {
                        .info {
                            background-color: #202020;
                        }
                    }
                }
            }
        }
    }
}
</style>