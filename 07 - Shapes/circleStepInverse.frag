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
    // Inverse the colors of the background and foreground.

    float distFromCenter = distance(st,vec2(0.5));
    pct = step(distFromCenter, 0.5);

    vec3 color = vec3(pct);

	gl_FragColor = vec4(color, 1.0);
}