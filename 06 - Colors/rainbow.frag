#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.3,0.4,0.8);

    float pct = distance(st,vec2(0.5));

    color += mix(color, vec3(0.0), pct+0.5);
    
    gl_FragColor = vec4(color,1.0);
}