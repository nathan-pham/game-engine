import Canvas from "./classes/Canvas.js"

const canvas = new Canvas({ target: "#canvas" })

for(const [key, value] of Object.entries(glMatrix)) {
    window[key] = value
}

export default canvas