<template>
    <div :class="['loading', loading ? 'in' : '']">
        <div class="box">
            <svg class="gegga">
                <defs>
                    <filter id="gegga">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10"
                            result="inreGegga" />
                        <feComposite in="SourceGraphic" in2="inreGegga" operator="atop" />
                    </filter>
                </defs>
            </svg>
            <svg class="snurra" width="200" height="200" viewBox="0 0 200 200">
                <defs>
                    <linearGradient id="linjärGradient">
                        <stop class="stopp1" offset="0" />
                        <stop class="stopp2" offset="1" />
                    </linearGradient>
                    <linearGradient y2="160" x2="160" y1="40" x1="40" gradientUnits="userSpaceOnUse" id="gradient"
                        xlink:href="#linjärGradient" />
                </defs>
                <path class="halvan"
                    d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64" />
                <circle class="strecken" cx="100" cy="100" r="64" />
            </svg>
            <svg class="skugga" width="200" height="200" viewBox="0 0 200 200">
                <path class="halvan"
                    d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64" />
                <circle class="strecken" cx="100" cy="100" r="64" />
            </svg>
            <div class="text">Loading</div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Loading',
    computed: {
        ...mapGetters(['loading'])
    },
    mounted() {
        console.log(this.loading)
    },
    watch: {

    }
}
</script>

<style lang="scss" scoped>
//variables
$size: 50px;
$primary-color: orange;

.loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
    opacity: 0;
    transition-timing-function: ease-in;
    transition-duration: 600ms;
    pointer-events: none;
    z-index: 999;

    &.in {
        opacity: 1;
        backdrop-filter: blur(4px);
        pointer-events: auto;

        .box {

            .halvan,
            .strecken {
                animation-play-state: running
            }
        }
    }

    .box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -55%);

        .gegga {
            width: 0;
        }

        .snurra {
            filter: url(#gegga);
        }

        .stopp1 {
            stop-color: #f700a8;
        }

        .stopp2 {
            stop-color: #ff8000;
        }

        .halvan {
            animation: Snurra1 10s infinite linear paused;
            stroke-dasharray: 180 800;
            fill: none;
            stroke: url(#gradient);
            stroke-width: 23;
            stroke-linecap: round;
        }

        .strecken {
            animation: Snurra1 3s infinite linear paused;
            stroke-dasharray: 26 54;
            fill: none;
            stroke: url(#gradient);
            stroke-width: 23;
            stroke-linecap: round;
        }

        .skugga {
            filter: blur(5px);
            opacity: 0.3;
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(3px, 3px);
        }

        @keyframes Snurra1 {
            0% {
                stroke-dashoffset: 0;
            }

            100% {
                stroke-dashoffset: -403px;
            }
        }

        .text {
            position: absolute;
            top: 100%;
            left: 50%;
            text-align: center;
            font-size: 16px;
            letter-spacing: 1px;
            color: transparent;
            display: inline-block;
            background: linear-gradient(90deg, #f700a8, #ff8000);
            background-clip: text;
            transform: translateX(-50%);
        }
    }

}
</style>