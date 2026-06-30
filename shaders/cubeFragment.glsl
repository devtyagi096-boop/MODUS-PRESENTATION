uniform float uTime;
uniform float uProgress;
uniform vec3 uGlowColor;
uniform float uGlowIntensity;

varying vec3 vColor;
varying float vAlpha;
varying vec3 vNormal;
varying vec3 vWorldPos;

void main() {
  if (vAlpha < 0.01) discard;

  // Elegant dark glass look with rim lighting
  vec3 viewDir = normalize(cameraPosition - vWorldPos);
  float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
  rim = smoothstep(0.5, 1.0, rim);

  // Soft directional light
  vec3 lightDir = normalize(vec3(1.0, 2.0, 1.5));
  float diff = max(dot(vNormal, lightDir), 0.0) * 0.8 + 0.2;

  // Keep base color very dark and subtle to not overpower text
  vec3 baseColor = vColor * 0.15 * diff;
  
  // Glowing rim
  vec3 rimColor = uGlowColor * rim * 0.7;

  // Edge glow based on progress
  float glowStrength = uProgress * uGlowIntensity * 0.4;
  vec3 glowContrib = uGlowColor * glowStrength;

  vec3 finalColor = baseColor + rimColor + glowContrib;

  // Soft pulse
  float pulse = sin(uTime * 1.5) * 0.03 + 1.0;
  finalColor *= pulse;

  // Lower overall opacity so words are clearly visible through it
  gl_FragColor = vec4(finalColor, vAlpha * 0.65);
}
