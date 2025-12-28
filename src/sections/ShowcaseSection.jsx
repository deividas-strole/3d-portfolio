import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
          card,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.3 * (index + 1),
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
            },
          }
      );
    });
  }, []);

  return (
      <div id="work" ref={sectionRef} className="app-showcase">
        <div className="w-full">
          <div className="showcaselayout">
            <div ref={rydeRef} className="first-project-wrapper">
              <div className="image-wrapper overflow-hidden rounded-xl bg-black-200">
                <img

                    src="/images/deividas-strole-yeah-sc-OLD.png"
                    alt="LaWander - AI Travel Planner"
                    className="w-full h-full object-cover"
                />
              </div>
              <div className="text-content">
                <h2>Y.E.A.H. - AI-Powered Customer Service Agent</h2>
                <p className="text-white-50 md:text-xl">
                  Java, Spring Boot, React, MySQL, AWS  {/*An app built with Java and React for a fast, user-friendly experience.*/}
                </p>
              </div>
            </div>

            <div className="project-list-wrapper overflow-hidden">
              <div className="project" ref={libraryRef}>
                <div className="image-wrapper bg-black-200">
                  <img
                      src="/images/deividas-strole-lawander-sc.png"
                      alt="Library Management Platform"
                      className="w-full h-full object-cover"
                  />
                </div>
                <h2>LaWander - AI Travel Planner</h2>
                <p className="text-white-50 md:text-xl">
                  Java, Spring Boot, React, MySQL, AWS
                </p>
              </div>

              <div className="project" ref={ycDirectoryRef}>
                <div className="image-wrapper bg-black-200">
                  <img
                      src="/images/deividas-strole-vpnhead-sc.png"
                      alt="YC Directory App"
                      className="w-full h-full object-cover"
                  />
                </div>
                <h2>vpnHead - Portal for VPN Services and Information</h2>
                <p className="text-white-50 md:text-xl">
                  Java, Spring Boot, React, MySQL, AWS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AppShowcase;