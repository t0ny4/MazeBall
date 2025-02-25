/* SPDX-License-Identifier: 0BSD */

export default `

uniform float u_ticks;
uniform float u_opacity;
uniform vec3 u_rgb;
varying vec2 v_Uv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec3 color = vec3(0.01);
    for (float i = 0.0; i < 10.0; i++) {
        float t = u_ticks * 0.1 + i;
        vec2 blobPos = vec2(random(vec2(i, t)) * 2.0 - 1.0, random(vec2(i + 1.0, t)) * 2.0 - 1.0);
        float d = length(v_Uv - blobPos);
        float intensity = clamp(0.01 / (d * d), 0.0, 0.3);
        color += vec3(intensity * u_rgb.r, intensity * u_rgb.g, intensity * u_rgb.b);
    }
    gl_FragColor = vec4(color, u_opacity);
}

`;
