import * as React from 'react'
import { CubeCamera, RoundedBox } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'


export default function Teste3() {
    const config = {
        maxYaw: 0.1, // Max amount camera can yaw in either direction
        maxPitch: 0.1, // Max amount camera can pitch in either direction
        maxRoll: 0.1, // Max amount camera can roll in either direction
        yawFrequency: 1, // Frequency of the the yaw rotation
        pitchFrequency: 1, // Frequency of the pitch rotation
        rollFrequency: 1, // Frequency of the roll rotation
        intensity: 1, // initial intensity of the shake
        decay: false, // should the intensity decay over time
        decayRate: 0.65, // if decay = true this is the rate at which intensity will reduce at
        additive: false, // this should be used when your scene has orbit controls
      }

    return (
        <>
              <Canvas >
        <CubeCamera
  resolution={256} // Size of the off-buffer (256 by default)
  frames={Infinity} // How many frames it should render (Indefinitively by default)
  near={1}
  far={1000}
>
  {(texture) => (
    <mesh>
      <RoundedBox
  args={[1, 1, 1]} // Width, Height and Depth of the box
  radius={0.05} // Border-Radius of the box
  smoothness={4} // Optional, number of subdivisions
>
  <meshPhongMaterial attach="material" color="#f3f3f3" wireframe />
</RoundedBox>
      <meshStandardMaterial envMap={texture} />
    </mesh>
  )}
</CubeCamera>

</Canvas>


        </>
    )
}