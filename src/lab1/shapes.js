/* eslint no-unused-vars: ["warn", { "varsIgnorePattern": "render" }] */

const shapeVertex = `

    attribute vec4 vertex;

    void main() {
        // assign a value to gl_Position
        gl_Position = vertex;
    }

`;

/**
 *
 * @param {String} src source code
 * @param {Number} shaderType
 * @param {WebGLRenderingContext} gl WebGL context to draw to
 *
 * @return {WebGLShader} compiled shader or null
 */
function loadShader(gl, shaderType, src) {
    let shader = gl.createShader(shaderType);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        // get the compiler errors
        console.error(gl.getShaderInfoLog(shader));
        // delete the shader
        gl.deleteShader(shader);

        return null;
    }

    return shader;
}

/**
 *
 * @param {WebGLRenderingContext} gl
 * @param {String} vertexSrc
 * @param {String} fragmentSrc
 */
function createProgram(gl, vertexSrc, fragmentSrc) {
    let vertextShader = loadShader(gl, gl.VERTEX_SHADER, vertexSrc);
    let fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);

    let program = gl.createProgram();
    gl.attachShader(program, vertextShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);

        return null;
    }

    return program;
}

function render() {
    // Do stuff
    console.info("This ran.");
    /** @type {HTMLCanvasElement} */
    let canvas = document.getElementById("myCanvas");
    /** @type {WebGLRenderingContext} */
    let gl = canvas.getContext("webgl");

    // set canvas width/height
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // set viewport
    gl.viewport(0, 0, canvas.width, canvas.height);
    // enable depth test and clear depth
    gl.enable(gl.DEPTH_TEST);
    gl.clearDepth(1);

    gl.clearColor(0.0, 0.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.COLOR_DEPTH_BIT);

    star(gl);
    hex(gl);
    circle(gl);
}

/**
 * Draws a star
 *
 * @param {WebGLRenderingContext} gl WebGl context to draw to (note: the WebGl... fills in autocomplete)
 */
function star(gl) {
    // create the vertices for the star
    // first triangle
    let starVertices = [
        -0.6, -0.5, 0,
        0, -0.6, 0,
        -0.8, -1, 0,

        0, -0.6, 0,
        -1, -0.6, 0,
        -0.6, -0.8, 0,

        -0.2, -1, 0,
        -0.4, -0.5, 0,
        -0.5, -0.2, 0
    ];

    // create buffer
    let starBuffer = gl.createBuffer();
    // bind buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, starBuffer);
    // buffer the data
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(starVertices), gl.STATIC_DRAW);


    let program = createProgram(gl, shapeVertex,
        document.getElementById("goldFragShader").innerText);

    let vert = gl.getAttribLocation(program, "vertex");
    gl.vertexAttribPointer(vert, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vert);

    gl.useProgram(program);


    // make sure buffer is active
    gl.bindBuffer(gl.ARRAY_BUFFER, starBuffer);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 9);
}
/**
 * Draws a hexagon
 *
 * @param {WebGLRenderingContext} gl WebGl context to draw to (note: the WebGl... fills in autocomplete)
 */

function hex(gl) {
    // create the vertices for the hex
    // first triangle
    let hexVertices = [];
    for (let i = 0; i < 6; i++) {
        hexVertices.push(0.3 * Math.cos(i * Math.PI / 3), 0.3 * Math.sin(i * Math.PI / 3), 0);
    }

    // create buffer
    let hexBuffer = gl.createBuffer();
    // bind buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, hexBuffer);
    // buffer the data
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(hexVertices), gl.STATIC_DRAW);


    let program = createProgram(gl, shapeVertex,
        document.getElementById("purpleFragShader").innerText);

    let vert = gl.getAttribLocation(program, "vertex");
    gl.vertexAttribPointer(vert, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vert);

    gl.useProgram(program);


    // make sure buffer is active
    gl.bindBuffer(gl.ARRAY_BUFFER, hexBuffer);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);
}

/**
 * Draws a circle
 *
 * @param {WebGLRenderingContext} gl WebGl context to draw to (note: the WebGl... fills in autocomplete)
 */
function circle(gl) {
    // create the vertices for the circle
    // first triangle
    let circleVertices = [];
    for (let i = 0; i < 300; i++) {
        circleVertices.push(0.3 * Math.cos(i * Math.PI / 100) + 0.5, 0.3 * Math.sin(i * Math.PI / 100) + 0.5, 0);
    }

    // create buffer
    let circleBuffer = gl.createBuffer();
    // bind buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, circleBuffer);
    // buffer the data
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(circleVertices), gl.STATIC_DRAW);


    let program = createProgram(gl, shapeVertex,
        document.getElementById("orangeFragShader").innerText);

    let vert = gl.getAttribLocation(program, "vertex");
    gl.vertexAttribPointer(vert, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vert);

    gl.useProgram(program);


    // make sure buffer is active
    gl.bindBuffer(gl.ARRAY_BUFFER, circleBuffer);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 300);


}
