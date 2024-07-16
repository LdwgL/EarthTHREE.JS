import * as THREE from "three";

export default function getStarfield({ numStars = 500 } = {}) {
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

  const starVertices = [];
  for (let i = 0; i < 5000; i++) {
    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);
    starVertices.push(x, y, z);
  }

  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
  );

  return new THREE.Points(starGeometry, starMaterial);
}
