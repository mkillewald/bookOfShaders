#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float rect(vec2 st, vec4 dimen);
float rectBorder(vec2 st, vec4 dimen, float bWidth);

// Choose the implementation you like the most and make a function of it that you can reuse in the future.
// Make your function flexible and efficient.

// Make another function that just draws the outline of a rectangle.

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec3 pct1 = rect(st,vec4(0.05,0.4,0.55,0.55))*vec3(0.9, 0.5, 0.2); // orange
    vec3 pct2 = rect(st,vec4(0.5,0.2,0.47,0.6))*vec3(0.2, 1.0, 0.5);  // light green
    vec3 pct3 = rect(st,vec4(0.4,0.1,0.52,0.49))*vec3(0.5, 0.2, 1.0);  // purple
    
    vec3 pct4 = rectBorder(st,vec4(0.1,0.07,0.8,0.8),0.05)*vec3(0.2,0.5,0.8); // blue

    vec3 color = pct1+pct2+pct3+pct4;

    gl_FragColor = vec4(color,1.0);
}

float rect(vec2 st, vec4 dimen) {
    //dimen ==> (bottom left x, bottom left y, width, height)
    vec2 bl = step(dimen.xy,st);
    vec2 tr = 1.0-step(dimen.xy+dimen.pq,st); 
    float pct = bl.x * bl.y * tr.x * tr.y;
    return pct;
}

float rectBorder(vec2 st, vec4 dimen, float bWidth) {
    //dimen ==> (bottom left x, bottom left y, width, height)
    //bWidth ==> border width
    vec2 bl = step(dimen.xy,st);
    vec2 tr = 1.0-step(dimen.xy+dimen.pq,st);
    float pct = bl.x * bl.y * tr.x * tr.y;

    vec2 bli = step(dimen.xy+bWidth,st);
    vec2 tri = 1.0-step(dimen.xy+dimen.pq-bWidth,st) ;
    float pcti = bli.x * bli.y * tri.x * tri.y;
    return pct - pcti;
}