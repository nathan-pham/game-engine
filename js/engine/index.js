import Canvas from "../classes/Canvas.js"

for(const [key, value] of Object.entries(glMatrix)) {
    window[key] = value
}

const canvas = new Canvas({ target: "#canvas" })
export default canvas