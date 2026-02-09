"use client";

import { motion } from "framer-motion";
import { Code, Database, Layout } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface Skill {
	key: string;
	icon: LucideIcon;
}

const skillsConfig: Skill[] = [
	{ key: "backend", icon: Code },
	{ key: "frontend", icon: Layout },
	{ key: "data", icon: Database },
];

export default function SkillsSection() {
	const t = useTranslations("skills");

	return (
		<section className="relative min-h-screen flex items-center py-24 px-6 md:px-12 lg:px-20 bg-[var(--accent-muted)]">
			<div className="max-w-5xl mx-auto w-full">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-16"
				>
					<p className="text-[var(--accent)] font-medium tracking-wide mb-3 text-sm uppercase">
						Expertise
					</p>
					<h2
						className="text-4xl md:text-5xl tracking-tight"
						style={{ fontFamily: "var(--font-display), sans-serif" }}
					>
						{t("title")}
					</h2>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
					{skillsConfig.map((skill, index) => {
						const items = t.raw(`${skill.key}.items`) as string[];
						return (
							<motion.div
								key={skill.key}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true, amount: 0.3 }}
							>
								<div className="flex items-center gap-3 mb-6">
									<skill.icon className="w-5 h-5 text-[var(--accent)]" />
									<h3 className="text-lg font-semibold">
										{t(`${skill.key}.name`)}
									</h3>
								</div>
								<ul className="space-y-3">
									{items.map((item: string) => (
										<li
											key={item}
											className="text-[var(--text-muted)] text-sm flex items-center gap-3"
										>
											<span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
											{item}
										</li>
									))}
								</ul>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
