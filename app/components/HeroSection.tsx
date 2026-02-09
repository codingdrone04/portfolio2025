"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.15,
		},
	},
};

export default function HeroSection() {
	const t = useTranslations("hero");

	return (
		<section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-20">
			<motion.div
				initial="initial"
				animate="animate"
				variants={staggerContainer}
				className="max-w-3xl w-full"
			>
				<motion.p
					variants={fadeInUp}
					className="text-[var(--accent)] font-medium tracking-wide mb-4 text-sm uppercase"
				>
					Portfolio
				</motion.p>

				<motion.h1
					variants={fadeInUp}
					className="text-5xl md:text-7xl lg:text-8xl mb-6 leading-none tracking-tight font-[var(--font-display)]"
					style={{ fontFamily: "var(--font-display), sans-serif" }}
				>
					{t("greeting")}
				</motion.h1>

				<motion.p
					variants={fadeInUp}
					className="text-lg md:text-xl text-[var(--text-muted)] mb-10 max-w-xl leading-relaxed"
				>
					{t("tagline")}
				</motion.p>

				<motion.div variants={fadeInUp} className="flex gap-4 flex-wrap">
					<a
						href="#projects"
						className="group inline-flex items-center gap-2 px-6 py-3 bg-[var(--foreground)] text-[var(--background)] font-medium transition-all duration-300 hover:bg-[var(--accent)] hover:text-white"
					>
						{t("viewProjects")}
						<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
					</a>
					<a
						href="#contact"
						className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] text-[var(--foreground)] font-medium transition-all duration-300 hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)]"
					>
						{t("getInTouch")}
					</a>
				</motion.div>

				<motion.div
					variants={fadeInUp}
					className="flex gap-5 mt-14 pt-14 border-t border-[var(--border)]"
				>
					<a
						href="https://github.com/codingdrone04"
						target="_blank"
						rel="noopener noreferrer"
						className="text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
					>
						<span className="sr-only">GitHub</span>
						<svg
							className="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clipRule="evenodd"
							/>
						</svg>
					</a>
					<a
						href="mailto:codingdronecontact@proton.me"
						className="text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
						aria-label="Email"
					>
						<Mail className="w-5 h-5" />
					</a>
				</motion.div>
			</motion.div>
		</section>
	);
}
