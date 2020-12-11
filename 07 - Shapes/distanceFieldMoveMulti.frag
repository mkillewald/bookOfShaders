#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circleSmoothstep(in vec2 st, vec2 center, float radius, float smoothWidth);

// Robert Penner's easing functions in GLSL
// https://github.com/stackgl/glsl-easings
float bounceOut(float t);
float bounceIn(float t);
float bounceInOut(float t);

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution; // normalize coords 0.0 <> 1.0
  st.x *= u_resolution.x/u_resolution.y;  // maintain 1:1 aspect ratio regardless of viewport size
  vec3 red = vec3(0.8,0.0,0.0);
  vec3 orange = vec3(0.8,0.5,0.2);
  vec3 redOrange = vec3(0.5,0.2,0.0);
  vec3 purple = vec3(0.5, 0.2, 1.0);
  vec3 yellow = vec3(0.8,0.8,0.0);
  
  // Circle exercises:
  // What about moving this circle? 
  // Can you move it and place different circles in a single billboard?
  // What happens if you combine distances fields together using different functions and operations?

  vec2 center1 = vec2(abs(sin(u_time*0.5)),bounceIn(abs(fract(u_time*0.125)*2.0-1.0)));
  vec3 circ1 = circleSmoothstep(st, center1, 0.4, 0.25)*orange;
  vec3 color = circ1;

  vec2 center2 = vec2(0.5*sin(u_time*0.5)+0.5,abs(cos(u_time)));
  vec3 circ2 = circleSmoothstep(st, center2, 0.1, 0.01)*purple;
  color += circ2;

  float dist1 = 1.0-distance(center1, center2);
  color += dist1*redOrange;

  float dist2 = 1.0-distance(st, center2);
  color += dist2*mix(purple,yellow,dist1)*0.3;

  float dist3 = 1.0-min(distance(st,center1), distance(st,center2));
  color += dist3*red*0.2;

  gl_FragColor = vec4(color, 1.0);
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