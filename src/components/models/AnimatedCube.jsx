import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedCube = ({ words = ['Java', 'JavaScript', 'SQL', 'AI', 'React', 'Python'] }) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current || sceneRef.current) return;

        let scene, camera, renderer, mesh;
        let animationProgress = 0;
        let animationId;
        const canvases = [];
        const contexts = [];
        const textures = [];

        // Initialize scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x111111);

        // Initialize camera
        camera = new THREE.PerspectiveCamera(
            50,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            10
        );
        camera.position.z = 3.5;

        // Initialize renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Create materials for each face
        const materials = [];

        words.forEach((word) => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            canvases.push(canvas);
            contexts.push(ctx);

            const texture = new THREE.CanvasTexture(canvas);
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            textures.push(texture);

            materials.push(
                new THREE.MeshStandardMaterial({
                    map: texture,
                    roughness: 0.5,
                    metalness: 0.1,
                })
            );
        });

        // Create box geometry
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        mesh = new THREE.Mesh(geometry, materials);
        scene.add(mesh);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
        keyLight.position.set(5, 5, 5);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0x8888ff, 0.3);
        fillLight.position.set(-3, 0, -3);
        scene.add(fillLight);

        // Animation function
        const drawAnimatedText = (ctx, word, progress) => {
            ctx.fillStyle = '#1a1a3e';
            ctx.fillRect(0, 0, 512, 512);

            const charCount = Math.ceil(progress * word.length);
            const displayText = word.substring(0, charCount);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 80px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(displayText, 256, 256);

            if (progress < 1 && charCount < word.length) {
                const cursorAlpha = Math.sin(progress * 20) * 0.5 + 0.5;
                ctx.globalAlpha = cursorAlpha;
                ctx.fillRect(256 + ctx.measureText(displayText).width / 2 + 10, 226, 4, 60);
                ctx.globalAlpha = 1;
            }
        };

        // Animation loop
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            animationProgress += 0.01;
            if (animationProgress > 1) {
                animationProgress = 0;
            }

            words.forEach((word, index) => {
                drawAnimatedText(contexts[index], word, animationProgress);
                textures[index].needsUpdate = true;
            });

            mesh.rotation.x += 0.006;
            mesh.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        animate();
        sceneRef.current = { scene, camera, renderer, mesh, geometry, materials, textures, animationId };

        // Handle window resize
        const handleResize = () => {
            if (!mountRef.current) return;
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);

            if (animationId) {
                cancelAnimationFrame(animationId);
            }

            if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }

            geometry.dispose();
            materials.forEach((material) => {
                if (material.map) material.map.dispose();
                material.dispose();
            });
            renderer.dispose();

            sceneRef.current = null;
        };
    }, [words]);

    return (
        <div
            ref={mountRef}
            style={{
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                background: '#000'
            }}
        />
    );
};

export default AnimatedCube;