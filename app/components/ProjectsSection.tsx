"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface Project {
	title: string;
	description: string;
	tags: string[];
	link: string;
}

export default function ProjectsSection() {
	const t = useTranslations("projects");
	const projects = t.raw("items") as Project[];

	return (
		<section id="projects" className="relative py-24 px-6 md:px-12 lg:px-20">
			<div className="max-w-5xl mx-auto">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-16"
				>
					<p className="text-[var(--accent)] font-medium tracking-wide mb-3 text-sm uppercase">
						Work
					</p>
					<h2
						className="text-4xl md:text-5xl tracking-tight"
						style={{ fontFamily: "var(--font-display), sans-serif" }}
					>
						{t("title")}
					</h2>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{projects.map((project: Project, index: number) => (
						<motion.a
							key={project.title}
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true, amount: 0.3 }}
							className="group block p-6 border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
						>
							<div className="flex justify-between items-start mb-4">
								<h3 className="text-lg font-semibold group-hover:text-[var(--accent)] transition-colors">
									{project.title}
								</h3>
								<ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
							</div>

							<p className="text-[var(--text-muted)] text-sm mb-6 leading-relaxed">
								{project.description}
							</p>

							<div className="flex flex-wrap gap-2">
								{project.tags.map((tag) => (
									<span
										key={tag}
										className="px-2 py-1 text-xs text-[var(--text-muted)] border border-[var(--border)]"
									>
										{tag}
									</span>
								))}
							</div>
						</motion.a>
					))}
				</div>
			</div>
		</section>
	);
}
