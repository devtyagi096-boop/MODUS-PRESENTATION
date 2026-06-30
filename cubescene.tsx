import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import cubeVertexShader from './shaders/cubeVertex.glsl';
import cubeFragmentShader from './shaders/cubeFragment.glsl';
import particleVertexShader from './shaders/particleVertex.glsl';
import particleFragmentShader from './shaders/particleFragment.glsl';

interface CubeSceneProps {
  progressRef: React.MutableRefObject<number>;
}

export default function CubeScene({ progressRef }: CubeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    cubeMesh: THREE.Mesh;
    particles: THREE.Points;
    uniforms: Record<string, THREE.IUniform>;
    particleUniforms: Record<string, THREE.IUniform>;
    pointLight1: THREE.PointLight;
    pointLight2: THREE.PointLight;
    gridHelper: THREE.GridHelper;
    clock: THREE.Clock;
    animationId: number;
  } | null>(null);

  const initScene = useCallback(() => {
    if (!containerRef.current || sceneRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene — transparent background so CSS controls the bg
    const scene = new THREE.Scene();
    // no scene.background — let canvas alpha show through

    // Camera — shifted right so cube sits in the right 40% of screen
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(5, 3.5, 9);
    camera.lookAt(0, 0, 0);

    // Renderer — alpha:true so canvas is transparent
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // fully transparent clear
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // ========== CUBE BLOCKS — smaller grid ==========
    const gridSize = 8;
    const blockSize = 0.18;
    const gap = 0.03;
    const step = blockSize + gap;
    const totalSize = gridSize * step;
    const halfSize = totalSize / 2;

    const blockCount = gridSize * gridSize * gridSize;
    const offsets = new Float32Array(blockCount * 3);
    const randoms = new Float32Array(blockCount);
    const scales = new Float32Array(blockCount);
    const colors = new Float32Array(blockCount * 3);
    const blockIndices = new Float32Array(blockCount);

    let idx = 0;
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          const px = x * step - halfSize + step / 2;
          const py = y * step - halfSize + step / 2;
          const pz = z * step - halfSize + step / 2;

          offsets[idx * 3] = px;
          offsets[idx * 3 + 1] = py;
          offsets[idx * 3 + 2] = pz;

          randoms[idx] = ((Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453) % 1 + 1) % 1;
          scales[idx] = blockSize;

          const baseIntensity = 0.15 + randoms[idx] * 0.05;
          colors[idx * 3] = baseIntensity;
          colors[idx * 3 + 1] = baseIntensity * 1.1;
          colors[idx * 3 + 2] = baseIntensity * 1.3;

          blockIndices[idx] = idx;
          idx++;
        }
      }
    }

    // Instanced geometry
    const blockGeometry = new THREE.BoxGeometry(1, 1, 1);
    const instancedGeometry = new THREE.InstancedBufferGeometry();
    instancedGeometry.index = blockGeometry.index;
    instancedGeometry.attributes.position = blockGeometry.attributes.position;
    instancedGeometry.attributes.normal = blockGeometry.attributes.normal;
    instancedGeometry.attributes.uv = blockGeometry.attributes.uv;

    instancedGeometry.setAttribute('aOffset', new THREE.InstancedBufferAttribute(offsets, 3));
    instancedGeometry.setAttribute('aRandom', new THREE.InstancedBufferAttribute(randoms, 1));
    instancedGeometry.setAttribute('aScale', new THREE.InstancedBufferAttribute(scales, 1));
    instancedGeometry.setAttribute('aColor', new THREE.InstancedBufferAttribute(colors, 3));
    instancedGeometry.setAttribute('aBlockIndex', new THREE.InstancedBufferAttribute(blockIndices, 1));
    instancedGeometry.instanceCount = blockCount;

    const uniforms = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uDissolveDirection: { value: 1.0 },
      uExplosionCenter: { value: new THREE.Vector3(-0.2, -0.1, -0.05) },
      uGlowColor: { value: new THREE.Color(0.6, 0.65, 0.7) }, // Sophisticated steel glow
      uGlowIntensity: { value: 1.0 },
    };

    const cubeMaterial = new THREE.ShaderMaterial({
      vertexShader: cubeVertexShader,
      fragmentShader: cubeFragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      side: THREE.FrontSide,
      blending: THREE.NormalBlending,
    });

    const cubeMesh = new THREE.Mesh(instancedGeometry, cubeMaterial);
    scene.add(cubeMesh);

    // ========== PARTICLES — fewer, smaller ==========
    const particleCount = 1500;
    const pPositions = new Float32Array(particleCount * 3);
    const pSizes = new Float32Array(particleCount);
    const pLives = new Float32Array(particleCount);
    const pVelocities = new Float32Array(particleCount * 3);
    const pRandoms = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = halfSize * (0.4 + Math.random() * 0.8);

      pPositions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      pPositions[i * 3 + 1] = Math.cos(phi) * radius;
      pPositions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius;

      pSizes[i] = 0.8 + Math.random() * 2.5;
      pLives[i] = Math.random();

      const vDir = new THREE.Vector3(
        pPositions[i * 3],
        pPositions[i * 3 + 1],
        pPositions[i * 3 + 2]
      ).normalize();

      pVelocities[i * 3] = vDir.x * (0.2 + Math.random() * 0.5) + (Math.random() - 0.5) * 0.2;
      pVelocities[i * 3 + 1] = vDir.y * (0.2 + Math.random() * 0.5) + Math.random() * 0.15;
      pVelocities[i * 3 + 2] = vDir.z * (0.2 + Math.random() * 0.5) + (Math.random() - 0.5) * 0.2;

      pRandoms[i] = Math.random();
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    particleGeometry.setAttribute('aSize', new THREE.BufferAttribute(pSizes, 1));
    particleGeometry.setAttribute('aLife', new THREE.BufferAttribute(pLives, 1));
    particleGeometry.setAttribute('aVelocity', new THREE.BufferAttribute(pVelocities, 3));
    particleGeometry.setAttribute('aRandom', new THREE.BufferAttribute(pRandoms, 1));

    const particleUniforms = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uGlowColor: { value: new THREE.Color(0.8, 0.85, 0.9) }, // Silver particles
    };

    const particleMaterial = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: particleUniforms,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ========== LIGHTING — very dim ==========
    const ambientLight = new THREE.AmbientLight(0x0f172a, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x64748B, 0.6, 30);
    pointLight1.position.set(4, 4, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x334155, 0.25, 20);
    pointLight2.position.set(-3, -1, 3);
    scene.add(pointLight2);

    // ========== GROUND GRID — very faint ==========
    const gridHelper = new THREE.GridHelper(20, 40, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -halfSize - 0.3;
    const gridMat = gridHelper.material as THREE.LineBasicMaterial;
    gridMat.transparent = true;
    gridMat.opacity = 0.05;
    scene.add(gridHelper);

    const clock = new THREE.Clock();

    sceneRef.current = {
      scene,
      camera,
      renderer,
      cubeMesh,
      particles,
      uniforms,
      particleUniforms,
      pointLight1,
      pointLight2,
      gridHelper,
      clock,
      animationId: 0,
    };

    // ========== ANIMATION LOOP ==========
    const animate = () => {
      if (!sceneRef.current) return;

      const {
        renderer: r,
        scene: s,
        camera: c,
        uniforms: u,
        particleUniforms: pu,
        clock: clk,
        pointLight1: pl1,
        pointLight2: pl2,
        gridHelper: gh,
      } = sceneRef.current;

      const elapsed = clk.getElapsedTime();
      const currentProgress = progressRef.current;

      u.uTime.value = elapsed;
      u.uProgress.value = currentProgress;
      pu.uTime.value = elapsed;
      pu.uProgress.value = currentProgress;

      u.uGlowIntensity.value = 1.0 + Math.sin(elapsed * 1.5) * 0.05;

      // Camera: slow gentle orbit
      const baseAngle = elapsed * 0.04;
      const progressOffset = currentProgress * Math.PI * 0.25;
      const camRadius = 10.5 - currentProgress * 1.0;
      const camHeight = 2.8 + Math.sin(elapsed * 0.1) * 0.2 + currentProgress * 0.8;

      c.position.x = Math.cos(baseAngle + progressOffset) * camRadius;
      c.position.z = Math.sin(baseAngle + progressOffset) * camRadius;
      c.position.y = camHeight;

      c.lookAt(0, 0, 0);

      // Lights: gentle movement
      pl1.position.x = Math.sin(elapsed * 0.2) * 4 + 2;
      pl1.position.z = Math.cos(elapsed * 0.2) * 4;
      pl1.position.y = 3.5 + Math.sin(elapsed * 0.3) * 0.5;
      pl1.intensity = 0.5 + currentProgress * 0.3;

      pl2.position.x = Math.cos(elapsed * 0.15) * 3;
      pl2.position.y = Math.sin(elapsed * 0.2) * 1 - 0.5;
      pl2.intensity = 0.2 + currentProgress * 0.15;

      // Grid fades gently
      const gMat = gh.material as THREE.LineBasicMaterial;
      gMat.opacity = 0.05 + currentProgress * 0.03;

      r.render(s, c);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!sceneRef.current || !containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      sceneRef.current.camera.aspect = w / h;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.renderer.dispose();
        if (container.contains(sceneRef.current.renderer.domElement)) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }
        sceneRef.current = null;
      }
    };
  }, [progressRef]);

  useEffect(() => {
    const cleanup = initScene();
    return cleanup;
  }, [initScene]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
