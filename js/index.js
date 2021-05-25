import ShaderLoader from "./classes/shader/Loader.js"
import ShaderLinker from "./classes/shader/Linker.js"
import VertexBuffer from "./classes/VertexBuffer.js"
import engine from "./engine.js"

const gl = engine.gl
const vertexShader = await new ShaderLoader("VertexShader", gl.VERTEX_SHADER).load()
const fragmentShader = await new ShaderLoader("FragmentShader", gl.FRAGMENT_SHADER).load()

const linker = new ShaderLinker(vertexShader, fragmentShader).link()

const vertexBuffer = new VertexBuffer("square")

const vertexPosition = gl.getAttribLocation(linker.program, "aVertexPosition")
const pixelColor = gl.getUniformLocation(linker.program, "uPixelColor")

engine.clear()
engine.use(linker)

gl.enableVertexAttribArray(vertexPosition)
gl.uniform4fv(pixelColor, [1, 0, 0.5, 1])

gl.vertexAttribPointer(vertexPosition, vertexBuffer.size, gl.FLOAT, false, 0, 0)
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)