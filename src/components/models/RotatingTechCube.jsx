import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const RotatingTechCube = ({ words = ['Java', 'JavaScript', 'SQL', 'AI', 'React', 'SpringBoot'] }) => {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const frameIdRef = useRef(null);
    const isVisibleRef = useRef(true);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;

        // Renderer with optimized settings
        const renderer = new THREE.WebGLRenderer({
            antialias: false,
            alpha: false,
            powerPreference: "default",
            stencil: false,
            depth: true
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 1);

        // Remove color space conversion - use linear workflow
        if (renderer.outputColorSpace !== undefined) {
            renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
        }

        renderer.domElement.className = 'tech-cube-canvas';

        // Force canvas styles to prevent CSS interference
        renderer.domElement.style.cssText = `
      display: block !important;
      width: 100% !important;
      height: 100% !important;
      background-color: #000000 !important;
      filter: none !important;
      opacity: 1 !important;
      transform: none !important;
      image-rendering: auto !important;
    `;

        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Create text texture with reduced resolution
        const createTextTexture = (text) => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: false });

            // Medium blue background
            ctx.fillStyle = '#1a237e';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Bright white text
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 60px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);

            const texture = new THREE.CanvasTexture(canvas);
            texture.colorSpace = THREE.LinearSRGBColorSpace;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = false;
            texture.needsUpdate = true;
            return texture;
        };

        // Create materials
        const materials = words.map(word =>
            new THREE.MeshStandardMaterial({
                map: createTextTexture(word),
                metalness: 0.4,
                roughness: 0.4,
                emissive: 0x3949ab,
                emissiveIntensity: 0.25,
                color: 0xffffff
            })
        );

        // Create cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);

        // Simplified lighting (fewer lights = better performance)
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
        mainLight.position.set(5, 8, 5);
        scene.add(mainLight);

        // Intersection Observer to pause when not visible
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting;
            },
            { threshold: 0.1 }
        );
        observer.observe(container);

        // Animation loop with visibility check
        let lastTime = performance.now();
        const targetFPS = 30; // Reduced from 60fps
        const frameInterval = 1000 / targetFPS;

        const animate = (currentTime) => {
            frameIdRef.current = requestAnimationFrame(animate);

            // Only render if visible and enough time has passed
            if (!isVisibleRef.current) return;

            const deltaTime = currentTime - lastTime;
            if (deltaTime < frameInterval) return;

            lastTime = currentTime - (deltaTime % frameInterval);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.015;

            renderer.render(scene, camera);
        };

        animate(performance.now());

        // Handle resize with debouncing
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (!container) return;

                const newWidth = container.clientWidth;
                const newHeight = container.clientHeight;

                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
            }, 250);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);

            if (frameIdRef.current) {
                cancelAnimationFrame(frameIdRef.current);
            }

            if (container && renderer.domElement && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }

            geometry.dispose();
            materials.forEach(material => {
                if (material.map) material.map.dispose();
                material.dispose();
            });
            renderer.dispose();
        };
    }, [words]);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
                minHeight: '600px',
                position: 'relative',
                backgroundColor: '#000000',
                display: 'block'
            }}
        />
    );
};

export default RotatingTechCube;