import { ThreeElements } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: ThreeElements['group'];
      mesh: ThreeElements['mesh'];
      boxGeometry: ThreeElements['boxGeometry'];
      planeGeometry: ThreeElements['planeGeometry'];
      capsuleGeometry: ThreeElements['capsuleGeometry'];
      circleGeometry: ThreeElements['circleGeometry'];
      meshStandardMaterial: ThreeElements['meshStandardMaterial'];
      ambientLight: ThreeElements['ambientLight'];
      directionalLight: ThreeElements['directionalLight'];
    }
  }
}
