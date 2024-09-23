<template>
    <div class="menu">
        <span :class="['menu-trigger', menu ? '' : 'active']" @click="handleSet(true)">
            <i class="menu-trigger-bar top"></i>
            <i class="menu-trigger-bar middle"></i>
            <i class="menu-trigger-bar bottom"></i>
        </span>
        <span :class="['close-trigger', menu ? 'active' : '']" @click="handleSet(false)">
            <i class="close-trigger-bar left"></i>
            <i class="close-trigger-bar right"></i>
        </span>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['menu'])
    },
    methods: {
        ...mapActions(['setMenu']),
        handleSet(v) {
            console.log(v)
            this.setMenu(v)
        }
    }
}
</script>

<style lang="scss" scoped>
.menu {
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    overflow: hidden;
    z-index: 9;

    .menu-trigger,
    .close-trigger {
        position: absolute;
        top: 20px;
        right: 20px;
        display: block;
        width: 2.2vw;
        height: 2.2vw;
        min-width: 20px;
        min-height: 20px;
        cursor: pointer;
        pointer-events: none;
        opacity: 0;
        transition-duration: 300ms;

        &:hover {
            .menu-trigger-bar {
                &:before {
                    width: 100%;
                }
            }

            .close-trigger-bar {
                &:before {
                    width: 100%;
                }
            }
        }

        &.active {
            opacity: 1;
            pointer-events: auto;
            z-index: 2;
        }
    }

    .menu-trigger {

        .menu-trigger-bar {
            position: absolute;
            display: block;
            width: 100%;
            height: 4px;
            top: calc(50% - 2px);
            left: 0;
            background-color: #fff;
            transform: rotate(-45deg) translateX(100px);
            transition: all 400ms cubic-bezier(.55, 0, .1, 1);

            &:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: 0%;
                height: 100%;
                background-color: rgba(0, 0, 0, .2);
                transition: all 0.3s cubic-bezier(.55, 0, .1, 1);
            }

            &.top {
                top: calc(25% - 2px);
                width: 50%;
                transition-delay: 200ms;
            }

            &.middle {
                &:before {
                    left: auto;
                    right: 0;
                }
            }

            &.bottom {
                top: calc(75% - 2px);
                width: 50%;
                left: 50%;
                transition-delay: 400ms;
            }
        }

        &.active {
            .menu-trigger-bar {
                transform: rotate(-45deg);
            }
        }
    }

    .close-trigger {
        .close-trigger-bar {
            position: absolute;
            top: calc(50% - 2px);
            left: 0;
            display: block;
            width: 100%;
            height: 4px;
            background-color: #222222;
            transition: all 400ms cubic-bezier(.55, 0, .1, 1);

            &:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: 0%;
                height: 100%;
                background-color: rgba(255, 255, 255, .2);
                transition: all 0.3s cubic-bezier(.55, 0, .1, 1);
            }

            &.left {
                transform: rotate(-45deg) translateX(100px);
                transition-delay: 300ms;
            }

            &.right {
                transform: rotate(45deg) translateX(-100px);
            }
        }

        &.active {
            .close-trigger-bar {
                &.left {
                    transform: rotate(-45deg);
                }

                &.right {
                    transform: rotate(45deg);
                }
            }
        }
    }
}
</style>