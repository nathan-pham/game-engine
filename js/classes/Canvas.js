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

        this.ctx = this.canvas.getContext("webgl")

        this.resolution = resolution || defaultConfig.resolution
        this.resize()

        if(this.ctx) {
            this.clear()
        } else {
            throw new Error("webgl canvas failed to initialize")
        }
    }

    resize() {
        Object.assign(this.canvas, this.resolution)
        Object.assign(this.canvas.style, this.resolution)
    }

    clear() {
        const ctx = this.ctx

        ctx.clearColor(0.0, 0.0, 0.0, 1.0)
        ctx.clear(ctx.COLOR_BUFFER_BIT)
    }
}