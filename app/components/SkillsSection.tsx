"use client";

import { motion } from "framer-motion";
import { type LucideIcon, Palette, Rocket, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

interface Skill {
	key: string;
	icon: LucideIcon;
}

const skillsConfig: Skill[] = [
	{ key: "backend", icon: Rocket },
	{ key: "frontend", icon: Sparkles },
	{ key: "data", icon: Palette },
];

export default function SkillsSection() {
	const t = useTranslations("skills");

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
						WebkitTextStroke: "4px rgba(0, 0, 0, 0.8)",
						paintOrder: "stroke fill",
					}}
				>
					{t("title")}
				</motion.h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{skillsConfig.map((skill, index) => {
						const items = t.raw(`${skill.key}.items`) as string[];
						return (
							<motion.div
								key={skill.key}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true, amount: 0.3 }}
								className="group p-6 rounded-2xl bg-white dark:bg-purple-900 border-4 border-purple-500 dark:border-pink-400 hover:translate-y-[-4px] transition-transform shadow-[8px_8px_0px_0px_rgba(168,85,247,0.5)] dark:shadow-[8px_8px_0px_0px_rgba(236,72,153,0.4)]"
							>
								<div className="p-3 rounded-xl bg-purple-500 dark:bg-pink-500 w-fit mb-4 shadow-[4px_4px_0px_0px_rgba(168,85,247,0.5)]">
									<skill.icon className="w-8 h-8 text-white" />
								</div>
								<h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-white">
									{t(`${skill.key}.name`)}
								</h3>
								<ul className="space-y-2">
									{items.map((item: string) => (
										<li
											key={item}
											className="text-gray-700 dark:text-pink-100 flex items-center gap-2"
										>
											<span className="w-2 h-2 rounded-full bg-purple-500 dark:bg-pink-300"></span>
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
