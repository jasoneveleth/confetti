// these get reset
let WIDTH = 69
let HEIGHT = 69

const colors = {
    'dark'        : '#3E4452', 
    'red'         : '#e06c75', 
    'green'       : '#98c379', 
    'yellow'      : '#e5c07b', 
    'blue'        : '#61afef', 
    'magenta'     : '#c678dd', 
    'cyan'        : '#56b6c2', 
    'light'       : '#abb2bf', 
    'grey'        : '#5c6370', 
    'light red'   : '#be5046', 
    'light yellow': '#d19a66', 
    'white'       : '#ffffff', 
    'black'       : '#282c34',
}

// set size of window and canvas appropriately
function sizeCanvas() {
  const canvas = document.getElementById("canvas");
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
}

function drawQuad(quad, c) {
    // draw quadrilateral (quad is 4x2 arr of pts, and c is a str of the color
    if (quad.length != 4) {
        console.err("not a quadrilateral")
    }
    ctx.fillStyle = colors[c]
    ctx.beginPath()
    ctx.moveTo(quad[0][0], quad[0][1])
    ctx.lineTo(quad[1][0], quad[1][1])
    ctx.lineTo(quad[2][0], quad[2][1])
    ctx.lineTo(quad[3][0], quad[3][1])
    ctx.closePath()
    ctx.fill()
}

let rect = [[WIDTH/2 - WIDTH/4, HEIGHT/2 - HEIGHT/4], 
            [WIDTH/2 + WIDTH/4, HEIGHT/2 - HEIGHT/4], 
            [WIDTH/2 + WIDTH/4, HEIGHT/2 + HEIGHT/4],
            [WIDTH/2 - WIDTH/4, HEIGHT/2 + HEIGHT/4]] 

function render() {
    if (document.readyState != 'complete') {
        return
    }
    ctx = document.getElementById('canvas').getContext('2d')

    // clear canvas: https://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing?rq=1
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    angle = 0.01
    for (let i = 0; i < rect.length; i++) {
        x = rect[i][0] - WIDTH/2
        y = rect[i][1] - HEIGHT/2
        rx = x * Math.cos(angle) - y * Math.sin(angle)
        ry = x * Math.sin(angle) + y * Math.cos(angle)
        rect[i][0] = rx + WIDTH/2
        rect[i][1] = ry + HEIGHT/2
    }
    drawQuad(rect, 'red')

    // get next frame
    window.requestAnimationFrame(render);
}

function init() {
    rect = [[WIDTH/2 - WIDTH/4, HEIGHT/2 - HEIGHT/4], 
            [WIDTH/2 + WIDTH/4, HEIGHT/2 - HEIGHT/4], 
            [WIDTH/2 + WIDTH/4, HEIGHT/2 + HEIGHT/4],
            [WIDTH/2 - WIDTH/4, HEIGHT/2 + HEIGHT/4]]
}

window.onload = () => {
    window.addEventListener("resize", sizeCanvas, false)
    sizeCanvas()
    init()
    window.requestAnimationFrame(render)
}
