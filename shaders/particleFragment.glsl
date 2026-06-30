uniform vec3 uGlowColor;

varying float vAlpha;
varying vec3 vColor;

void main() {
  // Soft circular particle
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv);
  if (dist > 0.5) discard;

  float alpha = vAlpha * (1.0 - dist * 2.0);
  alpha = max(alpha, 0.0);

  vec3 col = mix(vColor, uGlowColor, 0.6);

  // Soften particle alpha to prevent visual clutter and keep text readable
  gl_FragColor = vec4(col, alpha * 0.4);
}
