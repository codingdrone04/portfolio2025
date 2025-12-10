"use client";

import { motion } from "framer-motion";
import { Mail, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
};

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export default function HeroSection() {
	const t = useTranslations("hero");

	return (
		<section className="relative min-h-screen flex items-center justify-center px-4 py-20">
			<motion.div
				initial="initial"
				animate="animate"
				variants={staggerContainer}
				className="max-w-4xl w-full text-center"
			>
				<motion.div variants={fadeInUp} className="mb-6">
					<div className="inline-block p-4 rounded-2xl bg-purple-500 dark:bg-pink-400 mb-4 shadow-[8px_8px_0px_0px_rgba(147,51,234,0.5)]">
						<Zap className="w-8 h-8 text-white" />
					</div>
				</motion.div>

				<motion.h1
					variants={fadeInUp}
					className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
					style={{
						WebkitTextStroke: "8px rgba(0, 0, 0, 0.8)",
						paintOrder: "stroke fill",
					}}
				>
					{t("greeting")}
				</motion.h1>

				<motion.p
					variants={fadeInUp}
					className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto font-semibold"
				>
					{t("tagline")}
				</motion.p>

				<motion.div
					variants={fadeInUp}
					className="flex gap-4 justify-center flex-wrap"
				>
					<a
						href="#projects"
						className="px-8 py-3 bg-purple-500 dark:bg-pink-500 text-white rounded-2xl font-semibold hover:translate-y-[-4px] transition-all shadow-[6px_6px_0px_0px_rgba(168,85,247,0.6)] hover:shadow-[8px_8px_0px_0px_rgba(168,85,247,0.6)]"
					>
						{t("viewProjects")}
					</a>
					<a
						href="#contact"
						className="px-8 py-3 bg-white dark:bg-orange-400 text-purple-600 dark:text-white border-3 border-purple-500 dark:border-white rounded-2xl font-semibold hover:translate-y-[-4px] transition-all shadow-[6px_6px_0px_0px_rgba(236,72,153,0.6)] hover:shadow-[8px_8px_0px_0px_rgba(236,72,153,0.6)]"
					>
						{t("getInTouch")}
					</a>
				</motion.div>

				<motion.div
					variants={fadeInUp}
					className="flex gap-6 justify-center mt-12"
				>
					<a
						href="https://github.com/codingdrone04"
						target="_blank"
						rel="noopener noreferrer"
						className="p-3 rounded-xl bg-pink-500 dark:bg-purple-500 text-white hover:translate-y-[-2px] transition-all shadow-[4px_4px_0px_0px_rgba(236,72,153,0.6)]"
						aria-label="GitHub"
					>
						<svg
							className="w-6 h-6"
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
						href="mailto:contact@codingdrone04.dev"
						className="p-3 rounded-xl bg-orange-500 dark:bg-orange-400 text-white hover:translate-y-[-2px] transition-all shadow-[4px_4px_0px_0px_rgba(251,146,60,0.6)]"
						aria-label="Email"
					>
						<Mail className="w-6 h-6" />
					</a>
				</motion.div>
			</motion.div>
		</section>
	);
}
