#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    
    // Circle exercise:
    // Use step() to turn everything above 0.5 to white and everything below to 0.0

    float distFromCenter = distance(st,vec2(0.5));
    pct = step(0.5, distFromCenter);

    vec3 color = vec3(pct);

	gl_FragColor = vec4(color, 1.0);
}