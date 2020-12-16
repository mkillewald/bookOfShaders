#ifdef GL_ES
precision mediump float;
#endif

#define S(a, b, t) smoothstep(a, b, t)

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Choose a geometric logo to replicate using distance fields.

float band(float t, float start, float end, float blur) {
	float step1 = smoothstep(start-blur, start+blur, t);
	float step2 = smoothstep(end+blur,end-blur,t);
	return step1*step2;
}

float rect(vec2 uv, float left, float right, float bottom, float top, float blur) {
	float band1 = band(uv.x, left, right, blur);
	float band2 = band(uv.y, bottom, top, blur);
	return band1*band2;
}

void main(){
	vec2 uv = gl_FragCoord.xy/u_resolution; // normalize coords 0.0 <> 1.0
	uv -= 0.5; // place origin at center coords -0.5 <> 0.5
	uv.x *= u_resolution.x/u_resolution.y; // maintain 1:1 aspect ratio

	vec4 color = vec4(1.); // start with white background
	vec4 logoColor1 = vec4(vec3(33.,46.,139.)/255., .9);
	vec4 logoColor2 = vec4(vec3(47.,91.,191.)/255., 1.);
	
	
	// logo mask
	float d = length(uv);
	float r = 0.48;
	float blur = 0.002;
	float logoMask = S(r, r-blur, d);

	// ring
	vec2 rUv = vec2(uv.x, uv.y-.118);
	d = length(rUv);
	r = .323; // outer radius
	float r2 = r - .047; // inner radius
	float ring = S(r, r-blur, d) - S(r2, r2-blur, d);
	logoMask -= ring;

	// bar
	float bar = rect(uv, -.041, .041, -.48, -.17, blur);
	logoMask -= bar;

	vec4 logoColor = mix(logoColor2, logoColor1, length(rUv));
	color = mix(color, logoColor, logoMask);
	gl_FragColor = vec4(color);
}