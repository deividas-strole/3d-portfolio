import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const InteractiveCubes = () => {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const raycasterRef = useRef(null);
    const pointerRef = useRef(new THREE.Vector2());
    const thetaRef = useRef(0);
    const intersectedRef = useRef(null);
    const frameIdRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear any existing content
        while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
        }

        const radius = 25;
        const frustumSize = 75; // Reduced from 50 to 25 (50% smaller view)

        // Camera setup
        const aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        const camera = new THREE.OrthographicCamera(
            frustumSize * aspect / -2,
            frustumSize * aspect / 2,
            frustumSize / 2,
            frustumSize / -2,
            0.1,
            100
        );
        cameraRef.current = camera;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000); // Black background
        sceneRef.current = scene;

        // Light
        const light = new THREE.DirectionalLight(0xffffff, 3);
        light.position.set(1, 1, 1).normalize();
        scene.add(light);

        // Create 2000 cubes
        const geometry = new THREE.BoxGeometry();
        for (let i = 0; i < 2000; i++) {
            const object = new THREE.Mesh(
                geometry,
                new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
            );
            object.position.x = Math.random() * 40 - 20;
            object.position.y = Math.random() * 40 - 20;
            object.position.z = Math.random() * 40 - 20;
            object.rotation.x = Math.random() * 2 * Math.PI;
            object.rotation.y = Math.random() * 2 * Math.PI;
            object.rotation.z = Math.random() * 2 * Math.PI;
            object.scale.x = Math.random() + 0.5;
            object.scale.y = Math.random() + 0.5;
            object.scale.z = Math.random() + 0.5;
            scene.add(object);
        }

        // Raycaster for interaction
        const raycaster = new THREE.Raycaster();
        raycasterRef.current = raycaster;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererRef.current = renderer;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Event handlers
        const onPointerMove = (event) => {
            const rect = containerRef.current.getBoundingClientRect();
            pointerRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            pointerRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        };

        const onWindowResize = () => {
            if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

            const aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            cameraRef.current.left = -frustumSize * aspect / 2;
            cameraRef.current.right = frustumSize * aspect / 2;
            cameraRef.current.top = frustumSize / 2;
            cameraRef.current.bottom = -frustumSize / 2;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };

        // Animation loop
        const animate = () => {
            frameIdRef.current = requestAnimationFrame(animate);

            thetaRef.current += 0.1;

            // Move camera in circular pattern
            camera.position.x = radius * Math.sin(THREE.MathUtils.degToRad(thetaRef.current)) - 10; // Move left
            camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(thetaRef.current)) - 5; // Move down
            camera.position.z = radius * Math.cos(THREE.MathUtils.degToRad(thetaRef.current));
            camera.lookAt(new THREE.Vector3(-10, -5, 0)); // Look at offset position
            camera.updateMatrixWorld();

            // Raycasting for hover effect
            raycaster.setFromCamera(pointerRef.current, camera);
            const intersects = raycaster.intersectObjects(scene.children, false);

            if (intersects.length > 0) {
                if (intersectedRef.current !== intersects[0].object) {
                    if (intersectedRef.current) {
                        intersectedRef.current.material.emissive.setHex(intersectedRef.current.currentHex);
                    }
                    intersectedRef.current = intersects[0].object;
                    intersectedRef.current.currentHex = intersectedRef.current.material.emissive.getHex();
                    intersectedRef.current.material.emissive.setHex(0xff0000);
                }
            } else {
                if (intersectedRef.current) {
                    intersectedRef.current.material.emissive.setHex(intersectedRef.current.currentHex);
                }
                intersectedRef.current = null;
            }

            renderer.render(scene, camera);
        };

        containerRef.current.addEventListener('pointermove', onPointerMove);
        window.addEventListener('resize', onWindowResize);

        animate();

        // Cleanup
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('pointermove', onPointerMove);
            }
            window.removeEventListener('resize', onWindowResize);

            if (frameIdRef.current) {
                cancelAnimationFrame(frameIdRef.current);
            }

            // Dispose Three.js objects
            if (geometry) geometry.dispose();
            scene.children.forEach(child => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) child.material.dispose();
            });

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
            raycasterRef.current = null;
            intersectedRef.current = null;
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                cursor: 'pointer'
            }}
        />
    );
};

export default InteractiveCubes;