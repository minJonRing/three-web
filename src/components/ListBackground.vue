<template>
    <div ref="back" class="list-back" @click="handleClick">
        <canvas class="list-back-canvas"></canvas>
        <div :class="['title', software.name ? 'active' : '']">
            <div>{{ software.name }}</div>
            <div class="sub">{{ software.describe }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        software: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            canvasEl: null,
            canvasElHeight: 0,
            gl: null,
            uniforms: null,
            pointer: {
                x: 0,
                y: 0,
                tX: 0,
                tY: 0,
            },
            devicePixelRatio: 1,
            colorNum: 0,
            targetColorNum: 100
        }
    },
    mounted() {
        this.devicePixelRatio = Math.min(window.devicePixelRatio, 2);
        this.$nextTick(() => {
            this.initCanvas()
        })

    },
    methods: {
        initCanvas() {
            const canvasEl = document.querySelector(".list-back-canvas");
            const canvasElHeight = document.querySelector('.list-back').clientHeight;
            this.canvasEl = canvasEl;
            this.canvasElHeight = canvasElHeight;

            this.gl = this.initShader();

            this.setupEvents();
            this.resizeCanvas();

            window.addEventListener("resize", this.resizeCanvas);
            this.render();
        },
        initShader() {
            const vsSource = document.getElementById("vertShader").innerHTML;
            const fsSource = document.getElementById("fragShader").innerHTML;

            const gl = this.canvasEl.getContext("webgl") || this.canvasEl.getContext("experimental-webgl");

            if (!gl) {
                alert("WebGL is not supported by your browser.");
            }

            function createShader(gl, sourceCode, type) {
                const shader = gl.createShader(type);
                gl.shaderSource(shader, sourceCode);
                gl.compileShader(shader);

                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
                    gl.deleteShader(shader);
                    return null;
                }

                return shader;
            }

            const vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER);
            const fragmentShader = createShader(gl, fsSource, gl.FRAGMENT_SHADER);

            function createShaderProgram(gl, vertexShader, fragmentShader) {
                const program = gl.createProgram();
                gl.attachShader(program, vertexShader);
                gl.attachShader(program, fragmentShader);
                gl.linkProgram(program);

                if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                    console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(program));
                    return null;
                }

                return program;
            }

            const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
            this.uniforms = getUniforms(shaderProgram);

            function getUniforms(program) {
                const uniforms = [];
                let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
                for (let i = 0; i < uniformCount; i++) {
                    let uniformName = gl.getActiveUniform(program, i).name;
                    uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
                }
                return uniforms;
            }

            const vertices = new Float32Array([-1., -1., 1., -1., -1., 1., 1., 1.]);

            const vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            gl.useProgram(shaderProgram);

            const positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
            gl.enableVertexAttribArray(positionLocation);

            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

            return gl;
        },
        updateMousePosition(eX, eY) {
            this.pointer.tX = eX;
            this.pointer.tY = eY;
        },
        setupEvents() {
            const targetEl = document.querySelector('.list-back-canvas');
            targetEl.addEventListener("pointermove", e => {
                this.updateMousePosition(e.clientX, e.clientY);
            });
            targetEl.addEventListener("touchmove", e => {
                this.updateMousePosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            });
            targetEl.addEventListener("click", e => {
                this.updateMousePosition(e.clientX, e.clientY);
            });
        },
        resizeCanvas() {
            this.canvasEl.width = window.innerWidth * this.devicePixelRatio;
            this.canvasEl.height = this.canvasElHeight * this.devicePixelRatio;
            this.gl.uniform1f(this.uniforms.u_ratio, this.canvasEl.width / this.canvasEl.height);
            this.gl.viewport(0, 0, this.canvasEl.width, this.canvasEl.height);
        },
        render() {
            const currentTime = performance.now();
            const { x, y, tX, tY } = this.pointer;
            // if (this.targetColorNum !== this.colorNum) {
            //     const abs = Math.abs(Math.ceil((this.targetColorNum - this.colorNum) / 100))
            //     if (this.targetColorNum > this.colorNum) {
            //         this.colorNum += abs
            //     } else {
            //         this.colorNum -= abs
            //     }
            // }
            this.colorNum += 1
            this.pointer.x += (tX - x) * .5;
            this.pointer.y += (tY - y) * .5;

            this.gl.uniform1f(this.uniforms.u_time, currentTime);
            this.gl.uniform2f(this.uniforms.u_pointer_position, this.pointer.x / window.innerWidth, 1 - this.pointer.y / this.canvasElHeight);
            this.gl.uniform1f(this.uniforms.u_scroll_progress, this.colorNum / (2 * window.innerHeight));

            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
            requestAnimationFrame(this.render);
        },
        handleClick() {
            this.targetColorNum += 100
        }
    }
}
</script>

<style lang="scss" scoped>
.list-back {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #000;

    .list-back-canvas {
        width: 100%;
        height: 100%;
    }

    .title {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 70%;
        transform: translate(-50%, -50%);
        border-radius: 4px;
        // background-color: rgba(255, 255, 255, .3);
        // backdrop-filter: blur(4px);
        color: #fff;
        font-size: clamp(16px, 2vw, 40px);
        text-align: center;
        padding: 1% 2%;
        letter-spacing: 6px;
        text-shadow: 0 0 3px #fff;
        opacity: 0;
        transition-duration: 600ms;
        pointer-events: none;
        user-select: none;

        &.active {
            opacity: 1;
        }

        .sub {
            padding-top: 10px;
            font-size: clamp(12px, 1vw, 16px);
        }
    }
}
</style>