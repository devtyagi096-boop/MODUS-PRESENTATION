attribute float aSize;
attribute float aLife;
attribute vec3 aVelocity;
attribute float aRandom;

uniform float uTime;
uniform float uProgress;

varying float vAlpha;
varying vec3 vColor;

void main() {
  // Animate particle position
  float t = mod(uTime * 0.3 + aLife * 6.28, 6.28);
  vec3 pos = position + aVelocity * t * (0.5 + uProgress * 1.5);

  // Fade in/out
  float life = mod(aLife + uTime * 0.08, 1.0);
  vAlpha = sin(life * 3.14159) * (0.3 + uProgress * 0.5);

  // Color shift with progress
  vColor = mix(vec3(0.2, 0.5, 1.0), vec3(0.5, 0.3, 1.0), aRandom + uProgress * 0.3);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aSize * (300.0 / -mvPosition.z) * (0.5 + uProgress * 0.5);
  gl_Position = projectionMatrix * mvPosition;
}
