import Canvas from "./classes/Canvas.js"
import ShaderLoader from "./classes/shader/Loader.js"
import ShaderLinker from "./classes/shader/Linker.js"

const canvas = new Canvas({ target: "canvas" })
const vertexShader = await new ShaderLoader("VertexShader", canvas.gl.VERTEX_SHADER).load(canvas.gl)
const fragmentShader = await new ShaderLoader("FragmentShader", canvas.gl.FRAGMENT_SHADER).load(canvas.gl)

const program = new ShaderLinker(vertexShader, fragmentShader).link(canvas.gl)