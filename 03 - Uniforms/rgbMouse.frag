#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    // Can you figure out how to use u_mouse knowing that the values are in pixels and NOT normalized values?
    // Can you use it to move colors around?

    // Can you imagine an interesting way of changing this color pattern using u_time and u_mouse coordinates?

    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 sm = u_mouse.xy/u_resolution;
    
	gl_FragColor = vec4(0.5*(st.x+sm.x),0.5*(st.y+sm.y),sin(u_time/0.5),1.0);
}

