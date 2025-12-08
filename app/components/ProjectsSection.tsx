"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: "Rock Paper Scissors Microservice",
    description: "A distributed microservices architecture built with Java implementing the classic game. Features service discovery, load balancing, and inter-service communication. This project demonstrates enterprise-level design patterns and scalable system architecture, showcasing my ability to build robust backend systems with clean separation of concerns.",
    tags: ["Java", "Microservices", "Spring Boot", "REST API"],
    link: "https://github.com/codingdrone04/rock-paper-scissors-microservice"
  },
  {
    title: "Mon Vieux Grimoire",
    description: "A full-stack book rating platform featuring user authentication, CRUD operations, and image upload functionality. Built with Node.js and Express on the backend with MongoDB for data persistence. Implements secure authentication flows and optimized image handling, demonstrating proficiency in building complete web applications from database to UI.",
    tags: ["JavaScript", "Node.js", "MongoDB", "Express"],
    link: "https://github.com/codingdrone04/Mon-vieux-grimoire"
  },
  {
    title: "Go Fullstack Backend",
    description: "A comprehensive backend API showcasing RESTful architecture and database integration. Features robust error handling, data validation, and secure authentication mechanisms. This project helped me deepen my understanding of backend development best practices and API design principles, bridging the gap between frontend and backend development.",
    tags: ["JavaScript", "Node.js", "REST API", "MongoDB"],
    link: "https://github.com/codingdrone04/go-fullstack-backend"
  },
  {
    title: "Library App",
    description: "An interactive library management system built with vanilla JavaScript, focusing on DOM manipulation and local storage. Features book tracking, reading status updates, and persistent data storage. This project strengthened my foundational JavaScript skills and understanding of browser APIs before transitioning to modern frameworks.",
    tags: ["JavaScript", "HTML", "CSS", "Local Storage"],
    link: "https://github.com/codingdrone04/library-app"
  },
  {
    title: "Plantanin / Tsarbucks",
    description: "A Java-based application simulating a coffee shop ordering system with inventory management. Implements object-oriented programming principles, design patterns, and clean code architecture. This project reinforced my Java fundamentals and taught me about building maintainable, scalable applications with proper abstraction and encapsulation.",
    tags: ["Java", "OOP", "Design Patterns"],
    link: "https://github.com/codingdrone04/Plantanin"
  },
  {
    title: "Personal Portfolio Site",
    description: "A modern, responsive portfolio website built with Sass for advanced styling capabilities. Features modular CSS architecture with variables, mixins, and nesting for maintainable stylesheets. Demonstrates proficiency in CSS preprocessing and responsive design principles, creating a polished user experience across all devices.",
    tags: ["SCSS", "HTML", "Responsive Design"],
    link: "https://github.com/codingdrone04/mysite"
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-white"
          style={{
            WebkitTextStroke: '4px rgba(0, 0, 0, 0.8)',
            paintOrder: 'stroke fill'
          }}
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 rounded-2xl bg-white dark:bg-orange-900 border-4 border-pink-500 dark:border-orange-300 hover:translate-y-[-4px] transition-all shadow-[8px_8px_0px_0px_rgba(236,72,153,0.5)] dark:shadow-[8px_8px_0px_0px_rgba(251,146,60,0.4)]"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-pink-600 dark:text-white">
                  {project.title}
                </h3>
                <a
                  href={project.link}
                  className="p-2 rounded-lg bg-pink-500 dark:bg-orange-400 text-white hover:translate-y-[-2px] transition-transform shadow-[3px_3px_0px_0px_rgba(236,72,153,0.6)]"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-gray-700 dark:text-orange-100 mb-4 text-sm">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-semibold rounded-full bg-pink-100 dark:bg-orange-700 text-pink-700 dark:text-white border-2 border-pink-500 dark:border-orange-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
