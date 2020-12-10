#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circleStep(in vec2 st, vec2 center, float radius);
float circleSmoothstep(in vec2 st, vec2 center, float radius, float smoothWidth);

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 orange = vec3(0.8,0.5,0.2);
    float pct = 0.0;
    
    // Circle exercises:
    // Using smoothstep(), experiment with different values to get nice smooth borders on your circle.
    // Once you are happy with an implementation, make a function of it that you can reuse in the future.
    // Add color to the circle.

    pct = circleSmoothstep(st, vec2(0.5), 0.5, 0.25);

    vec3 color = pct*orange;

	gl_FragColor = vec4(color, 1.0);
}

float circleStep(in vec2 st, vec2 center, float radius) {
    return step(distance(st,center),radius);
}

float circleSmoothstep(in vec2 st, vec2 center, float radius, float smoothWidth) {
    float distFromCenter = distance(st,center);
    return smoothstep(distFromCenter,distFromCenter+smoothWidth, radius);
}