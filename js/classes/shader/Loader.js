import engine from "../../engine/index.js"

export default class Loader {
    constructor(id, type) {
        this.id = id
        this.type = type
    }

    async load() {
        const element = document.getElementById(this.id)
        const gl = engine.gl

        let source = element.firstChild?.textContent

        if(element.hasAttribute("src")) {
            const path = element.getAttribute("src")
            source = await fetch(path).then(res => res.text())
        }

        this.compiled = gl.createShader(this.type)
        gl.shaderSource(this.compiled, source)
        gl.compileShader(this.compiled)

        if(!gl.getShaderParameter(this.compiled, gl.COMPILE_STATUS)) {
            throw new Error("shader failed to compile: ", gl.getShaderInfoLog(this.compiled))
        }

        return this
    }

    dispose(gl) {
        gl.deleteShader(this.compiled)
    }
}