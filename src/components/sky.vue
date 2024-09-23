<template>
    <div class="sky">
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
</template>

<script>
// @ is an alias to /src
// import CssDoodle from 'css-doodle'
export default {
    name: 'Sky',
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.sky {
    --headHeight: 100%;
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
</style>