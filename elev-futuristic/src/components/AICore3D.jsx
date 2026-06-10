import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
function ParticleGalaxy() {
  const groupRef = useRef();

  const particles = useMemo(() => {
    const temp = [];

    for (let i = 0; i < 200; i++) {
      temp.push([
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ]);
    }

    return temp;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((pos, index) => (
        <mesh key={index} position={pos}>
          <sphereGeometry args={[0.03, 8, 8]} />

          <meshStandardMaterial
            color="#60A5FA"
            emissive="#60A5FA"
            emissiveIntensity={3}
          />
        </mesh>
      ))}
    </group>
  );
}
function OrbitNode({ angle, radius }) {
  const nodeRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    nodeRef.current.position.x =
      Math.cos(t + angle) * radius;

    nodeRef.current.position.z =
      Math.sin(t + angle) * radius;
  });

  return (
  <mesh
    ref={nodeRef}
    scale={[1.2, 1.2, 1.2]}
  >
    <sphereGeometry args={[0.12, 16, 16]} />

    <meshStandardMaterial
      color="#60A5FA"
      emissive="#60A5FA"
      emissiveIntensity={4}
    />
  </mesh>
);

}
function ParticleCloud() {
  const particles = [];

  for (let i = 0; i < 120; i++) {
    const x = (Math.random() - 0.5) * 12;
    const y = (Math.random() - 0.5) * 12;
    const z = (Math.random() - 0.5) * 12;

    particles.push(
      <mesh key={i} position={[x, y, z]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial
          color="#60A5FA"
          emissive="#60A5FA"
          emissiveIntensity={2}
        />
      </mesh>
    );
  }

  return <group>{particles}</group>;
}
function SkillLabel({ text, angle, radius }) {
  const labelRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.4;

    labelRef.current.position.x =
      Math.cos(t + angle) * radius;

    labelRef.current.position.z =
      Math.sin(t + angle) * radius;

    labelRef.current.lookAt(0, 0, 0);
  });

  return (
    <Text
      ref={labelRef}
      fontSize={0.25}
      color="#60A5FA"
    >
      {text}
    </Text>
  );
}
function AICore3D() {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const { mouse } = useThree();
  useFrame(() => {
  coreRef.current.rotation.y += 0.01;

  ring1Ref.current.rotation.x += 0.01;
  ring1Ref.current.rotation.y += 0.01;

  ring2Ref.current.rotation.z -= 0.015;

  coreRef.current.rotation.x = mouse.y * 0.5;
  coreRef.current.rotation.z = mouse.x * 0.5;
});

 return (
  <group>

    <ParticleGalaxy />
    <ParticleCloud />
      {/* Core */}

      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.5, 3]} />

        <meshStandardMaterial
          color="#60A5FA"
          emissive="#2563EB"
          emissiveIntensity={6}
        />
      </mesh>

      {/* Ring 1 */}

      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.4, 0.05, 16, 100]} />

        <meshStandardMaterial
          color="#60A5FA"
          emissive="#60A5FA"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Ring 2 */}

      <mesh ref={ring2Ref} rotation={[1.5, 0, 0]}>
        <torusGeometry args={[3.1, 0.05, 16, 100]} />

        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={2}
        />
      </mesh>
    {/* Ring 3 */}

<mesh rotation={[0.8, 1.2, 0]}>
  <torusGeometry args={[3.8, 0.03, 16, 100]} />
  <meshStandardMaterial
    color="#60A5FA"
    emissive="#60A5FA"
    emissiveIntensity={2}
  />
</mesh>
<SkillLabel
  text="AI"
  angle={0}
  radius={5}
/>

<SkillLabel
  text="FULL STACK"
  angle={1.2}
  radius={5}
/>

<SkillLabel
  text="CYBER"
  angle={2.4}
  radius={5}
/>

<SkillLabel
  text="DATA"
  angle={3.6}
  radius={5}
/>

<SkillLabel
  text="CLOUD"
  angle={4.8}
  radius={5}
/>

      {/* Orbiting Nodes */}

      <OrbitNode angle={0} radius={4} />
      <OrbitNode angle={1} radius={4} />
      <OrbitNode angle={2} radius={4} />
      <OrbitNode angle={3} radius={4} />
      <OrbitNode angle={4} radius={4} />
      <OrbitNode angle={5} radius={4} />
      <OrbitNode angle={0.5} radius={3} />
      <OrbitNode angle={1.5} radius={3} />
      <OrbitNode angle={2.5} radius={3} />
      <OrbitNode angle={3.5} radius={3} />
    </group>
  );
}

export default AICore3D;