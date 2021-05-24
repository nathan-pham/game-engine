export default class Loader {
    constructor(id, type) {
        this.id = id
        this.type = type
    }

    async load(gl) {
        const element = document.getElementById(this.id)
        let source = element.firstChild?.textContent

        if(element.hasAttribute("src")) {
            const path = element.getAttribute("src")
            source = await fetch(path).then(res => res.text())
        }

        let compiled = gl.createShader(this.type)
        gl.shaderSource(compiled, source)
        gl.compileShader(compiled)

        if(!gl.getShaderParameter(compiled, gl.COMPILE_STATUS)) {
            throw new Error("shader failed to compile: ", gl.getShaderInfoLog(compiled))
        }

        return compiled
    }
}