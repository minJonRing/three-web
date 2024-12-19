<template>
    <div class="item">
        <div class="back" :style="{ '--back': `url(${program.cover})` }">
            <div class="title">
                <div>{{ program.name }}</div>
                <div class="art">
                    <div class="icon" v-for="(i, j) in program.artId" :key="j">
                        <img :src="i.icon" />
                    </div>
                </div>
            </div>
        </div>
        <div class="layout">
            <div class="time">创建时间： {{ program.createdTime }}</div>
            <!-- <div class="cover" v-html="program.video">
            </div> -->
            <div class="content" v-html="program.content"></div>
        </div>
    </div>
</template>

<script>
import { ajax } from '@/api/ajax';
import { mapGetters } from 'vuex';
export default {
    name: "List",
    components: {
    },
    data() {
        return {
            program: {}
        }
    },
    watch: {

    },
    computed: {

    },
    watch: {

    },
    mounted() {
        const { id } = this.$route.params;
        if (id) {
            this.getData(id)
        }
    },
    methods: {
        getData(id) {
            ajax({
                url: `/client/program/${id}`,
            }).then(({ data }) => {
                this.program = data;
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.item {
    --headHeight: 12vw;
    height: 100%;
    overflow: auto;

    .back {
        position: relative;
        width: 100%;
        height: var(--headHeight);
        background-image: var(--back);
        background-size: cover;
        background-position: center center;

        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .4);
            backdrop-filter: blur(4px);
            z-index: 1;
        }

        .title {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 70%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: clamp(26px, 2.2vw, 40px);
            text-align: center;
            letter-spacing: 6px;
            text-shadow: 0 0 3px #fff;
            pointer-events: none;
            z-index: 2;

            .art {
                display: flex;
                justify-content: center;
                width: 100%;
                bottom: 0;
                left: 0;
                padding: 9px;

                .icon {
                    width: 30px;
                    height: 30px;
                    background-color: rgba(255, 255, 255, .3);
                    backdrop-filter: blur(6px);
                    padding: 6px;
                    border-radius: 4px;

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
    }

    .layout {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;

        .time {
            padding: 12px;
            font-size: 12px;
            text-align: center;
        }

        .content {
            img {
                display: block;
            }
        }
    }
}
</style>