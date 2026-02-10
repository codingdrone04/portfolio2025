"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useTranslations } from "next-intl";

const cardStyle = (
	index: number,
	isInView: boolean,
	isExpanded: boolean,
	hasSelection: boolean,
) => ({
	opacity: !isInView ? 0 : hasSelection && !isExpanded ? 0.4 : 1,
	transform: isInView ? "translateY(0)" : "translateY(20px)",
	transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
});

interface Project {
	title: string;
	shortDescription: string;
	description: string;
	tags: string[];
	link: string;
}

export default function ProjectsSection() {
	const t = useTranslations("projects");
	const projects = t.raw("items") as Project[];
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
	const sectionRef = useRef<HTMLElement>(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

	return (
		<section
			ref={sectionRef}
			id="projects"
			className="relative min-h-screen flex items-center py-8 px-6 md:px-12 lg:px-20"
		>
			<div className="w-full">
				<motion.div
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : {}}
					transition={{ duration: 0.6 }}
					className="mb-6"
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

				{/* Expanded card - shown above the grid */}
				<AnimatePresence>
					{expandedIndex !== null && (
						<motion.div
							key={projects[expandedIndex].title}
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
							className="overflow-hidden"
						>
							<div className="mb-4 border border-[var(--accent)] p-6">
								<div className="flex justify-between items-start mb-3">
									<h3 className="text-xl font-semibold text-[var(--accent)]">
										{projects[expandedIndex].title}
									</h3>
									<div className="flex items-center gap-4 shrink-0">
										<a
											href={projects[expandedIndex].link}
											target="_blank"
											rel="noopener noreferrer"
											className="p-1.5 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
											onClick={(e) => e.stopPropagation()}
										>
											<span className="sr-only">GitHub repository</span>
											<svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><title>GitHub</title><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/></svg>
										</a>
										<button
											type="button"
											onClick={() => setExpandedIndex(null)}
											className="p-1.5 text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
										>
											<X className="w-5 h-5" />
										</button>
									</div>
								</div>

								<p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-3xl mb-4">
									{projects[expandedIndex].description}
								</p>

								<div className="flex flex-wrap gap-2">
									{projects[expandedIndex].tags.map((tag) => (
										<span
											key={tag}
											className="px-2 py-1 text-xs text-[var(--text-muted)] border border-[var(--border)]"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Compact cards grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{projects.map((project: Project, index: number) => {
						const isExpanded = expandedIndex === index;

						return (
							<button
								key={project.title}
								type="button"
								style={cardStyle(index, isInView, isExpanded, expandedIndex !== null)}
								onClick={() =>
									setExpandedIndex(isExpanded ? null : index)
								}
								className={`group cursor-pointer border p-5 text-left w-full transition-all duration-300 ${
									isExpanded
										? "border-[var(--accent)] scale-[0.97]"
										: expandedIndex !== null
											? "border-[var(--border)] hover:border-[var(--accent)]"
											: "border-[var(--border)] hover:border-[var(--accent)]"
								}`}
							>
								<div className="flex justify-between items-start mb-2">
									<h3
										className={`text-base font-semibold transition-colors ${
											isExpanded
												? "text-[var(--accent)]"
												: "group-hover:text-[var(--accent)]"
										}`}
									>
										{project.title}
									</h3>
									<ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
								</div>

								<p className="text-[var(--text-muted)] text-sm leading-relaxed mb-3">
									{project.shortDescription}
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
							</button>
						);
					})}
				</div>
			</div>
		</section>
	);
}
