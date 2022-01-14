import { useMemo } from "react";
import { Hex, HEX_RADIUS } from "../types/Hex";

const hexCorners: (
  center: [number, number, number],
  size: number,
  i: number
) => number[] = (center: [number, number, number], size: number, i: number) => {
  var angle_deg = 60 * i - 30;
  var angle_rad = (Math.PI / 180) * angle_deg;
  return [
    center[0] + size * 0.95 * Math.cos(angle_rad),
    0,
    center[2] + size * 0.95 * Math.sin(angle_rad),
  ];
};

const hexPosTopixel: (
  hex: Hex,
  hexRadius: number
) => [number, number, number] = (hex: Hex, hexRadius: number) => {
  const width = Math.sqrt(3) * hexRadius;
  const height = 2 * hexRadius;

  return [
    hex.q * width + (hex.r / 2) * hexRadius * width,
    hex.y,
    hex.r * height * (3 / 4),
  ];
};

export const HexRenderer: React.FC<{ hex: Hex[] }> = ({ hex }) => {
  let positions = useMemo(() => {
    const positions = [];

    for (let i = 0; i < hex.length; i++) {
      const hexPos = hexPosTopixel(hex[i], HEX_RADIUS);
      for (let j = 0; j < 6; j++) {
        positions.push(...hexCorners(hexPos, HEX_RADIUS, j));
      }
      positions.push(...(hexPos as number[]));
    }

    return new Float32Array(positions);
  }, [hex]);

  let indices = useMemo(() => {
    const indices = [];

    for (let i = 0; i < hex.length; i++) {
      for (let j = 0; j < 6; j++) {
        indices.push(i * 7 + 6);
        indices.push(i * 7 + (j === 5 ? 0 : j + 1));
        indices.push(i * 7 + j);
      }
    }
    return new Uint32Array(indices);
  }, [hex]);

  console.log(positions);
  console.log(indices);

  return (
    <mesh>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          array={indices}
          attach="index"
          count={indices.length}
          itemSize={1}
        />
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
};
