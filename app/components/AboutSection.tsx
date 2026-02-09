"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutSection() {
	const t = useTranslations("about");

	return (
		<section className="relative py-24 px-6 md:px-12 lg:px-20">
			<div className="max-w-5xl mx-auto">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-16"
				>
					<p className="text-[var(--accent)] font-medium tracking-wide mb-3 text-sm uppercase">
						{t("title")}
					</p>
					<h2
						className="text-4xl md:text-5xl tracking-tight"
						style={{ fontFamily: "var(--font-display), sans-serif" }}
					>
						Background & Experience
					</h2>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
					{/* Location Card */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="group"
					>
						<div className="flex items-center gap-3 mb-4">
							<div className="p-2 border border-[var(--border)] text-[var(--accent)]">
								<MapPin className="w-5 h-5" />
							</div>
							<h3 className="text-lg font-semibold">{t("location.title")}</h3>
						</div>
						<p className="font-medium mb-1">{t("location.subtitle")}</p>
						<p className="text-[var(--text-muted)] text-sm leading-relaxed">
							{t("location.description")}
						</p>
					</motion.div>

					{/* Education Card */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						viewport={{ once: true }}
						className="group"
					>
						<div className="flex items-center gap-3 mb-4">
							<div className="p-2 border border-[var(--border)] text-[var(--accent)]">
								<GraduationCap className="w-5 h-5" />
							</div>
							<h3 className="text-lg font-semibold">{t("education.title")}</h3>
						</div>
						<div className="space-y-3">
							<div>
								<p className="font-medium text-sm">OpenClassrooms</p>
								<p className="text-[var(--text-muted)] text-xs">
									{t("education.openclassrooms")}
								</p>
							</div>
							<div>
								<p className="font-medium text-sm">Nexa Digital School</p>
								<p className="text-[var(--text-muted)] text-xs">
									{t("education.nexa")}
								</p>
							</div>
							<div>
								<p className="font-medium text-sm">Ynov Bordeaux</p>
								<p className="text-[var(--text-muted)] text-xs">
									{t("education.ynov")}
								</p>
							</div>
						</div>
					</motion.div>

					{/* Work Card */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						viewport={{ once: true }}
						className="group"
					>
						<div className="flex items-center gap-3 mb-4">
							<div className="p-2 border border-[var(--border)] text-[var(--accent)]">
								<Briefcase className="w-5 h-5" />
							</div>
							<h3 className="text-lg font-semibold">{t("work.title")}</h3>
						</div>
						<p className="font-medium mb-1">{t("work.position")}</p>
						<p className="text-[var(--text-muted)] text-sm leading-relaxed">
							{t("work.description")}
						</p>
					</motion.div>
				</div>

				{/* Philosophy */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					viewport={{ once: true }}
					className="border-l-2 border-[var(--accent)] pl-6 py-2"
				>
					<p className="text-lg text-[var(--text-muted)] leading-relaxed">
						<span className="font-semibold text-[var(--foreground)]">
							{t("philosophy.label")}
						</span>{" "}
						{t("philosophy.text")}
					</p>
				</motion.div>
			</div>
		</section>
	);
}
