const geometryVertices = {
    square: {
        points: [
            0.5, 0.5, 0.0,
            -0.5, 0.5, 0.0,
            0.5, -0.5, 0.0,
            -0.5, -0.5, 0.0
        ],
        size: 3
    }
}

export default class VertexBuffer {
    constructor(type="square", canvas) {
        if(!geometryVertices.hasOwnProperty(type)) {
            throw new Error("unknown vertex buffer type")
        }

        const geometry = geometryVertices[type]
        const gl = canvas.gl

        this.size = geometry.size


        this.buffer = gl.createBuffer()
        this.bind(gl)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry.points), gl.STATIC_DRAW)
    }

    bind(gl) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    }
}