#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float rect(vec2 st, vec4 dimen);

// How do you think you can move and place different rectangles in the same billboard? 
// If you figure out how, show off your skills by making a composition of rectangles and 
// colors that resembles a Piet Mondrian painting.

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    // normalize colors
    vec3 darkred = vec3(151.0,17.0,27.0)/255.0;
    vec3 darkylw = vec3(250.0,184.0,38.0)/255.0;
    vec3 medblue = vec3(9.0,74.0,135.0)/255.0;
    vec3 offwht = vec3(246.0,238.0,215.0)/255.0;

    // setup the dimensions of each rectangle
    // bottom left x, bottom left y, width, height
    vec4 w1 = vec4(0.0,0.0,0.211,0.623);
    vec4 w2 = vec4(w1.p+0.028,0.0,0.494,0.071);
    vec4 w3 = vec4(w2.x,w2.q+0.023,w2.p,w1.q-w2.q-0.023);
    vec4 r1 = vec4(0.0,w1.q+0.028,0.065,0.163);
    vec4 r2 = vec4(r1.p+0.028,r1.y,0.12,r1.q);
    vec4 r3 = vec4(0.0,r1.y+r1.q+0.028,r1.p,0.158);
    vec4 r4 = vec4(r2.x,r3.y,r2.p,r3.q);
    vec4 w4 = vec4(w3.x,r1.y,w3.p,r2.q);
    vec4 w5 = vec4(w4.x,r3.y,w4.p,r3.q);
    vec4 b1 = vec4(w2.x+w2.p+0.028,0.0,0.186,w2.q);
    vec4 b2 = vec4(b1.x+b1.p+0.023,0.0,0.03,b1.q);
    vec4 w6 = vec4(b1.x,w3.y,b1.p,w3.q);
    vec4 w7 = vec4(b2.x,w6.y,b2.p,w6.q);
    vec4 w8 = vec4(w6.x,w4.y,w6.p,w4.q);
    vec4 w9 = vec4(w8.x,w5.y,w8.p,w5.q);
    vec4 y1 = vec4(w7.x,w8.y,w7.p,w8.q);
    vec4 y2 = vec4(y1.x,w9.y,y1.p,w9.q);

    // make and color each rectangle
    vec3 w1r = rect(st,w1)*offwht;
    vec3 w2r = rect(st,w2)*offwht;
    vec3 w3r = rect(st,w3)*offwht;
    vec3 w4r = rect(st,w4)*offwht;
    vec3 w5r = rect(st,w5)*offwht;
    vec3 w6r = rect(st,w6)*offwht;
    vec3 w7r = rect(st,w7)*offwht;
    vec3 w8r = rect(st,w8)*offwht;
    vec3 w9r = rect(st,w9)*offwht;
    vec3 r1r = rect(st,r1)*darkred;
    vec3 r2r = rect(st,r2)*darkred;
    vec3 r3r = rect(st,r3)*darkred;
    vec3 r4r = rect(st,r4)*darkred;
    vec3 b1r = rect(st,b1)*medblue;
    vec3 b2r = rect(st,b2)*medblue;
    vec3 y1r = rect(st,y1)*darkylw;
    vec3 y2r = rect(st,y2)*darkylw;
    
    // put it all together
    vec3 color = w1r+w2r+w3r+w4r+w5r+w6r+w7r+w8r+w9r+r1r+r2r+r3r+r4r+b1r+b2r+y1r+y2r;

    gl_FragColor = vec4(color,1.0);
}

float rect(vec2 st, vec4 dimen) {
    //dimen ==> bottom left x, bottom left y, width, height
    vec2 bl = step(dimen.xy,st);
    vec2 tr = 1.0-step(dimen.xy+dimen.pq,st); 
    float pct = bl.x * bl.y * tr.x * tr.y;
    return pct;
}