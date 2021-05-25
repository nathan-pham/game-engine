import engine from "./index.js"

export default class Object {
    constructor(linker) {
        this.linker = linker
    }

    render(...variables) {
        const gl = engine.gl
        
        this.linker.activate(gl, ...variables)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
}