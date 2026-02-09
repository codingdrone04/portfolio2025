"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutSection() {
	const t = useTranslations("about");

	const education = [
		{ period: `2025 - ${t("present")}`, title: "Ynov Bordeaux", description: t("education.ynov") },
		{ period: "2024 - 2025", title: "Nexa Digital School", description: t("education.nexa") },
		{ period: "2023", title: "OpenClassrooms", description: t("education.openclassrooms") },
		{ period: "2022", title: t("education.bordeaux.title"), description: t("education.bordeaux.description") },
	];

	const experience = [
		{ period: `2024 - ${t("present")}`, title: "Uncove", role: t("experience.uncove.role"), description: t("experience.uncove.description") },
		{ period: "2024", title: "Drivn", role: t("experience.drivn.role"), description: t("experience.drivn.description") },
	];

	return (
		<section className="relative min-h-screen flex items-center py-24 px-6 md:px-12 lg:px-20">
			<div className="max-w-4xl mx-auto w-full">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-12"
				>
					<p className="text-[var(--accent)] font-medium tracking-wide mb-3 text-sm uppercase">
						{t("title")}
					</p>
				</motion.div>

				{/* Intro paragraph */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="text-lg leading-relaxed text-[var(--text-muted)] mb-16"
				>
					{t("intro")}
				</motion.p>

				<div className="grid md:grid-cols-2 gap-12 md:gap-16">
					{/* Education */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
					>
						<div className="flex items-center gap-3 mb-8">
							<GraduationCap className="w-5 h-5 text-[var(--accent)]" />
							<h3 className="font-semibold text-lg">{t("educationTitle")}</h3>
						</div>

						<div className="space-y-6">
							{education.map((item) => (
								<div key={item.period + item.title} className="group">
									<span className="text-[var(--accent)] font-mono text-xs">
										{item.period}
									</span>
									<h4 className="font-medium mt-0.5">{item.title}</h4>
									<p className="text-[var(--text-muted)] text-sm mt-1">
										{item.description}
									</p>
								</div>
							))}
						</div>
					</motion.div>

					{/* Experience */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						viewport={{ once: true }}
					>
						<div className="flex items-center gap-3 mb-8">
							<Briefcase className="w-5 h-5 text-[var(--accent)]" />
							<h3 className="font-semibold text-lg">{t("experienceTitle")}</h3>
						</div>

						<div className="space-y-6">
							{experience.map((item) => (
								<div key={item.period + item.title} className="group">
									<span className="text-[var(--accent)] font-mono text-xs">
										{item.period}
									</span>
									<h4 className="font-medium mt-0.5">{item.title}</h4>
									<p className="text-[var(--text-muted)] text-xs italic">{item.role}</p>
									<p className="text-[var(--text-muted)] text-sm mt-1">
										{item.description}
									</p>
								</div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
