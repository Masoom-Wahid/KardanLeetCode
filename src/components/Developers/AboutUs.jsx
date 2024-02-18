// Improved Import statements including Tailwind and FontAwesome
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faDatabase,
  faLightbulb,
  faUsers,
  faRocket,
  faGlobe,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPython,
  faNode,
  faAngular,
  faReact,
  faVuejs,
  faHtml5,
} from "@fortawesome/free-brands-svg-icons";
import ServicesSection from "./Services";

const CoFounderCard = ({ imagePath, name, role, description, icons }) => (
  <div className="text-center shadow-lg rounded-lg overflow-hidden transition duration-300 hover:shadow-xl">
    <img
      src={imagePath}
      alt={name}
      className="rounded-full mx-auto w-32 h-32 mt-4 border-4 border-primary"
    />
    <div className="p-4 bg-white">
      <h3 className="text-xl font-bold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-500">{role}</p>
      <p className="text-md mt-2 text-gray-700">{description}</p>
      <div className="flex justify-center mt-4">
        {icons.map((icon, index) => (
          <FontAwesomeIcon
            key={index}
            icon={icon}
            className="mx-2 text-primary h-5 w-5"
          />
        ))}
      </div>
    </div>
  </div>
);

const AboutUs = () => {
  const technologies = [
    { name: "HTML", icon: faHtml5, color: "text-red-600" },
    { name: "Vue.js", icon: faVuejs, color: "text-green-500" },
    { name: "Angular", icon: faAngular, color: "text-red-500" },
    { name: "React.js", icon: faReact, color: "text-blue-600" },
    { name: "Next.js", icon: faReact, color: "text-green-600" },
    { name: "Django", icon: faPython },
    { name: "Node.js", icon: faNode, color: "text-green-900" },
  ];

  return (
    <div>
      <div className="relative h-screen flex flex-col justify-center items-center text-white">
        <div className="absolute w-full h-full bg-black bg-opacity-60"></div>
        <img
          src="/image3.jpg"
          alt="background"
          className="absolute w-full h-full object-cover"
        />
        <div className="z-10 text-center">
          <h1 className="text-7xl font-bold mb-4">Meet The Creators</h1>
          {/* <p className="text-xl mx-auto leading-relaxed max-w-md">
            Empowering your digital presence with bespoke solutions and
            unparalleled innovation.
          </p> */}
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Our Values</h2>
          <div className="flex flex-wrap justify-around items-center">
            <div className="text-center px-4 py-2 m-2">
              <FontAwesomeIcon
                icon={faGlobe}
                className="text-primary h-12 w-12"
              />
              <h3 className="mt-2 font-bold">Global Impact</h3>
              <p>
                We aim to make a worldwide difference with our digital
                solutions.
              </p>
            </div>
            <div
              className="text-center px-4 py-2 m-2"
              style={{ marginBottom: "30px" }}
            >
              <FontAwesomeIcon
                icon={faUsers}
                className="text-primary h-12 w-12"
              />
              <h3 className="mt-2 font-bold">Community Driven</h3>
              <p>
                Engaging with the community is at the heart of our development
                process.
              </p>
            </div>
          </div>
        </div>

        <ServicesSection />

        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">
            Developers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <CoFounderCard
              imagePath="/masoom.jpg"
              name="Masoom Wahid"
              role="Back-End Prodigy"
              description="Masoom Wahid, the virtuoso of the digital realm, is a back-end developer whose coding prowess knows no bounds. Armed with a keyboard and an unwavering passion for technology, Masoom has become a maestro in crafting the intricate foundations of web applications. Python courses through his veins, and Django is his artistic canvas, where he orchestrates symphonies of seamless functionality."
              icons={[faCode, faLightbulb]}
            />
            <CoFounderCard
              imagePath="/elham.jpg"
              name="Elhamullah Hossaini"
              role="Front-End Wizard"
              description="
              Elham is a web development luminary with over 2 years of experience, showcasing a unique blend of technology and creativity. As a visionary leader, he pioneers the creation of innovative user experiences, leveraging a diverse toolkit that includes React JS, Next JS, Angular, Vue JS, HTML, CSS, Tailwind, and various other front-end features. Elham doesn't just code; he crafts digital masterpieces that seamlessly blend technological precision with boundless creativity."
              icons={[faCode, faLightbulb]}
            />
            <CoFounderCard
              imagePath="/haroon.png"
              name="Haroon Azizi"
              role="Strategic Project Planning"
              description="Haroon is not just a planner; he is a strategic visionary, possessing the rare ability to transform abstract concepts into actionable plans that drive unequivocal success. His strategic acumen is matched only by his profound understanding of project dynamics, allowing him to lead teams towards milestones with unparalleled efficiency and crystal-clear clarity."
              icons={[faSearch, faLightbulb]}
            />
          </div>
        </div>
        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Our Expertise
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="text-center transition duration-300 hover:scale-110"
                  >
                    <FontAwesomeIcon
                      icon={tech.icon}
                      className={`${tech.color} h-16 w-16`}
                    />
                    <p className="mt-2">{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
          <h2 className="text-3xl font-bold mb-4">Start Your Project Today</h2>
          <p className="text-xl mb-8">
            Connect with us to bring your ideas to life.
          </p>
          <button className="bg-primary text-black font-italic py-2 px-6 shadow-lg hover:bg-primary-dark transition duration-300 ease-in-out transform hover:-translate-y-1">
            Get in Touch
          </button>
        </div>

        <footer className="bg-gray-800 text-white text-center p-4 space-y-4">
          <div className="flex justify-center gap-8">
            <a href="#about" className="hover:underline">
              About Us
            </a>
            <a href="#services" className="hover:underline">
              Services
            </a>
            <a href="#portfolio" className="hover:underline">
              Portfolio
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </div>
          © 2024 Nucleus Web Studios. Innovate. Create. Elevate.
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;
