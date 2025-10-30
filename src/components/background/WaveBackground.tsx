import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WaveBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const stickFigureRef = useRef<THREE.Group>();
  const timeRef = useRef(0);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    // Set camera position
    camera.position.z = 15;
    camera.position.y = 0;
    camera.lookAt(0, 0, 0);
    
    // Set renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    
    // Create parabola hill (U shape, spanning full width)
    const hillPoints = [];
    const aspect = window.innerWidth / window.innerHeight;
    const hillWidth = 20 * aspect; // Scale width based on aspect ratio to fill screen
    const hillHeight = 5; // Depth of the U shape
    
    for (let i = 0; i <= 100; i++) {
      const x = (i / 100) * hillWidth - hillWidth / 2;
      const normalizedX = (i / 100) * 2 - 1; // -1 to 1
      const y = hillHeight * normalizedX * normalizedX - hillHeight; // Parabola opening upward, shifted down
      hillPoints.push(new THREE.Vector3(x, y, 0));
    }
    
    const hillGeometry = new THREE.BufferGeometry().setFromPoints(hillPoints);
    const hillMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
    const hill = new THREE.Line(hillGeometry, hillMaterial);
    scene.add(hill);
    
    // Create stick figure man as a group
    const stickFigure = new THREE.Group();
    const stickMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
    
    // Head (circle)
    const headGeometry = new THREE.CircleGeometry(0.3, 32);
    const headMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    const headOutlineGeometry = new THREE.RingGeometry(0.28, 0.32, 32);
    const headOutline = new THREE.Mesh(headOutlineGeometry, new THREE.MeshBasicMaterial({ color: 0x000000 }));
    head.position.set(0, 1.5, 0.1);
    headOutline.position.set(0, 1.5, 0.1);
    stickFigure.add(head);
    stickFigure.add(headOutline);
    
    // Body (vertical line)
    const bodyPoints = [];
    bodyPoints.push(new THREE.Vector3(0, 1.2, 0.1));
    bodyPoints.push(new THREE.Vector3(0, 0, 0.1));
    const bodyGeometry = new THREE.BufferGeometry().setFromPoints(bodyPoints);
    const body = new THREE.Line(bodyGeometry, stickMaterial);
    stickFigure.add(body);
    
    // Arms
    const leftArmPoints = [];
    leftArmPoints.push(new THREE.Vector3(0, 0.9, 0.1));
    leftArmPoints.push(new THREE.Vector3(-0.6, 0.5, 0.1));
    const leftArmGeometry = new THREE.BufferGeometry().setFromPoints(leftArmPoints);
    const leftArm = new THREE.Line(leftArmGeometry, stickMaterial);
    stickFigure.add(leftArm);
    
    const rightArmPoints = [];
    rightArmPoints.push(new THREE.Vector3(0, 0.9, 0.1));
    rightArmPoints.push(new THREE.Vector3(0.6, 0.5, 0.1));
    const rightArmGeometry = new THREE.BufferGeometry().setFromPoints(rightArmPoints);
    const rightArm = new THREE.Line(rightArmGeometry, stickMaterial);
    stickFigure.add(rightArm);
    
    // Legs
    const leftLegPoints = [];
    leftLegPoints.push(new THREE.Vector3(0, 0, 0.1));
    leftLegPoints.push(new THREE.Vector3(-0.4, -0.8, 0.1));
    const leftLegGeometry = new THREE.BufferGeometry().setFromPoints(leftLegPoints);
    const leftLeg = new THREE.Line(leftLegGeometry, stickMaterial);
    stickFigure.add(leftLeg);
    
    const rightLegPoints = [];
    rightLegPoints.push(new THREE.Vector3(0, 0, 0.1));
    rightLegPoints.push(new THREE.Vector3(0.4, -0.8, 0.1));
    const rightLegGeometry = new THREE.BufferGeometry().setFromPoints(rightLegPoints);
    const rightLeg = new THREE.Line(rightLegGeometry, stickMaterial);
    stickFigure.add(rightLeg);
    
    scene.add(stickFigure);
    
    // Store references for cleanup
    stickFigureRef.current = stickFigure;
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    
    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !stickFigureRef.current) return;
      
      // Move stick figure back and forth
      timeRef.current += 0.01;
      const xPosition = Math.sin(timeRef.current) * (hillWidth / 2 - 2); // Oscillate across the width
      const normalizedX = xPosition / (hillWidth / 2); // Normalize to -1 to 1
      const yPosition = hillHeight * normalizedX * normalizedX - hillHeight; // Follow parabola (U shape)
      
      stickFigureRef.current.position.x = xPosition;
      stickFigureRef.current.position.y = yPosition + 0.8; // Offset so feet are on the hill
      
      // Render scene
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && rendererRef.current?.domElement) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of Three.js objects
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
              } else {
                object.material.dispose();
              }
            }
            if (object.geometry) {
              object.geometry.dispose();
            }
          }
        });
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default WaveBackground;