import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPython,
  faNodeJs,
  faAngular,
  faReact,
  faVuejs,
} from "@fortawesome/free-brands-svg-icons";
import {
  faSearch,
  faChartBar,
  faMapSigns,
  faCogs,
  faLock,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const servicesData = [
  {
    category: "Front-end Development",
    description:
      "Crafting engaging user experiences with modern front-end technologies.",
    services: [
      {
        name: "React JS",
        icon: faReact,
        details:
          "Building interactive UIs with powerful component-based architecture.",
      },
      {
        name: "Next JS",
        icon: faReact,
        details:
          "Enhancing React apps with server-side rendering and static site generation.",
      },
      {
        name: "Angular",
        icon: faAngular,
        details:
          "Developing robust, enterprise-level web apps with a full-featured framework.",
      },
      {
        name: "Vue JS",
        icon: faVuejs,
        details:
          "Creating fast, reactive web interfaces with a progressive framework.",
      },
    ],
  },
  {
    category: "Back-end Development",
    description:
      "Powering applications with scalable and secure back-end solutions.",
    services: [
      {
        name: "Django",
        icon: faPython,
        details:
          "Building high-performing, elegant web applications with a high-level Python web framework.",
      },
      {
        name: "Django Channels",
        icon: faPython,
        details:
          "Handling WebSockets, chat protocols, and custom live updates with Django.",
      },
      // Placeholder icons for technologies without a specific FontAwesome icon
      {
        name: "Node.js",
        icon: faNodeJs,
        details: "Creating scalable server-side applications with JavaScript.",
      },
      // Add other back-end technologies as needed
    ],
  },
  {
    category: "Product Strategic Planning",
    description:
      "Aligning technology and business strategies to drive product success.",
    services: [
      // Placeholder details and icons, as specific technologies for strategic planning may not have direct FontAwesome icons
      {
        name: "Market Analysis",
        icon: faSearch,
        details:
          "Conducting in-depth market research to identify opportunities and trends.",
      },
      {
        name: "Competitive Analysis",
        icon: faChartBar,
        details:
          "Assessing competitive landscape to refine product positioning.",
      },
      {
        name: "Product Roadmapping",
        icon: faMapSigns,
        details:
          "Outlining product vision, direction, priorities, and progress.",
      },
      // Add more strategic planning services as needed
    ],
  },
  {
    category: "Security & Compliance",
    description:
      "Ensuring the safety and integrity of your digital assets with advanced security measures and compliance protocols.",
    services: [
      {
        name: "Cybersecurity Solutions",
        icon: faLock,
        details:
          "Protecting applications and data from threats with cutting-edge security technologies.",
      },
      {
        name: "Regulatory Compliance",
        icon: faChartLine,
        details:
          "Navigating complex compliance requirements with expert guidance.",
      },
    ],
  },
];

const ServiceAccordion = ({ category, description, services }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <motion.header
        className="flex justify-between items-center p-5 cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <h2 className="font-semibold text-xl">{category}</h2>
        <FontAwesomeIcon icon={isOpen ? faCogs : faCogs} className="h-5 w-5" />
      </motion.header>
      <motion.div
        animate={{ height: isOpen ? "auto" : 0 }}
        className="overflow-hidden"
      >
        <div className="p-5 border-t text-sm">
          <h1 className="text-lg text-center mb-12">{description}</h1>
          <div className="mt-4">
            {services.map((service, index) => (
              <div key={index} className="flex text-left mt-3">
                <FontAwesomeIcon
                  icon={service.icon}
                  className="h-6 w-6 mr-2 text-primary"
                />
                <div>
                  <h3 className="font-semibold">{service.name}</h3>
                  <p className="text-gray-600">{service.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          Services and Solutions
        </h1>
        <p className="text-lg text-center mb-12">
          Explore our wide range of services designed to propel your business
          forward.
        </p>
        {servicesData.map((item, index) => (
          <ServiceAccordion key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
