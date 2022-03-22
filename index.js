// these get reset
let WIDTH = 69
let HEIGHT = 69

const TAU = Math.PI * 2
const dt = 0.01
const PHI = 1.61803398875 // golden ratio
const SZ = 0.2


let confetti = Array(800)
const Rt = math.zeros(3, 4)
const K = math.zeros(3, 3)

const colors = {
    // 'dark'        : '#3E4452', 
    'red'         : '#e06c75', 
    'green'       : '#98c379', 
    'yellow'      : '#e5c07b', 
    'blue'        : '#61afef', 
    'magenta'     : '#c678dd', 
    'cyan'        : '#56b6c2', 
    'light'       : '#abb2bf', 
    // 'grey'        : '#5c6370', 
    'light red'   : '#be5046', 
    'light yellow': '#d19a66', 
    // 'white'       : '#ffffff', 
    // 'black'       : '#282c34',
}

function random_color() {
    let names = Object.keys(colors)
    let ind = Math.floor(Math.random() * names.length)
    return names[ind]
}

// set size of window and canvas appropriately
function resizeCanvas() {
    const canvas = document.getElementById("canvas");
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    // extrinsic matrix
    //[1, 0, 0, t_x]
    //[0, 1, 0, t_y]
    //[0, 0, 1, t_z]
    // our rotation is identity, translation is identity
    Rt[0][0] = 1
    Rt[1][1] = 1
    Rt[2][2] = 1
    Rt[0][3] = 0
    Rt[1][3] = 0
    Rt[2][3] = 10

    // intrinsic matrix
    // [f_x, s,   u]
    // [0,   f_x, v]
    // [0,   0,   1]
    // f_x, f_y = focal length (in pixels)
    // u, v are principle point offset (if you shift the sensor in the camera
    // s is skew
    K[0][0] = math.max(WIDTH, HEIGHT) / 2
    K[1][1] = math.max(WIDTH, HEIGHT) / 2
    K[2][2] = 1

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
}

function drawQuad(quad, c) {
    // draw quadrilateral (quad is 4x2 arr of pts, and c is a str of the color
    if (quad.length != 4) {
        throw "not a quadrilateral"
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

function off_screen(con) {
    if (con.c[1][0] < -6) {
        return false
    } else {
        return true
    }
}

function render() {
    ctx = document.getElementById('canvas').getContext('2d')
    // clear rectangle
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // replace confetti off screen with new
    confetti = replace(off_screen, init, confetti)

    confetti = map(update, confetti)
    world_coords = map(extract_verts, confetti)
    image_coords = map(a => map(math.world2image, a), world_coords)

    con_colors = map(extract_colors, confetti)
    map2(drawQuad, image_coords, con_colors)

    // do next frame
    window.requestAnimationFrame(render);
}

function extract_verts(con) {
    // rectangle centered at origin, y=0
    v1 = [[PHI * SZ / 2], [0], [SZ / 2]]
    v2 = [[PHI * SZ / 2], [0], [-SZ / 2]]
    v3 = [[-PHI * SZ / 2], [0], [-SZ / 2]]
    v4 = [[-PHI * SZ / 2], [0], [SZ / 2]]

    X = math.xrot(con.theta)
    Y = math.yrot(con.phi)

    // rotate verts
    v1 = math.matmul(Y, math.matmul(X, v1))
    v2 = math.matmul(Y, math.matmul(X, v2))
    v3 = math.matmul(Y, math.matmul(X, v3))
    v4 = math.matmul(Y, math.matmul(X, v4))

    // move to center
    v1 = math.matadd(v1, con.c)
    v2 = math.matadd(v2, con.c)
    v3 = math.matadd(v3, con.c)
    v4 = math.matadd(v4, con.c)

    return [v1, v2, v3, v4]
}

function extract_colors(con) {
    return con.color
}

function update(con) {
    ret = JSON.parse(JSON.stringify(con))
    ret.c = math.matadd(con.c, math.matscale(con.v, dt))
    ret.v = math.matadd(con.v, math.matscale(con.a, dt))
    ret.phi = con.phi + con.dphi
    ret.theta = con.theta + con.dtheta
    return ret
}

function init() {
    c_x = 0
    c_y = 0
    v_x = Math.random() * 16 - 8
    v_y = Math.random() * 8 + 4
    con = {
        c: [[c_x], [c_y], [0]],
        v: [[v_x], [v_y], [0]],
        a: [[0], [-9.81], [0]],
        theta: Math.random() * TAU,
        phi: Math.random() * TAU / 2,
        dphi: Math.random() / 10,
        dtheta: Math.random() / 10,
        color: random_color()
    }
    return con
}

function replace(filter, new_obj, l) {
    let new_l = []
    for (let i = 0; i < l.length; i++) {
        // TODO fast copy so we don't mutate
        if (filter(l[i])) {
            new_l[i] = l[i]
        } else {
            new_l[i] = new_obj()
        }
    }
    return new_l
}

function map(f, l) {
    let new_l = Array(l.length)
    for (let i = 0; i < l.length; i++) {
        // TODO fast copy so we don't mutate
        con = f(l[i])
        new_l[i] = con
    }
    return new_l
}

function map2(f, l1, l2) {
    if (l1.length != l2.length) { throw 'diff lens' }

    let new_l = Array(l1.length)
    for (let i = 0; i < l1.length; i++) {
        // TODO fast copy so we don't mutate
        new_l[i] = f(l1[i], l2[i])
    }
    return new_l
}

window.onload = () => {
    window.addEventListener("resize", resizeCanvas, false)
    resizeCanvas()
    confetti = map(init, confetti)
    window.requestAnimationFrame(render)
}
