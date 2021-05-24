const geometryVertices = {
    square: [
        0.5,   0.5,  0.0,
        -0.5,  0.5,  0.0,
        0.5,  -0.5,  0.0,
        -0.5, -0.5,  0.0
    ]
}

export default class VertexBuffer {
    constructor(type="square", gl) {
        if(!geometryVertices.hasOwnProperty(type)) {
            throw new Error("unknown vertex buffer type")
        }

        this.type = type

        this.buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometryVertices[this.type]), gl.STATIC_DRAW)
    }
}