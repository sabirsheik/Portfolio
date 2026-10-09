import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SystemScene() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); } catch { return; }
    const style = getComputedStyle(element);
    const tokenColor = (name: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const context = canvas.getContext('2d');
      if (!context) return new THREE.Color();
      context.fillStyle = style.getPropertyValue(name).trim();
      context.fillRect(0, 0, 1, 1);
      const pixel = context.getImageData(0, 0, 1, 1).data;
      return new THREE.Color((pixel[0] ?? 0) / 255, (pixel[1] ?? 0) / 255, (pixel[2] ?? 0) / 255).convertSRGBToLinear();
    };
    const lime = tokenColor('--scene-accent');
    const metal = tokenColor('--scene-metal');
    const edge = tokenColor('--scene-edge');
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
    camera.position.set(8, 7.5, 11);
    camera.lookAt(0, 0, 0);
    scene.add(new THREE.AmbientLight(edge, 3));
    const light = new THREE.DirectionalLight(edge, 10); light.position.set(4, 8, 5); scene.add(light);
    const group = new THREE.Group(); scene.add(group);
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    for (let i = 0; i < 3; i++) {
      const geo = new THREE.BoxGeometry(3.2, .25, 3.2); geometries.push(geo);
      const mat = new THREE.MeshStandardMaterial({ color: metal, metalness: .75, roughness: .4 }); materials.push(mat);
      const chip = new THREE.Mesh(geo, mat); chip.position.y = (i - 1) * 1.55; group.add(chip);
      const edges = new THREE.EdgesGeometry(geo); geometries.push(edges);
      const lineMat = new THREE.LineBasicMaterial({ color: i === 1 ? lime : edge, transparent: true, opacity: .8 }); materials.push(lineMat);
      const lines = new THREE.LineSegments(edges, lineMat); lines.position.copy(chip.position); group.add(lines);
      for (let j = 0; j < 12; j++) {
        const pinGeo = new THREE.BoxGeometry(.08, .06, .3); geometries.push(pinGeo);
        const pinMat = new THREE.MeshStandardMaterial({ color: i === 1 ? lime : edge, emissive: i === 1 ? lime : metal, emissiveIntensity: .3 }); materials.push(pinMat);
        for (const side of [-1, 1]) { const pin = new THREE.Mesh(pinGeo, pinMat); pin.position.set(-1.35 + j * .245, chip.position.y, side * 1.7); group.add(pin); }
      }
      const coreGeo = new THREE.BoxGeometry(1.5, .13, 1.5); geometries.push(coreGeo);
      const coreMat = new THREE.MeshStandardMaterial({ color: i === 1 ? lime : metal, emissive: i === 1 ? lime : metal, emissiveIntensity: .18, roughness: .25, metalness: .6 }); materials.push(coreMat);
      const core = new THREE.Mesh(coreGeo, coreMat); core.position.y = chip.position.y + .18; group.add(core);
    }
    const grid = new THREE.GridHelper(16, 22, edge, edge); grid.position.y = -2.2;
    const gridMat = grid.material as THREE.Material; gridMat.transparent = true; gridMat.opacity = .12; materials.push(gridMat); geometries.push(grid.geometry); scene.add(grid);
    const positions = [-2.8, 2.8];
    positions.forEach(x => positions.forEach(z => {
      const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x,-1.6,z),new THREE.Vector3(x,1.6,z)]); geometries.push(geometry);
      const material = new THREE.LineDashedMaterial({ color: lime, dashSize: .08, gapSize: .12, transparent: true, opacity: .5 }); materials.push(material);
      const line = new THREE.Line(geometry, material); line.computeLineDistances(); group.add(line);
    }));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let targetX = 0, targetY = 0, frame = 0;
    const move = (event: PointerEvent) => { targetX = (event.clientX / window.innerWidth - .5) * .25; targetY = (event.clientY / window.innerHeight - .5) * .15; };
    window.addEventListener('pointermove', move);
    const resize = () => { const w = element.clientWidth, h = element.clientHeight; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); };
    const observer = new ResizeObserver(resize); observer.observe(element); resize();
    const draw = (time: number) => { group.rotation.y += (targetX - group.rotation.y) * .025; group.rotation.x += (targetY - group.rotation.x) * .025; if (!reduced) group.position.y = Math.sin(time * .0005) * .13; renderer.render(scene, camera); frame = requestAnimationFrame(draw); };
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('pointermove', move); geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); renderer.dispose(); renderer.domElement.remove(); };
  }, []);
  return <div className="system-scene" ref={host} role="img" aria-label="Interactive three-dimensional software architecture with three interconnected processing layers" />;
}
