export default class Linker {
    constructor(...shaders) {
        this.shaders = shaders
    }

    link(gl) {
        let program = gl.createProgram()
        for(const shader of this.shaders) {
            gl.attachShader(program, shader)
        }

        gl.linkProgram(program)
        if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error("could not link shaders")
        }

        return program
    }
}