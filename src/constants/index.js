const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

// const counterItems = [
//   { value: 15, suffix: "+", label: "Years of Experience" },
//   { value: 200, suffix: "+", label: "Satisfied Clients" },
//   { value: 108, suffix: "+", label: "Completed Projects" },
//   { value: 90, suffix: "%", label: "Client Retention Rate" },
// ];

const counterItems = [
  { label: "M.S. in Software Engineering" },
  { label: "B.S. in Computer Science" },
  { label: "B.S. in Informatics" },
  { label: "ML/AI (Python) Certification" },
];

const logoIconsList = [
  {
    name: "Visitor Maker",
  },
  {
    name: "JetWait",
  },
  {
    name: "VPNHead.com",
  },
  {
    name: "LaWander AI Travel Planner",
  },
  {
    name: "Pociunas Insurance Services",
  },
  {
    name: "Brides Agency",
  },
  {
    name: "Karma Credits",
  },
  {
    name: "We Make Good Software",
  },
  {
    name: "Visitor Maker",
  },
  {
    name: "JetWait",
  },
  {
    name: "VPNHead.com",
  },
  {
    name: "LaWander AI Travel Planner",
  },
  {
    name: "Pociunas Insurance Services",
  },
  {
    name: "Brides Agency",
  },
  {
    name: "Karma Credits",
  },
  {
    name: "We Make Good Software",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    imgPath: "/images/time.png",
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  // {
  //   name: "React Developer",
  //   modelPath: "/models/react_logo-transformed.glb",
  //   scale: 1,
  //   rotation: [0, 0, 0],
  // },
  {
    name: "Java Developer",
    // modelPath: "/models/python-transformed.glb",
    modelPath: "/models/java.glb",
    scale: 1.1,
    rotation: [0, 0, 0],
  },
  {
    name: "JavaScript Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "SQL",
    modelPath: "/models/sql.glb",
    scale: 5,
    rotation: [0, 0, 0],
  },
  // {
  //   name: "Project Manager",
  //   modelPath: "/models/git-svg-transformed.glb",
  //   scale: 0.05,
  //   rotation: [0, -Math.PI / 4, 0],
  // },
];

const expCards = [
  {
    review: "Adrian brought creativity and technical expertise to the team, significantly improving our frontend performance. His work has been invaluable in delivering faster experiences.",
    imgPath: "/images/exp1.png",
    logoPath: "/images/logo1.png",
    title: "Full Stack Developer",
    date: "October 2024 - Present",
    company: "We Make Good Software",
    responsibilities: [
      "Developed two SAS platforms: Funel Sensai and YEAH.",
      "Backend: Java, Spring Boot, MySQL.",
      "Frontend: JavaScript, TypeScript, React, Figma.",
    ],
  },
  {
    review: "Adrian’s contributions to Docker's web applications have been outstanding. He approaches challenges with a problem-solving mindset.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "WordPress Developer & SEO Specialist",
    date: "April 2015 - September 2024",
    company: "VisitorMaker, JetWait, BridesAgency",
    responsibilities: [
      "Worked on multiple web projects.",
      "Technologies used: WordPress, PHP, MySQL, HTML5, CSS3.",
      "Achieved #1 and #4 global rankings for high-value keywords through organic SEO strategies and web design optimization.",
    ],
  },
  {
    review: "Adrian’s work on Appwrite’s mobile app brought a high level of quality and efficiency. He delivered solutions that enhanced our mobile experience & meet our product goals.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "IT Support & Web Administrator",
    date: "July 2008 - March 2015",
    company: "Pociunas Insurance Services",
    responsibilities: [
      "Managed Windows Server environment and maintained network infrastructure for 20+ workstations.",
      "Maintained company websites including code modifications, bug fixes, and updates.",
      "Managed company social media presence and digital marketing initiatives.",
    ],
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const testimonials = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Adrian was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: "/images/client4.png",
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/client6.png",
  },
];

const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
  },
  {
    name: "fb",
    imgPath: "/images/fb.png",
  },
  {
    name: "x",
    imgPath: "/images/x.png",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
