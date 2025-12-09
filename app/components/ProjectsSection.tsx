"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export default function ProjectsSection() {
  const t = useTranslations('projects');
  const projects = t.raw('items') as Project[];

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
          {t('title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: Project, index: number) => (
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
