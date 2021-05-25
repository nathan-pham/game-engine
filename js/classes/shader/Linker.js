import engine from "../../engine.js"

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

    // getAttribute(gl, name) {
    //     return gl.getAttribLocation(this.program, name)
    // }
}