import Canvas from "./classes/Canvas.js"
import ShaderLoader from "./classes/shader/Loader.js"
import ShaderLinker from "./classes/shader/Linker.js"
import VertexBuffer from "./classes/VertexBuffer.js"

const canvas = new Canvas({ target: "canvas" })
const gl = canvas.gl

const vertexShader = await new ShaderLoader("VertexShader", gl.VERTEX_SHADER).load(gl)
const fragmentShader = await new ShaderLoader("FragmentShader", gl.FRAGMENT_SHADER).load(gl)

const program = new ShaderLinker(vertexShader, fragmentShader).link(gl)

const vertexBuffer = new VertexBuffer("square", canvas)

const vertexPosition = gl.getAttribLocation(program, "aVertexPosition")
const pixelColor = gl.getUniformLocation(program, "uPixelColor")

canvas.clear()

gl.useProgram(program)
gl.enableVertexAttribArray(vertexPosition)
gl.uniform4fv(pixelColor, [1, 0, 0.5, 1])

gl.vertexAttribPointer(vertexPosition, vertexBuffer.size, gl.FLOAT, false, 0, 0)
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)