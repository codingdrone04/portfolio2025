"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap, Briefcase } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="relative py-20 px-4">
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
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-pink-500 dark:bg-pink-600 rounded-2xl p-6 border-4 border-white shadow-[8px_8px_0px_0px_rgba(236,72,153,0.6)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-white">
                <MapPin className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Location</h3>
            </div>
            <p className="text-white text-lg font-semibold mb-2">Bayonne → Bordeaux</p>
            <p className="text-white/90">Originally from Bayonne, now based in Bordeaux pursuing my Master's in Software Development at Ynov.</p>
          </motion.div>

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-purple-500 dark:bg-purple-600 rounded-2xl p-6 border-4 border-white shadow-[8px_8px_0px_0px_rgba(168,85,247,0.6)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-white">
                <GraduationCap className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Education</h3>
            </div>
            <div className="space-y-3 text-white">
              <div>
                <p className="font-bold">OpenClassrooms</p>
                <p className="text-white/90 text-sm">Bac+2 - Web Development Foundations</p>
              </div>
              <div>
                <p className="font-bold">Nexa Digital School</p>
                <p className="text-white/90 text-sm">Bachelor - Full-Stack Development</p>
              </div>
              <div>
                <p className="font-bold">Ynov Bordeaux</p>
                <p className="text-white/90 text-sm">Master's - Software Development</p>
              </div>
            </div>
          </motion.div>

          {/* Work Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-orange-500 dark:bg-orange-600 rounded-2xl p-6 border-4 border-white shadow-[8px_8px_0px_0px_rgba(251,146,60,0.6)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-white">
                <Briefcase className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Work</h3>
            </div>
            <p className="text-white text-lg font-semibold mb-2">Uncove - Apprentice Developer</p>
            <p className="text-white/90">Building microservices with JavaScript, managing Docker & Kubernetes clusters, handling video encoding and transactions with ArangoDB. Maintaining React backoffice interfaces.</p>
          </motion.div>
        </div>

        {/* Philosophy Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-6 bg-white dark:bg-slate-800 rounded-2xl p-8 border-4 border-purple-500 shadow-[8px_8px_0px_0px_rgba(168,85,247,0.6)]"
        >
          <p className="text-xl text-slate-800 dark:text-white leading-relaxed text-center">
            <span className="font-bold">My Philosophy:</span> Great software isn't just functional : it needs to be intuitive and pleasant to use. I build systems with clean architecture and scalable design, constantly exploring new technologies to solve complex challenges efficiently.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
