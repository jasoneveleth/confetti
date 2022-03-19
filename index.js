// these get reset
let WIDTH = 69
let HEIGHT = 69

const TAU = Math.PI * 2
const NUM_CONFETTI = 1
const dt = 1
const P = 1.618 // golden ratio

let confetti = []

const colors = {
    // 'dark'        : '#3E4452', 
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
    // 'black'       : '#282c34',
}

// set size of window and canvas appropriately
function resizeCanvas() {
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
    ctx.closePath() // fills in the way to go home
    ctx.fill()
}

let rect = [[0,0],[0,0],[0,0],[0,0]] 

function render() {
    ctx = document.getElementById('canvas').getContext('2d')
    // clear rectangle
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // update
    update()

    // draw
    drawQuad(rect, 'red')
    for (let i = 0; i < NUM_CONFETTI; i++) {
        con = confetti[i]
        center = math.vec2mat(con.c)
        // math.matadd(center, )
    }

    // do next frame
    window.requestAnimationFrame(render);
}

function update() {
    // rotating 2d rectangle
    angle = 0.01
    for (let i = 0; i < rect.length; i++) {
        x = rect[i][0] - WIDTH/2
        y = rect[i][1] - HEIGHT/2
        rx = x * Math.cos(angle) - y * Math.sin(angle)
        ry = x * Math.sin(angle) + y * Math.cos(angle)
        rect[i][0] = rx + WIDTH/2
        rect[i][1] = ry + HEIGHT/2
    }

    // falling
    con = confetti[0]
    con.c = [con.c[0] + dt * con.v[0],
             con.c[1] + dt * con.v[1],
             con.c[2] + dt * con.v[2]]
    con.v = [con.v[0] + dt * con.a[0],
             con.v[1] + dt * con.a[1],
             con.v[2] + dt * con.a[2]]
    con.phi += con.dphi
    con.theta += con.dtheta
}

function init() {
    rect = [[WIDTH/2 - WIDTH/4, HEIGHT/2 - HEIGHT/4], 
            [WIDTH/2 + WIDTH/4, HEIGHT/2 - HEIGHT/4], 
            [WIDTH/2 + WIDTH/4, HEIGHT/2 + HEIGHT/4],
            [WIDTH/2 - WIDTH/4, HEIGHT/2 + HEIGHT/4]]
    for (let i = 0; i < NUM_CONFETTI; i++) {
        confetti.push({
            c: [0, 0, HEIGHT],
            v: [0, 0, 0],
            a: [0, 0, -9.81],
            theta: Math.random() * TAU,
            phi: Math.random() * TAU / 2,
            dphi: 0.01, // FIXME
            dtheta: 0.01, // FIXME
        })
    }
}

window.onload = () => {
    window.addEventListener("resize", resizeCanvas, false)
    resizeCanvas()
    init()
    window.requestAnimationFrame(render)
}
