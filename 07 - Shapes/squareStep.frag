#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    //Change the size and proportions of the rectangle.

    // bottom-left
    vec2 bl = vec2(0.05,0.4); // left (x), bottom (y) margin
    bl = step(bl,st); // create a sharp edge. Similar to x > than 0.05, y > 0.4
    float pct = bl.x * bl.y;  // muliplication is similar to logical and

    // top-right
    vec2 tr = vec2(0.6,0.05); // right (x), top (y) margin
    tr = step(tr,1.0-st); // create a sharp edge. Similar to x < than 0.6, y < 0.95
    pct *= tr.x * tr.y; // muliplication is similar to logical and

    color = vec3(pct); 

    gl_FragColor = vec4(color,1.0);
}