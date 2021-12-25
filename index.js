const colors = {
'black'       : '#3E4452', 
'red'         : '#e06c75', 
'green'       : '#98c379', 
'yellow'      : '#e5c07b', 
'blue'        : '#61afef', 
'magenta'     : '#c678dd', 
'cyan'        : '#56b6c2', 
'white'       : '#abb2bf', 

'grey'        : '#5c6370', 
'light red'   : '#be5046', 
'light yellow': '#d19a66', 
'white'       : '#ffffff', 
'text'        : '#282c34',
}

window.setInterval(render, 500) // call render 42ms (24 fps)

x1 = 100
y1 = 50
x2 = 200
y2 = 150

function dQuad(quad) {
    // draw quadrilateral
    if (quad.length != 4) {
        console.err("not a quadrilateral")
    }
    // DAFJKDS:FADS
}

function render() {
    if (document.readyState != 'complete') {
        return
    }
    ctx = document.getElementById('canvas').getContext('2d')
    console.log(x2)
    x1 += 10
    y1 += 10
    x2 += 10
    y2 += 10

    ctx.fillStyle = colors['red']
    ctx.beginPath()
    ctx.moveTo(10,10)
    ctx.lineTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.closePath()
    ctx.fill()
}
