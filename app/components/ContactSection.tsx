"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-orange-500 dark:bg-purple-600 rounded-3xl p-12 shadow-[12px_12px_0px_0px_rgba(251,146,60,0.5)]"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t('title')}
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            {t('description')}
          </p>

          <a
            href="mailto:contact@codingdrone04.dev"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-pink-500 text-orange-600 dark:text-white rounded-2xl font-bold text-lg hover:translate-y-[-4px] transition-all shadow-[6px_6px_0px_0px_rgba(168,85,247,0.6)]"
          >
            <Mail className="w-5 h-5" />
            {t('title')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
