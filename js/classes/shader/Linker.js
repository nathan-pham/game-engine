import engine from "../../engine/index.js"

export default class Linker {
    constructor(...shaders) {
        this.shaders = shaders
    }

    link() {
        const gl = engine.gl

        this.program = gl.createProgram()
        for(const shader of this.shaders) {
            gl.attachShader(this.program, shader.compiled || shader)
        }

        gl.linkProgram(this.program)

        if(!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            throw new Error("could not link shaders")
        }

        return this
    }

    activate(gl) {

    }

    getLocation(method, name) {
        const methods = {
            "attribute": "getAttribLocation",
            "uniform": "getUniformLocation"
        }

        if(methods.hasOwnProperty(method)) {
            return engine.gl[methods[method]](this.program, name)
        } else {
            throw new Error("unsupported method", method, "on getAttribute")
        }
    }
    // getAttribute(gl, name) {
    //     return gl.getAttribLocation(this.program, name)
    // }
}