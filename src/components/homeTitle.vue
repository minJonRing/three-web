<template>
    <div class="home-title">
        <canvas id="home-title-canvas"></canvas>
    </div>
</template>

<script>
export default {
    props: {
        anima: {
            type: Boolean,
            default: false
        },
        words: {
            type: String,
            default: "深 空 Web Development"
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            const box = document.querySelector('.home-title')
            const canvas = document.querySelector("#home-title-canvas")
            const ctx = canvas.getContext("2d")
            var particles = []
            var amount = 0
            var mouse = { x: -100, y: -100 }
            const radius = 1
            const num = 220;
            canvas.width = window.innerWidth;
            canvas.height = box.clientHeight;

            const colors = ["#ffffff", "#ffcbcb", "#FFB03B", "#fff2cb", "#cbfff1"];

            var ww = canvas.width;
            var wh = canvas.height;


            function Particle(x, y) {
                this.x = Math.random() * ww;
                // this.y = Math.random() * wh;
                this.y = -20;
                this.dest = {
                    x: x,
                    y: y
                };
                this.r = Math.random() * 2 + canvas.width / 500;
                this.vx = (Math.random() - 0.5) * 20;
                this.vy = (Math.random() - 0.5) * 20;
                this.accX = 0;
                this.accY = 0;
                // 缓动时间
                // this.friction = Math.random() * 0.05 + 0.94;
                this.friction = 0.94;

                this.color = colors[Math.floor(Math.random() * 6)];
            }

            Particle.prototype.render = function () {
                this.accX = (this.dest.x - this.x) / 1000;
                this.accY = (this.dest.y - this.y) / 1000;
                this.vx += this.accX;
                this.vy += this.accY;
                this.vx *= this.friction;
                this.vy *= this.friction;

                this.x += this.vx;
                this.y += this.vy;

                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
                ctx.fill();

                const a = this.x - mouse.x;
                const b = this.y - mouse.y;

                const distance = Math.sqrt(a * a + b * b);
                if (distance < (radius * 70)) {
                    this.accX = (this.x - mouse.x) / 100;
                    this.accY = (this.y - mouse.y) / 100;
                    this.vx += this.accX;
                    this.vy += this.accY;
                }

            }

            function onMouseMove(e) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            }

            const initScene = () => {
                ww = canvas.width;
                wh = canvas.height;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.font = "bold " + (ww / 15) + "px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(this.words, ww / 2, wh / 2 + ww / 15 / 3);

                const data = ctx.getImageData(0, 0, ww, wh).data;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = "screen";

                particles = [];
                for (let i = 0; i < ww; i += Math.round(ww / num)) {
                    for (let j = 0; j < wh; j += Math.round(ww / num)) {
                        if (data[((i + j * ww) * 4) + 3] > num) {
                            particles.push(new Particle(i, j));
                        }
                    }
                }
                amount = particles.length;

            }

            const render = (a) => {
                requestAnimationFrame(render);
                if (this.anima) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    for (let i = 0; i < amount; i++) {
                        particles[i].render();
                    }
                }
            };

            // window.addEventListener("resize", initScene);
            window.addEventListener("mousemove", onMouseMove);
            initScene();
            requestAnimationFrame(render);
        }
    }
}   
</script>

<style lang="scss" scoped>
.home-title {
    height: 100%;

    #home-title-canvas {
        width: 100%;
        height: 100%;
    }
}
</style>