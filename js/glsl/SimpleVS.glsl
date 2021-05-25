attribute vec3 aVertexPosition;
uniform mat4 uModelTransform;

void main(void) {
    gl_Position = uModelTransform * vec4(aVertexPosition, 1.0);
}