import ShaderLoader from "./classes/shader/Loader.js"
import ShaderLinker from "./classes/shader/Linker.js"
import VertexBuffer from "./engine/VertexBuffer.js"
import Object from "./engine/Object.js"
import engine from "./engine/index.js"

const gl = engine.gl

const vertexShader = await new ShaderLoader("VertexShader", gl.VERTEX_SHADER).load()
const fragmentShader = await new ShaderLoader("FragmentShader", gl.FRAGMENT_SHADER).load()

const simpleShader = new ShaderLinker(vertexShader, fragmentShader).link()
const vertexPosition = simpleShader.getLocation("attribute", "aVertexPosition")
const modelTransform = simpleShader.getLocation("uniform", "uModelTransform")
const pixelColor = simpleShader.getLocation("uniform", "uPixelColor")

simpleShader.activate = (gl, color, transform) => {
    gl.enableVertexAttribArray(vertexPosition)
    gl.vertexAttribPointer(vertexPosition, vertexBuffer.size, gl.FLOAT, false, 0, 0)
    gl.uniformMatrix4fv(modelTransform, false, transform)
    gl.uniform4fv(pixelColor, color)
}

engine.clear()
engine.program(simpleShader)
    
const vertexBuffer = new VertexBuffer("square")

const objectOne = new Object(simpleShader)
const objectTwo = new Object(simpleShader)

const xform = mat4.create()

objectOne.render([1, 0, 0.5, 1], (() => {
    mat4.identity(xform)

    mat4.translate(xform, xform, vec3.fromValues(-0.25, 0.25, 0.0))
    mat4.rotateZ(xform, xform, 0.2)
    mat4.scale(xform, xform, vec3.fromValues(1.2, 1.2, 1.0))

    return xform
})())

objectTwo.render([1, 1, 1, 1], (() => {
    mat4.identity(xform)

    mat4.translate(xform, xform, vec3.fromValues(0.25, -0.25, 0.0))
    mat4.rotateZ(xform, xform, -0.785)
    mat4.scale(xform, xform, vec3.fromValues(0.4, 0.4, 1.0))
    
    return xform
})())
