// De bewegende 3D-scène: een flenssteun die zichzelf tekent in de hero en
// daarna, op het ritme van het scrollen, van schets naar productiestuk gaat.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';

const COPPER = new THREE.Color('#c98a55');
const PENCIL = new THREE.Color('#e9e4dc');
const INK = new THREE.Color('#1a1714');

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;

// ---------- geometrie ----------
function roundedRect(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  return s;
}
function hole(cx, cy, r) { const p = new THREE.Path(); p.absarc(cx, cy, r, 0, Math.PI * 2, true); return p; }

function extrudeFlat(shape, depth) {
  const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2, curveSegments: 40 });
  g.rotateX(-Math.PI / 2); // van XY-vlak naar XZ-vlak, dikte langs +Y
  return g;
}

function buildParts() {
  const parts = [];

  // 1. Grondplaat met vier bevestigingsgaten en een centrale doorvoer
  const plate = roundedRect(4.2, 2.8, 0.35);
  [[-1.65, -1.0], [1.65, -1.0], [-1.65, 1.0], [1.65, 1.0]].forEach(([x, y]) => plate.holes.push(hole(x, y, 0.17)));
  plate.holes.push(hole(0, 0, 0.5));
  parts.push({ geo: extrudeFlat(plate, 0.28), pos: [0, 0, 0], explode: [0, -1.1, 0], mat: 'steel' });

  // 2. Buis met kraag, gedraaid profiel
  const prof = [
    [0.5, 0.28], [0.78, 0.28], [0.78, 0.42], [0.62, 0.5], [0.62, 2.05], [0.5, 2.05]
  ].map(([x, y]) => new THREE.Vector2(x, y));
  prof.push(prof[0].clone());
  parts.push({ geo: new THREE.LatheGeometry(prof, 64), pos: [0, 0, 0], explode: [0, 0.15, 0], mat: 'steel' });

  // 3. Twee schoren
  const tri = new THREE.Shape();
  tri.moveTo(0, 0); tri.lineTo(1.2, 0); tri.lineTo(0, 1.35); tri.lineTo(0, 0);
  const gusset = () => {
    const g = new THREE.ExtrudeGeometry(tri, { depth: 0.14, bevelEnabled: false });
    g.translate(0, 0, -0.07);
    return g;
  };
  const gR = gusset(); gR.translate(0.6, 0.28, 0);
  const gL = gusset(); gL.rotateY(Math.PI); gL.translate(-0.6, 0.28, 0);
  parts.push({ geo: gR, pos: [0, 0, 0], explode: [1.1, 0.2, 0], mat: 'steel' });
  parts.push({ geo: gL, pos: [0, 0, 0], explode: [-1.1, 0.2, 0], mat: 'steel' });

  // 4. Bovenflens in RVS met zes boutgaten
  const ring = new THREE.Shape(); ring.absarc(0, 0, 1.05, 0, Math.PI * 2, false);
  ring.holes.push(hole(0, 0, 0.5));
  for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; ring.holes.push(hole(Math.cos(a) * 0.83, Math.sin(a) * 0.83, 0.08)); }
  const cap = extrudeFlat(ring, 0.16); cap.translate(0, 2.05, 0);
  parts.push({ geo: cap, pos: [0, 0, 0], explode: [0, 1.5, 0], mat: 'copper' });

  // 5. Bouten in de hoeken
  [[-1.65, 1.0], [1.65, 1.0], [-1.65, -1.0], [1.65, -1.0]].forEach(([x, z]) => {
    const head = new THREE.CylinderGeometry(0.27, 0.27, 0.16, 6); head.translate(0, 0.36, 0);
    const shank = new THREE.CylinderGeometry(0.15, 0.15, 0.7, 20); shank.translate(0, -0.05, 0);
    const bolt = mergeSimple([head, shank]);
    bolt.translate(x, 0, -z);
    parts.push({ geo: bolt, pos: [0, 0, 0], explode: [x * 0.3, 2.9, -z * 0.3], mat: 'dark' });
  });
  return parts;
}

// Minimale merge zonder BufferGeometryUtils-afhankelijkheid in de edges-berekening
function mergeSimple(geos) {
  const pos = []; const nor = []; const idx = []; let off = 0;
  geos.forEach((g) => {
    const gi = g.index ? g : g;
    const p = gi.attributes.position.array, n = gi.attributes.normal.array;
    pos.push(...p); nor.push(...n);
    if (gi.index) gi.index.array.forEach((i) => idx.push(i + off));
    else for (let i = 0; i < p.length / 3; i++) idx.push(i + off);
    off += p.length / 3;
  });
  const m = new THREE.BufferGeometry();
  m.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  m.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  m.setIndex(idx);
  return m;
}

// ---------- scène ----------
export function createScene(canvas, { reducedMotion = false } = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) {
    canvas.remove();
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(7.2, 5.4, 8.4);
  const target = new THREE.Vector3(0, 0.75, 0);
  camera.lookAt(target);

  const key = new THREE.DirectionalLight('#fff4e8', 1.6); key.position.set(4, 8, 5); scene.add(key);
  const rim = new THREE.DirectionalLight('#c98a55', 1.2); rim.position.set(-6, 3, -4); scene.add(rim);

  const root = new THREE.Group(); scene.add(root);
  const assembly = new THREE.Group(); root.add(assembly);

  const mats = {
    steel: new THREE.MeshStandardMaterial({ color: '#8c9096', metalness: 0.9, roughness: 0.38, transparent: true }),
    copper: new THREE.MeshStandardMaterial({ color: '#c07a45', metalness: 1, roughness: 0.28, transparent: true }),
    dark: new THREE.MeshStandardMaterial({ color: '#2b2b2e', metalness: 0.8, roughness: 0.45, transparent: true })
  };
  const lineMat = new LineMaterial({ color: COPPER, linewidth: 1.4, transparent: true, depthWrite: false, worldUnits: false });
  lineMat.polygonOffset = true;

  const items = buildParts().map((p) => {
    p.geo.computeVertexNormals();
    const g = new THREE.Group();
    const mesh = new THREE.Mesh(p.geo, mats[p.mat]);
    mesh.material.polygonOffset = true; mesh.material.polygonOffsetFactor = 1; mesh.material.polygonOffsetUnits = 1;
    const lg = new LineSegmentsGeometry().fromEdgesGeometry(new THREE.EdgesGeometry(p.geo, 24));
    const lines = new LineSegments2(lg, lineMat);
    const total = lg.attributes.instanceStart.count;
    g.add(mesh); g.add(lines);
    assembly.add(g);
    return { g, mesh, lines, lg, total, explode: new THREE.Vector3(...p.explode) };
  });

  // Maatlijnen (technische fase)
  const dimMat = new LineMaterial({ color: PENCIL, linewidth: 1, transparent: true, opacity: 0, depthWrite: false });
  const dimSegs = [];
  const seg = (a, b) => dimSegs.push(...a, ...b);
  const zF = 1.75, t = 0.12;
  seg([-2.1, 0, zF], [-2.1, 0, zF + 0.5]); seg([2.1, 0, zF], [2.1, 0, zF + 0.5]);
  seg([-2.1, 0, zF + 0.4], [2.1, 0, zF + 0.4]);
  seg([-2.1, 0, zF + 0.4], [-2.1 + t, 0, zF + 0.4 - t * 0.5]); seg([-2.1, 0, zF + 0.4], [-2.1 + t, 0, zF + 0.4 + t * 0.5]);
  seg([2.1, 0, zF + 0.4], [2.1 - t, 0, zF + 0.4 - t * 0.5]); seg([2.1, 0, zF + 0.4], [2.1 - t, 0, zF + 0.4 + t * 0.5]);
  const xH = 2.6;
  seg([1.1, 0, 0], [xH + 0.2, 0, 0]); seg([1.1, 2.21, 0], [xH + 0.2, 2.21, 0]);
  seg([xH, 0, 0], [xH, 2.21, 0]);
  seg([xH, 0, 0], [xH - t * 0.5, t, 0]); seg([xH, 0, 0], [xH + t * 0.5, t, 0]);
  seg([xH, 2.21, 0], [xH - t * 0.5, 2.21 - t, 0]); seg([xH, 2.21, 0], [xH + t * 0.5, 2.21 - t, 0]);
  // hartlijn in streepjes
  for (let y = -0.6; y < 3.0; y += 0.3) seg([0, y, 0], [0, y + 0.16, 0]);
  const dimGeo = new LineSegmentsGeometry(); dimGeo.setPositions(dimSegs);
  const dims = new LineSegments2(dimGeo, dimMat); root.add(dims);

  // Raster onder het stuk
  const grid = new THREE.GridHelper(14, 28, '#6b5a4a', '#3a332d');
  grid.position.y = -0.02; grid.material.transparent = true; grid.material.opacity = 0; root.add(grid);

  // ---------- toestand ----------
  const state = { draw: reducedMotion ? 1 : 0, process: -1, pointerX: 0, pointerY: 0, visible: true };
  let viewW = 1, viewH = 1, layout = 'desktop';
  const t0 = performance.now();
  let raf = 0; let running = false; let rotY = 0.6; let lastT = t0;

  function resize() {
    viewW = window.innerWidth; viewH = window.innerHeight;
    layout = viewW < 900 ? 'mobile' : 'desktop';
    renderer.setSize(viewW, viewH, false);
    camera.aspect = viewW / viewH;
    // Het stuk naar rechts schuiven op desktop, naar boven op mobiel
    if (layout === 'desktop') camera.setViewOffset(viewW, viewH, -viewW * 0.2, 0, viewW, viewH);
    else camera.setViewOffset(viewW, viewH, 0, viewH * 0.25, viewW, viewH);
    camera.fov = layout === 'desktop' ? 32 : 40;
    camera.updateProjectionMatrix();
    lineMat.resolution.set(viewW, viewH); dimMat.resolution.set(viewW, viewH);
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - lastT) / 1000); lastT = now;
    const el = (now - t0) / 1000;
    if (!reducedMotion) state.draw = clamp((el - 0.35) / 2.6);
    const drawE = 1 - Math.pow(1 - state.draw, 3);
    const p = state.process; // -1 = hero, 0..4 = werkwijze

    // parameters per fase
    const inProc = smooth(-0.6, 0, p);
    const solid = lerp(0.14 * drawE, 0, smooth(-0.6, -0.1, p)) + smooth(1.9, 2.6, p);
    const dimO = smooth(0.9, 1.4, p) * (1 - smooth(2.5, 3.0, p));
    const explode = smooth(3.05, 3.85, p);
    const engineering = smooth(1.9, 2.6, p);

    // Lijnen: koper in de hero, potlood in concept/technisch, donker op het massieve stuk
    const c = COPPER.clone().lerp(PENCIL, inProc).lerp(INK, engineering * 0.85);
    lineMat.color.copy(c);
    lineMat.opacity = lerp(1, 0.55, engineering);
    lineMat.linewidth = lerp(1.4, 1.0, engineering);
    dimMat.opacity = dimO;
    grid.material.opacity = 0.5 * inProc;
    grid.position.y = lerp(-0.02, -1.2, explode);

    items.forEach((it) => {
      it.lines.geometry.instanceCount = Math.max(0, Math.floor(it.total * drawE));
      it.mesh.material.opacity = clamp(solid);
      it.mesh.visible = solid > 0.01;
      it.g.position.copy(it.explode).multiplyScalar(explode);
    });

    // rotatie: traag in de hero, gekoppeld aan scroll in de werkwijze
    if (!reducedMotion) rotY += dt * lerp(0.18, 0.06, inProc);
    const scrollRot = Math.max(0, p) * 0.35;
    root.rotation.y = rotY + scrollRot + state.pointerX * 0.18;
    root.rotation.x = state.pointerY * 0.06;
    const s = layout === 'mobile' ? lerp(0.62, 0.74, inProc) : 1;
    root.scale.setScalar(s * lerp(1, 0.92, explode));
    root.position.y = lerp(0, -0.35, explode);

    renderer.render(scene, camera);
    if (running) raf = requestAnimationFrame(frame);
  }

  function start() { if (running) return; running = true; lastT = performance.now(); raf = requestAnimationFrame(frame); }
  function stop() { running = false; cancelAnimationFrame(raf); }

  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : state.visible && start()));
  start();

  return {
    setProcess(v) { state.process = v; },
    setPointer(x, y) { state.pointerX = x; state.pointerY = y; },
    setVisible(v) { state.visible = v; v ? start() : stop(); },
    renderOnce() { frame(performance.now()); }
  };
}
