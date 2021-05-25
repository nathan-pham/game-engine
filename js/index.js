import ShaderLoader from "./classes/shader/Loader.js"
import ShaderLinker from "./classes/shader/Linker.js"
import VertexBuffer from "./classes/VertexBuffer.js"
import Object from "./classes/Object.js"
import engine from "./engine.js"

const gl = engine.gl

const vertexShader = await new ShaderLoader("VertexShader", gl.VERTEX_SHADER).load()
const fragmentShader = await new ShaderLoader("FragmentShader", gl.FRAGMENT_SHADER).load()

const simpleShader = new ShaderLinker(vertexShader, fragmentShader).link()
const vertexPosition = simpleShader.getLocation("attribute", "aVertexPosition")
const pixelColor = simpleShader.getLocation("uniform", "uPixelColor")

simpleShader.activate = (gl, color) => {
    gl.enableVertexAttribArray(vertexPosition)
    gl.vertexAttribPointer(vertexPosition, vertexBuffer.size, gl.FLOAT, false, 0, 0)
    gl.uniform4fv(pixelColor, color)
}

engine.clear()
engine.program(simpleShader)
    
const vertexBuffer = new VertexBuffer("square")

const object = new Object(simpleShader)
object.render([1, 0, 0.5, 1])