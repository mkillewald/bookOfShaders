#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

void main() {
    // Play with the three channels (RGB) in different frequencies to get interesting patterns and behaviors.
    gl_FragColor = vec4(abs(sin(u_time)),abs(sin(u_time/3.0)),abs(sin(u_time/5.0)),1.0);
}
