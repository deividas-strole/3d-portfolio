import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SpinningCube = () => {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const cubeRef = useRef(null);
    const frameIdRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear any existing content
        while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
        }

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(
            50, // Reduced FOV from 75 to 50 for less distortion
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
        );
        cameraRef.current = camera;
        camera.position.set(-1, 0.3, 5); // Further back to reduce distortion

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererRef.current = renderer;
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setClearColor(0x000000, 0);
        containerRef.current.appendChild(renderer.domElement);

        // Function to create canvas texture with text
        function createTextTexture(text, bgColor) {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, 512, 512);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 60px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, 256, 256);

            return new THREE.CanvasTexture(canvas);
        }

        // Create cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const materials = [
            new THREE.MeshBasicMaterial({ map: createTextTexture('Java', '#5382a1') }),
            new THREE.MeshBasicMaterial({ map: createTextTexture('JavaScript', '#F0DB4F') }),
            new THREE.MeshBasicMaterial({ map: createTextTexture('Spring', '#00FF7F') }),
            new THREE.MeshBasicMaterial({ map: createTextTexture('React', '#61DAFB') }),
            new THREE.MeshBasicMaterial({ map: createTextTexture('SQL', '#F29111') }),
            new THREE.MeshBasicMaterial({ map: createTextTexture('AI', '#5200ff') })
        ];

        const cube = new THREE.Mesh(geometry, materials);
        cube.scale.set(1.2, 1.2, 1.2); // Make cube slightly bigger
        cube.position.set(1, -0.3, 0); // Move right and down slightly
        cubeRef.current = cube;
        scene.add(cube);

        // Animation
        const animate = () => {
            frameIdRef.current = requestAnimationFrame(animate);

            if (cubeRef.current) {
                cubeRef.current.rotation.x += 0.01;
                cubeRef.current.rotation.y += 0.01;
            }

            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
        };

        animate();

        // Resize handler
        const handleResize = () => {
            if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

            cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);

            if (frameIdRef.current) {
                cancelAnimationFrame(frameIdRef.current);
            }

            // Dispose Three.js objects
            if (geometry) geometry.dispose();
            if (materials) {
                materials.forEach(mat => {
                    if (mat.map) mat.map.dispose();
                    mat.dispose();
                });
            }
            if (rendererRef.current) {
                rendererRef.current.dispose();
                if (containerRef.current && rendererRef.current.domElement.parentNode === containerRef.current) {
                    containerRef.current.removeChild(rendererRef.current.domElement);
                }
            }

            // Clear refs
            sceneRef.current = null;
            cameraRef.current = null;
            rendererRef.current = null;
            cubeRef.current = null;
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
                position: 'relative'
            }}
        />
    );
};

export default SpinningCube;