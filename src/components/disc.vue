<template>
    <div class="nav">
        <div class="selector">
            <div class="knob"></div>
            <ul>
                <li>
                    <span>Back</span>
                    <input type="radio" name="choice-a" checked />
                </li>
                <li>
                    <span>Home</span>
                    <input type="radio" name="choice-a" />
                </li>
                <li>
                    <span>Search</span>
                    <input type="radio" name="choice-a" />
                </li>
                <li>
                    <span>Star</span>
                    <input type="radio" name="choice-a" />
                </li>
                <li>
                    <span>More</span>
                    <input type="radio" name="choice-a" />
                </li>
                <li>
                    <span>Refresh</span>
                    <input type="radio" name="choice-a" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        const selectors = document.querySelectorAll(".selector");

        selectors.forEach((selector) => {
            const knob = selector.querySelector(".knob");
            const radios = selector.querySelectorAll('input[type="radio"]');

            function handleClick() {
                selector.classList.toggle("active");

                if (selector.classList.contains("active")) {
                    selector.style.removeProperty("--angle");
                } else {
                    selector.style.setProperty("--angle", "-90deg");

                    // Check the first one on close
                    radios.forEach((radio, index) => {
                        if (index !== 0) {
                            radio.checked = false;
                        } else {
                            radio.checked = true;
                        }
                    });
                }
            }


            knob.addEventListener("click", handleClick);
        });
    }
}
</script>

<style lang="scss" scoped>
@font-face {
    font-family: "Mona Sans";
    src: url("https://assets.codepen.io/64/Mona-Sans.woff2") format("woff2 supports variations"),
        url("https://assets.codepen.io/64/Mona-Sans.woff2") format("woff2-variations");
    font-weight: 100 1000;
}

@layer properties {
    @property --angle {
        syntax: "<number>";
        initial-value: -90deg;
        inherits: true;
    }

    @property --icon-offset {
        syntax: "<number>";
        initial-value: 0;
        inherits: true;
    }

    @property --shadow-width {
        syntax: "<number>";
        initial-value: 0px;
        inherits: true;
    }

    @property --selector-width {
        syntax: "<number>";
        initial-value: 100;
        inherits: true;
    }

    @property --border-width {
        syntax: "<number>";
        initial-value: 0;
        inherits: true;
    }

    @property --item-opacity {
        syntax: "<number>";
        initial-value: 0;
        inherits: true;
    }

    @property --is-selected {
        syntax: "<number>";
        initial-value: 0;
        inherits: true;
    }

    @property --color-accent-on {
        syntax: "<color>";
        initial-value: rgb(0 0 0);
        inherits: true;
    }

    @property --color-accent-on-darker {
        syntax: "<color>";
        initial-value: rgb(0 0 0);
        inherits: true;
    }

    @property --color-shadow {
        syntax: "<color>";
        initial-value: rgb(0 0 0);
        inherits: true;
    }

    @property --color-shadow-darker {
        syntax: "<color>";
        initial-value: rgb(0 0 0);
        inherits: true;
    }
}



.nav {
    position: absolute;
    font-family: "Mona Sans", sans-serif;
    bottom: 80px;
    right: 80px;
    z-index: 9;
    --col-num: 1;
    display: grid;
    grid-template-columns: repeat(var(--col-num), 1fr);
    user-select: none;
    --radius: clamp(40px, 60px, 80px);
    --scene-bg: hsl(307deg 4% 94%);
    --icon-search: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3C/svg%3E");
    --icon-star: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='m12 7.13.97 2.29.47 1.11 1.2.1 2.47.21-1.88 1.63-.91.79.27 1.18.56 2.41-2.12-1.28-1.03-.64-1.03.62-2.12 1.28.56-2.41.27-1.18-.91-.79-1.88-1.63 2.47-.21 1.2-.1.47-1.11.97-2.27M12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z'/%3E%3C/svg%3E");
    --icon-more: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' %3E%3Cpath d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'%3E%3C/path%3E%3C/svg%3E");
    --icon-refresh: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z'%3E%3C/path%3E%3C/svg%3E");
    --icon-back: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'%3E%3C/path%3E%3C/svg%3E");
    --icon-house: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z'%3E%3C/path%3E%3C/svg%3E");

    --icon-1: var(--icon-house);
    --icon-2: var(--icon-search);
    --icon-3: var(--icon-star);
    --icon-4: var(--icon-more);
    --icon-5: var(--icon-refresh);
    --icon-6: var(--icon-back);

    --button-active: -1;

    --debug: 0;

    --color-accent-off: hsl(267 16% 43%);
    --color-accent-off-darker: hsl(258 29% 39%);
    --color-accent-on-code: var(--angle) 100% 72%;
    --color-accent-on-darker-code: var(--angle) 98% 61%;
    --color-accent-on: hsl(var(--color-accent-on-code) / 1);
    --color-accent-on-darker: hsl(var(--color-accent-on-darker-code) / 1);

    --inner-bg: hsl(0deg 0% 90.98%);
    --outer-bg: hsl(223.81 0% 93%);
    --border-bg: hsl(0deg 0% 85%);
    --invert: 0%;

    --color-grey: hsl(0 0% 87%);
    --color-dark-grey: hsl(0 0% 95.69%);
    --angle: -90deg;
    --rotation: 0;
    --angle-offset: 90deg;

    --is-active: 0;

    --icon-offset: 100;

    --shadow: rgba(0, 0, 0, 0.125) 0px 0px 2px -0.5px,
        rgba(0, 0, 0, 0.125) 0px 1px 5px -1px,
        rgba(0, 0, 0, 0.125) 0px 4px 12px -1.5px,
        rgba(0, 0, 0, 0.125) 0px 9px 28px -2px,
        rgba(0, 0, 0, 0.125) 0px 24px 72px -2.5px;

    --icon-opacity: 0.4;
    --item-opacity: 0;

    --cubic-bezier: cubic-bezier(0.44, -0.9, 0.31, 1.55);

    & [data-theme="dark"] {
        --scene-bg: hsl(207deg 20% 12%);
        --color-grey: hsl(0 0% 10%);
        --inner-bg: hsl(200deg 15% 10.98%);
        --outer-bg: hsl(200deg 19% 6%);
        --border-bg: hsl(200deg 10% 8%);
        --invert: 100%;
    }

    .selector {
        --shadow-width: calc(var(--radius) / 13);
        --knob-color: linear-gradient(to bottom,
                var(--color-accent-off),
                var(--color-accent-off-darker));
        width: var(--radius);
        aspect-ratio: 1/1;
        position: relative;
        border-radius: 1e5px;
        background: var(--color-dark-grey);
        box-shadow: inset rgba(0, 0, 0, 0.13) 0px 0px 2px -1px,
            inset rgba(0, 0, 0, 0.13) 0px 2px 8px -2px,
            inset rgba(0, 0, 0, 0.13) 0px 8px 34px -2px;

        & .knob {
            position: absolute;
            width: 100%;
            height: 100%;
            display: grid;
            place-items: center;
            transform: rotate(calc(var(--angle) + var(--angle-offset)));
            transition: transform 0.4s var(--cubic-bezier);
            z-index: 2;
            cursor: pointer;
            border-radius: 1e5px;

            /* Let's make the knob */
            &:before,
            &:after {
                content: "";
                display: block;
                position: absolute;
            }

            &:after {
                width: 4%;
                height: 14%;
                background: var(--knob-color);
                box-shadow:
                    0 0 1px rgb(0 0 0 / 40%),
                    0 0 2px 1px rgb(0 0 0 / 20%),
                    inset 0 1px 2px var(--color-accent-on),
                    inset 0 -1px 2px var(--color-accent-on-darker),
                    0 0 calc(var(--is-active)*4px) var(--color-accent-on),
                    0 0 calc(var(--is-active)*16px) hsl(var(--color-accent-on-code)/0.5);
                top: 16px;
                border-radius: 1e5px;
            }

            &:active:after {
                transform: scale(0.95)
            }

            &:hover {
                --knob-color: linear-gradient(to top,
                        var(--color-accent-on),
                        var(--color-accent-on-darker));
            }
        }

        &:has(.knob:active):after {
            transform: scale(0.95)
        }

        &.active {
            --is-active: 1;

            transition:
                --color-accent-on 0.3s ease .2s,
                --color-accent-on-darker 0.3s ease .2s,
                --color-accent-on-code 0.3s ease .2s,
                --color-accent-on-darker-code 0.3s ease .2s;

            & .knob {
                --knob-color: linear-gradient(to top,
                        var(--color-accent-on),
                        var(--color-accent-on-darker));
            }

            & ul {
                --selector-width: 260;
                --border-width: 13;
                --rotation: 0;
                --icon-offset: 7;
                --item-opacity: 1;

                &:before {
                    box-shadow:
                        inset 0 0 10px rgb(0 0 0 / 0.2),
                        rgba(0, 0, 0, 0.18) 0px 0px 1px -1px inset,
                        rgba(0, 0, 0, 0.16) 0px 2px 5px -2px inset,
                        rgba(0, 0, 0, 0.063) 0px 8px 24px -4px inset;

                }

                & li {
                    --is-selected: 0;

                    @for $i from 0 to 7 {
                        &:nth-child(#{$i}) {
                            transform: rotate(#{($i * 360 / 6) - 60}deg);
                            transition: transform 0.5s ease #{$i * 0.05}s,
                            --icon-offset 0.5s ease,
                            --item-opacity 0.5s ease .2s;
                        }
                    }
                }
            }
        }

        &:after {
            content: "";
            display: block;
            position: absolute;
            width: calc(100%);
            height: calc(100%);
            border-radius: 1e5px;
            background-image: linear-gradient(to bottom, var(--scene-bg), var(--color-grey));
            box-shadow: 0 0 calc(var(--radius) / 30) rgb(0 0 0 / 0.3);
            transition: background-image 0.2s ease, transform 0.15s ease;
            transform: scale(1)
        }


        & ul {
            --selector-width: 90;
            --border-width: 0;
            position: absolute;
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: center;

            &:before,
            &:after {
                content: "";
                display: block;
                position: absolute;
            }

            &:before {
                transition: --selector-width 0.3s ease, --color-accent-on-code 0.3s ease,
                    --color-accent-on-darker-code 0.3s ease;
                width: calc(var(--selector-width) * 1%);
                height: calc(var(--selector-width) * 1%);
                border-radius: 1e5px;
                box-shadow: var(--shadow),
                    0 calc(var(--radius) / -10) 120px calc(var(--radius) / 5) rgb(0 0 0 / 0.05);
                background: var(--inner-bg);
            }

            &:after {
                --color-shadow: hsl(var(--color-accent-on-code)/0.6);
                --color-shadow-darker: hsl(var(--color-accent-on-darker-code)/0.6);
                --shadow-width: calc(var(--is-active) * calc(var(--radius) / 13));
                transition:
                    --border-width 0.35s var(--cubic-bezier) 0.2s,
                    box-shadow 0.35s var(--cubic-bezier) 0.2s,
                    --color-accent-on 0.2s ease,
                    --color-accent-on-darker 0.2s ease;

                width: calc(calc(100% + calc(var(--radius) / 9)) + calc(calc(var(--border-width) * 2) * 1px));
                height: calc(calc(100% + calc(var(--radius) / 9)) + calc(calc(var(--border-width) * 2) * 1px));
                border-radius: 1e5px;
                box-shadow: 0 0 calc(var(--is-active)*2px) var(--color-shadow-darker), 0 0 calc(var(--is-active)*6px) var(--color-shadow), 0 0 0 var(--shadow-width) var(--outer-bg), var(--shadow);
                background: var(--border-bg);
            }

            & li {
                &>span {
                    display: none;
                }

                &>input[type="radio"] {
                    all: unset;
                    position: absolute;
                    width: 100%;
                    aspect-ratio: 1/1;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                }

                position: absolute;
                width: 25%;
                height: 120%;
                left: 0;
                right: 0;
                top: -70%;
                margin: auto;
                transform-origin: bottom center;
                display: flex;
                align-items: start;
                justify-content: center;
                opacity: var(--item-opacity);

                &:before,
                &:after {
                    content: "";
                    display: block;
                    position: absolute;
                }

                &:before {
                    --op: opacity(var(--is-selected));
                    width: 100%;
                    aspect-ratio: 1/1;
                    background: var(--color-accent-on);
                    box-shadow: 0 0 6px var(--color-accent-on-darker);
                    transform: translateY(175%) scaleX(1.5);
                    filter: blur(12px) var(--op) saturate(2);
                    transition: --is-selected 0.2s ease 0.2s;

                }

                &:after {
                    --iv: invert(var(--invert));
                    width: 100%;
                    aspect-ratio: 1/1;
                    pointer-events: none;
                    opacity: var(--icon-opacity);
                    filter: var(--iv);
                }

                @for $i from 0 to 7 {
                    &:nth-child(#{$i}) {
                        &:after {
                            background: var(--icon-#{$i}) no-repeat center top 15% / contain;
                        }
                    }
                }

                &:after,
                &>input[type="radio"] {
                    top: calc(var(--icon-offset) * 1%);
                }

                &:nth-child(2):after {
                    transform: rotate(300deg);
                }

                &:nth-child(3):after,
                &:nth-child(5):after {
                    transform: rotate(30deg);
                }

                &:nth-child(6):after {
                    transform: rotate(60deg);
                }

                @for $i from 0 to 7 {
                    &:nth-child(#{$i}) {
                        transition-delay: #{($i + 1) * 0.1}s;
                    }
                }
            }
        }

        @for $i from 1 to 7 {
            &:has(li:nth-child(#{$i}) input[type="radio"]:checked) {
                --angle: calc(calc((360deg / 6) * #{$i - 1}) - var(--angle-offset));
                --color-accent-on-code: var(--angle) 100% 72%;
                --color-accent-on-darker-code: var(--angle) 98% 61%;
                --color-accent-on: hsl(var(--color-accent-on-code) / 1);
                --color-accent-on-darker: hsl(var(--color-accent-on-darker-code) / 1);

                & li:nth-child(#{$i}) {
                    --icon-opacity: 1;
                    --is-selected: 1;
                }
            }
        }
    }
}
</style>