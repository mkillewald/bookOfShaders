#ifdef GL_ES
precision mediump float;
#endif

#define HALF_PI 1.5707963267948966

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circleStep(in vec2 st, vec2 center, float radius);
float circleSmoothstep(in vec2 st, vec2 center, float radius, float smoothWidth);

// Robert Penner's easing functions in GLSL
// https://github.com/stackgl/glsl-easings
float elasticInOut(float t);

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 orange = vec3(0.8,0.5,0.2);
    float pct = 0.0;
    
    // Circle exercises:
    // Using smoothstep(), experiment with different values to get nice smooth borders on your circle.
    // Once you are happy with an implementation, make a function of it that you can reuse in the future.
    // Add color to the circle.
    // Can you animate your circle to grow and shrink, simulating a beating heart? 

    float t = u_time*0.3125;
    float radius = 0.25+elasticInOut(abs(fract(t)*2.0-1.0))/3.0;
    pct = circleSmoothstep(st, vec2(0.5), radius, 0.25);

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

// Robert Penner's easing functions in GLSL
// https://github.com/stackgl/glsl-easings
float elasticInOut(float t) {
  return t < 0.5
    ? 0.5 * sin(+13.0 * HALF_PI * 2.0 * t) * pow(2.0, 10.0 * (2.0 * t - 1.0))
    : 0.5 * sin(-13.0 * HALF_PI * ((2.0 * t - 1.0) + 1.0)) * pow(2.0, -10.0 * (2.0 * t - 1.0)) + 1.0;
}
