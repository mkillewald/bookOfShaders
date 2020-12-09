#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

void main() {
    // Slow down the frequency until the color change becomes almost imperceptible.
    gl_FragColor = vec4(abs(sin(u_time/20.0)),0.0,0.0,1.0);
}
