#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

// Do another implementation that uses floor().

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // bottom-left
    vec2 bl = vec2(floor(st.x*4.0), floor(st.y*2.0));
    float pct = bl.x * bl.y;  // muliplication is similar to logical and

    // top-right
    vec2 tr =  vec2(floor((1.0-st.x)*20.0), floor((1.0-st.y)*4.0));
    pct *= tr.x * tr.y; // muliplication is similar to logical and
    
    color = vec3(pct); 

    gl_FragColor = vec4(color,1.0);
}