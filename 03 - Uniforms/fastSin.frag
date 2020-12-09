#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

void main() {
    // Speed it up until you see a single color without flickering.
    gl_FragColor = vec4(abs(sin(u_time/0.0000001)),0.5,0.5,1.0);
}

