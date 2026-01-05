import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import * as THREE from "three";

import TitleHeader from "../components/TitleHeader";

// Floating 3D Model Component
const Floating3DModel = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Pure black

    // Get actual container dimensions
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup with high quality settings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1); // Force black background
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Enhanced Lighting - much brighter with shadows
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1.5);
    pointLight1.position.set(5, 5, 5);
    pointLight1.castShadow = true;
    pointLight1.shadow.mapSize.width = 2048;
    pointLight1.shadow.mapSize.height = 2048;
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1);
    pointLight2.position.set(-5, -3, 3);
    pointLight2.castShadow = true;
    scene.add(pointLight2);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(3, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    // Create a larger, more detailed 3D model (torus knot) with shadows
    const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 150, 20);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x002233,
      emissiveIntensity: 0.1
    });
    const model = new THREE.Mesh(geometry, material);
    model.castShadow = true;
    model.receiveShadow = true;
    scene.add(model);

    // Animation variables
    let time = 0;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      time += 0.01;

      // Floating animation (sine wave for smooth up/down motion)
      model.position.y = Math.sin(time) * 0.5;

      // Gentle rotation
      model.rotation.x += 0.005;
      model.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
      <div
          ref={mountRef}
          style={{
            width: '100%',
            height: '100%',
            minHeight: '600px',
            backgroundColor: '#000000',
            position: 'relative'
          }}
      />
  );
};

// Toast Component
const Toast = ({ message, type = "success", onClose }) => {
  return (
      <div className="fixed top-4 right-4 z-50 animate-slide-in">
        <div
            className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg ${
                type === "success"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
            }`}
        >
          <span className="text-xl">{type === "success" ? "✓" : "✕"}</span>
          <p className="font-medium">{message}</p>
          <button
              onClick={onClose}
              className="ml-2 hover:opacity-75 transition-opacity"
          >
            ✕
          </button>
        </div>
      </div>
  );
};

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [messageSent, setMessageSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const showNotification = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    // Auto-hide toast after 4 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
          import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
          formRef.current,
          import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      // Reset form
      setForm({ name: "", email: "", message: "" });

      // Show success feedback
      setMessageSent(true);
      showNotification(
          "Message sent successfully! I'll get back to you soon.",
          "success"
      );

      // Reset button state after 3 seconds
      setTimeout(() => {
        setMessageSent(false);
      }, 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      showNotification("Failed to send message. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
      <section id="contact" className="flex-center section-padding">
        {showToast && (
            <Toast
                message={toastMessage}
                type={toastType}
                onClose={() => setShowToast(false)}
            />
        )}

        <div className="w-full h-full md:px-10 px-5">
          <TitleHeader
              title="Get in Touch – Let's Connect"
              sub="💬 Have questions or ideas? Let's talk! 🚀"
          />
          <div className="grid-12-cols mt-16">
            <div className="xl:col-span-5">
              <div className="flex-center card-border rounded-xl p-10">
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-7"
                >
                  <div>
                    <label htmlFor="name">Your name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="What's your good name?"
                        required
                    />
                  </div>

                  <div>
                    <label htmlFor="email">Your Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="What's your email address?"
                        required
                    />
                  </div>

                  <div>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="How can I help you?"
                        rows="5"
                        required
                    />
                  </div>

                  <button type="submit" disabled={loading || messageSent}>
                    <div
                        className={`cta-button group transition-all duration-300 ${
                            messageSent ? "opacity-90" : ""
                        }`}
                    >
                      <div
                          className={`bg-circle transition-colors duration-300 ${
                              messageSent ? "!bg-green-500" : ""
                          }`}
                      />
                      <p className="text">
                        {loading
                            ? "Sending..."
                            : messageSent
                                ? "Message Sent! ✓"
                                : "Send Message"}
                      </p>
                      {!messageSent && (
                          <div className="arrow-wrapper">
                            <img src="/images/arrow-down.svg" alt="arrow" />
                          </div>
                      )}
                    </div>
                  </button>
                </form>
              </div>
            </div>
            <div className="xl:col-span-7" style={{ minHeight: '600px' }}>
              <div style={{ width: '100%', height: '600px', borderRadius: '24px', overflow: 'hidden', backgroundColor: '#000000' }}>
                <Floating3DModel />
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Contact;



// ORIGINAL CODE WITH OLD COMUTER DESK FROM 1990'S
// import { useRef, useState } from "react";
// import emailjs from "@emailjs/browser";
//
// import TitleHeader from "../components/TitleHeader";
// import ContactExperience from "../components/models/contact/ContactExperience";
//
// // Toast Component
// const Toast = ({ message, type = "success", onClose }) => {
//   return (
//       <div className="fixed top-4 right-4 z-50 animate-slide-in">
//         <div
//             className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg ${
//                 type === "success"
//                     ? "bg-green-500 text-white"
//                     : "bg-red-500 text-white"
//             }`}
//         >
//         <span className="text-xl">
//           {type === "success" ? "✓" : "✕"}
//         </span>
//           <p className="font-medium">{message}</p>
//           <button
//               onClick={onClose}
//               className="ml-2 hover:opacity-75 transition-opacity"
//           >
//             ✕
//           </button>
//         </div>
//       </div>
//   );
// };
//
// const Contact = () => {
//   const formRef = useRef(null);
//   const [loading, setLoading] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");
//   const [toastType, setToastType] = useState("success");
//   const [messageSent, setMessageSent] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//
//   const showNotification = (message, type = "success") => {
//     setToastMessage(message);
//     setToastType(type);
//     setShowToast(true);
//
//     // Auto-hide toast after 4 seconds
//     setTimeout(() => {
//       setShowToast(false);
//     }, 4000);
//   };
//
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//
//     try {
//       await emailjs.sendForm(
//           import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
//           import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
//           formRef.current,
//           import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
//       );
//
//       // Reset form
//       setForm({ name: "", email: "", message: "" });
//
//       // Show success feedback
//       setMessageSent(true);
//       showNotification("Message sent successfully! I'll get back to you soon.", "success");
//
//       // Reset button state after 3 seconds
//       setTimeout(() => {
//         setMessageSent(false);
//       }, 3000);
//
//     } catch (error) {
//       console.error("EmailJS Error:", error);
//       showNotification("Failed to send message. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//       <section id="contact" className="flex-center section-padding">
//         {showToast && (
//             <Toast
//                 message={toastMessage}
//                 type={toastType}
//                 onClose={() => setShowToast(false)}
//             />
//         )}
//
//         <div className="w-full h-full md:px-10 px-5">
//           <TitleHeader
//               title="Get in Touch – Let's Connect"
//               sub="💬 Have questions or ideas? Let's talk! 🚀"
//           />
//           <div className="grid-12-cols mt-16">
//             <div className="xl:col-span-5">
//               <div className="flex-center card-border rounded-xl p-10">
//                 <form
//                     ref={formRef}
//                     onSubmit={handleSubmit}
//                     className="w-full flex flex-col gap-7"
//                 >
//                   <div>
//                     <label htmlFor="name">Your name</label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={form.name}
//                         onChange={handleChange}
//                         placeholder="What's your good name?"
//                         required
//                     />
//                   </div>
//
//                   <div>
//                     <label htmlFor="email">Your Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={form.email}
//                         onChange={handleChange}
//                         placeholder="What's your email address?"
//                         required
//                     />
//                   </div>
//
//                   <div>
//                     <label htmlFor="message">Your Message</label>
//                     <textarea
//                         id="message"
//                         name="message"
//                         value={form.message}
//                         onChange={handleChange}
//                         placeholder="How can I help you?"
//                         rows="5"
//                         required
//                     />
//                   </div>
//
//                   <button type="submit" disabled={loading || messageSent}>
//                     <div
//                         className={`cta-button group transition-all duration-300 ${
//                             messageSent ? "opacity-90" : ""
//                         }`}
//                     >
//                       <div
//                           className={`bg-circle transition-colors duration-300 ${
//                               messageSent ? "!bg-green-500" : ""
//                           }`}
//                       />
//                       <p className="text">
//                         {loading
//                             ? "Sending..."
//                             : messageSent
//                                 ? "Message Sent! ✓"
//                                 : "Send Message"}
//                       </p>
//                       {!messageSent && (
//                           <div className="arrow-wrapper">
//                             <img src="/images/arrow-down.svg" alt="arrow" />
//                           </div>
//                       )}
//                     </div>
//                   </button>
//                 </form>
//               </div>
//             </div>
//             <div className="xl:col-span-7 min-h-96">
//               <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
//                 <ContactExperience />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//   );
// };
//
// export default Contact;