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

window.setInterval(render, 42) // call render 42ms (24 fps)

function drawQuad(quad, c) {
    // draw quadrilateral (quad is 4x2 arr of pts, and c is a str of the color
    if (quad.length != 4) {
        console.err("not a quadrilateral")
    }
    x0 = quad[0][0]
    y0 = quad[0][1]
    x1 = quad[1][0]
    y1 = quad[1][1]
    x2 = quad[2][0]
    y2 = quad[2][1]
    x3 = quad[3][0]
    y3 = quad[3][1]
    ctx.fillStyle = colors[c]
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.lineTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.lineTo(x3, y3)
    ctx.closePath()
    ctx.fill()
}

function render() {
    if (document.readyState != 'complete') {
        return
    }
    ctx = document.getElementById('canvas').getContext('2d')
    rect = [[87, 4], [132, 400], [97, 81], [173, 216]]
    drawQuad(rect, 'red')
}





//                                                       //
//                                                       //
//                      HTML CANVAS MAGIC                //
//                                                       //
//                                                       //
// adapted from:
// https://medium.com/@doomgoober/understanding-html-canvas-scaling-and-sizing-c04925d9a830
document.addEventListener("DOMContentLoaded", () => {
    const myCanvas = document.getElementById("canvas");
    const originalHeight = myCanvas.height;
    const originalWidth = myCanvas.width;
    canvasrendersize();
    function canvasrendersize() {
        const dimensions = getObjectFitSize(
            myCanvas.clientWidth,
            myCanvas.clientHeight,
            myCanvas.width,
            myCanvas.height
        );
        myCanvas.width = dimensions.width;
        myCanvas.height = dimensions.height;

        const ctx = myCanvas.getContext("2d");
        const ratio = Math.min(
            myCanvas.clientWidth / originalWidth,
            myCanvas.clientHeight / originalHeight
        );
        ctx.scale(ratio, ratio);
    }

    // adapted from: https://www.npmjs.com/package/intrinsic-scale
    function getObjectFitSize(containerWidth, containerHeight, width, height) {
        const doRatio = width / height;
        const cRatio = containerWidth / containerHeight;
        const targetWidth = 0;
        const targetHeight = 0;

        if (doRatio > cRatio) {
            return {width: containerWidth, height: containerWidth / doRatio}
        } else {
            return {width: containerHeight * doRatio, height: containerHeight}
        }
    }
})
