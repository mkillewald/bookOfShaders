#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

// Experiment with the same code but using smoothstep() instead of step().
// Note that by changing values, you can go from blurred edges to elegant smooth borders.

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    float width = 0.07; // blur width

    // bottom-left
    vec2 bl = vec2(0.05,0.4); // left (x), bottom (y) margin
    bl = smoothstep(bl,bl+width,st); // create blurred edge on bottom and left
    float pct = bl.x * bl.y;

    // top-right
    vec2 tr = vec2(0.4,0.05); // right (x), top (y) margin
    tr = smoothstep(tr,tr+width,1.0-st); // create blurred edge on top and right
    pct *= tr.x * tr.y;
    
    color = vec3(pct);

    gl_FragColor = vec4(color,1.0);
}