"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactSection() {
	const t = useTranslations("contact");

	return (
		<section id="contact" className="relative py-24 px-6 md:px-12 lg:px-20">
			<div className="max-w-3xl mx-auto">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="border-t border-[var(--border)] pt-16"
				>
					<p className="text-[var(--accent)] font-medium tracking-wide mb-3 text-sm uppercase">
						Contact
					</p>
					<h2
						className="text-4xl md:text-5xl tracking-tight mb-6"
						style={{ fontFamily: "var(--font-display), sans-serif" }}
					>
						{t("title")}
					</h2>
					<p className="text-[var(--text-muted)] text-lg mb-10 max-w-xl leading-relaxed">
						{t("description")}
					</p>

					<a
						href="mailto:contact@codingdrone04.dev"
						className="group inline-flex items-center gap-2 text-lg font-medium hover:text-[var(--accent)] transition-colors"
					>
						contact@codingdrone04.dev
						<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
					</a>
				</motion.div>
			</div>
		</section>
	);
}
