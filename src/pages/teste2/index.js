import * as THREE from 'three'
import React, { Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Reflector, Text, useTexture, useGLTF } from '@react-three/drei'
import Overlay from './Overlay'

function Carla(props) {
  const { scene } = useGLTF('/salinha3.glb')
  return <primitive object={scene} {...props} />
}

function Youcast(props) {
  const { scene } = useGLTF('/you.glb')
  return <primitive object={scene} {...props} />
}

function VideoText({ clicked, ...props }) {
  const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/videoplayback.mp4', crossOrigin: 'Anonymous', loop: true }))
  useEffect(() => void (clicked && video.play()), [video, clicked])
  return (
    <mesh >
      
      {/* 
      <Text font="/Inter-Bold.woff" fontSize={0.4} letterSpacing={-0.06} {...props} style={{color: '#F6F6F6'}} position={[0, 3.9, -4.78]}>
        Youcast
        
        <meshBasicMaterial toneMapped={false}>
          <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
        </meshBasicMaterial>
      </Text>
    
    */}
 
      <mesh scale={[10, 8.26, 0.26]} position={[0, 0.3, -5]}>
      <boxGeometry   />
      <meshBasicMaterial color="#161616" />

      </mesh>

      <mesh scale={[2.135, 1.168, 0.03]} position={[0.165, 1.43, -0.255]} rotation={[0, 2.529, 0]}>
      <boxGeometry   />
      <meshBasicMaterial toneMapped={false} color="white">
           <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
        </meshBasicMaterial>
      </mesh>

    </mesh>
  )
}


function Ground() {
  const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
  return (
    <Reflector resolution={512} args={[10, 10]} mirror={0.4} mixBlur={8} mixStrength={1} rotation={[-Math.PI / 2, 0, Math.PI / 2]} blur={[200, 100]}>
      {(Material, props) => <Material color="#a0a0a0" metalness={0.4} roughnessMap={floor} normalMap={normal} normalScale={[1, 1]} {...props} />}
    </Reflector>
  )
}

function Intro({ start, set }) {
  const [vec] = useState(() => new THREE.Vector3())
  useEffect(() => setTimeout(() => set(true), 500), [])
  return useFrame((state) => {
    if (start) {
      state.camera.position.lerp(vec.set(state.mouse.x * 10, 10 + state.mouse.y * 10, 10), 0.05)
      state.camera.lookAt(0, -1.7, -7)
    }
  })
}

export default function Teste2() {
  const [clicked, setClicked] = useState(false)
  const [ready, setReady] = useState(false)
  const store = { clicked, setClicked, ready, setReady }
  return (
    <>
      <Canvas concurrent gl={{ alpha: false }} pixelRatio={[1, 1.5]} camera={{ position: [0, 3, 100], fov: 15 }} style={{ width: '100%', height: '100vh'}}>
        <color attach="background" args={['black']} />
        <fog attach="fog" args={['black', 15, 20]} />
        <Suspense fallback={true} >
          <group position={[0, 0.5, 0]} rotation={[-0.55, 0, 0]}>

            {/*<Youcast rotation={[0, 4.7, 0]} position={[0, 0.4, -4.95]} scale={[0.55, 0.55, 0.55]} />*/}
            <Carla rotation={[0, 4.1, 0]} position={[-1.4, 0, 2]} scale={[1.5, 1.5, 1.5]} />
            <VideoText {...store}  />
            <Ground />
          </group>
          <ambientLight intensity={0.5} />
          <spotLight position={[0, 0, 0]} intensity={0.3} />
          <directionalLight position={[-20, 0, -20]} intensity={0.7} />
          <Intro start={ready && clicked} set={setReady} />
        </Suspense>
      </Canvas>
      <Overlay {...store} />
    </>
  )
}
