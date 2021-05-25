const defaultConfig = {
    resolution: {
        width: 600,
        height: 480
    }
}

export default class Canvas {
    constructor({ target, resolution = defaultConfig.resolution }) {
        this.canvas = typeof target == "string" 
            ? document.querySelector(target)
            : target

        if(typeof this.canvas.tagName == "undefined" || this.canvas.tagName.toUpperCase() !== "CANVAS") {
            throw new Error("selected element is not an HTML5 canvas")
        }

        this.gl = this.canvas.getContext("webgl")

        this.resolution = resolution || defaultConfig.resolution
        this.resize()

        if(this.gl) {
            this.clear()
        } else {
            throw new Error("webgl canvas failed to initialize")
        }
    }

    get aspect() {
        return this.resolution.width / this.canvas.height
    }

    resize() {
        Object.assign(this.canvas, this.resolution)
        Object.assign(this.canvas.style, Object.keys(this.resolution).reduce((prev, curr) => ({
            ...prev,
            [curr]: this.resolution[curr] + "px"
        }), {}))

        this.gl.viewport(0, 0, this.resolution.width, this.resolution.height)
    }

    clear(bgColor=[0.0, 0.0, 0.0, 1.0]) {
        this.gl.clearColor(...bgColor)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    }

    program(linker) {
        this.gl.useProgram(linker.program || linker)
    }
}