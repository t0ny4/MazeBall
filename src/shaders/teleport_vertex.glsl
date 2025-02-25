/* SPDX-License-Identifier: 0BSD */

export default `

varying vec2 v_Uv;

void main() {
    v_Uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

`;
