attribute vec3 aOffset;
attribute float aRandom;
attribute float aScale;
attribute vec3 aColor;
attribute float aBlockIndex;

uniform float uTime;
uniform float uProgress;
uniform float uGlowIntensity;
uniform vec3 uExplosionCenter;

varying vec3 vColor;
varying float vAlpha;
varying vec3 vNormal;
varying vec3 vWorldPos;

void main() {
  vec3 pos = position * aScale + aOffset;

  // Dissolve / explosion based on progress
  float dissolveThreshold = aRandom;
  float dissolveProgress = smoothstep(dissolveThreshold - 0.15, dissolveThreshold + 0.15, uProgress);

  vec3 dir = normalize(aOffset - uExplosionCenter);
  float explodeDist = dissolveProgress * 8.0 * (0.5 + aRandom * 0.5);
  pos += dir * explodeDist;

  // Gentle idle float
  pos.y += sin(uTime * 0.4 + aRandom * 6.28) * 0.02 * (1.0 - dissolveProgress);

  vAlpha = 1.0 - dissolveProgress;
  vColor = aColor;
  vNormal = normalize(normalMatrix * normal);
  vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
