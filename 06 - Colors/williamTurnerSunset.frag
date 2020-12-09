#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

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

float bounceInOut(float t) {
  return t < 0.5
    ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0))
    : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 colorA = vec3(75.0,99.0,177.0)/255.0;
    vec3 colorB = vec3(235.0,105.0,22.0)/255.0;

    float t = u_time*0.5;
    float pct = bounceInOut( abs(fract(st.y)*1.7) );

    gl_FragColor = vec4(vec3(mix(colorA, colorB, pct)),1.0);
}