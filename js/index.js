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

const position = gl.getAttribLocation(program, "aVertexPosition")

gl.useProgram(program)
gl.enableVertexAttribArray(position)

vertexBuffer.bind(gl)

gl.vertexAttribPointer(position, vertexBuffer.size, gl.FLOAT, false, 0, 0)
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)