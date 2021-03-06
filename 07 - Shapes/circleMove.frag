#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circleStep(in vec2 st, vec2 center, float radius);
float circleSmoothstep(in vec2 st, vec2 center, float radius, float smoothWidth);

// Robert Penner's easing functions in GLSL
// https://github.com/stackgl/glsl-easings
float bounceOut(float t);
float bounceIn(float t);
float bounceInOut(float t);

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 orange = vec3(0.8,0.5,0.2);
    float pct = 0.0;
    
    // Circle exercises:
    // What about moving this circle? 

    float t = u_time*0.5;
    vec2 center = vec2(abs(sin(t)),bounceIn(abs(fract(t*0.25)*2.0-1.0)));
    pct = circleSmoothstep(st, center, 0.4, 0.25);

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
float bounceOut(float t) {
  const float a = 4.0 / 11.0;
  const float b = 8.0 / 11.0;
  const float c = 9.0 / 10.0;

  const float ca = 4356.0 / 361.0;
  const float cb = 35442.0 / 1805.0;
  const float cc = 16061.0 / 1805.0;

  float t2 = t * t;

  return t < a
    ? 7.5625 * t2
    : t < b
      ? 9.075 * t2 - 9.9 * t + 3.4
      : t < c
        ? ca * t2 - cb * t + cc
        : 10.8 * t * t - 20.52 * t + 10.72;
}

float bounceIn(float t) {
  return 1.0 - bounceOut(1.0 - t);
}

float bounceInOut(float t) {
  return t < 0.5
    ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0))
    : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5;
}