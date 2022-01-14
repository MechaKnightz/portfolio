import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import React, { FC, useRef, useState } from "react";
import { HexRenderer } from "../components/HexRenderer";
import { generateData } from "../mockData";

export const Renderer = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <OrbitControls />
      <PerspectiveCamera far={100} />
      <HexRenderer hex={generateData(3)} />
    </Canvas>
  );
};

const Box: FC<MeshProps> = (props) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<JSX.IntrinsicElements["mesh"]>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};
