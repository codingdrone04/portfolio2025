"use client";

import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";
import ThemeToggle from "../components/ThemeToggle";
import TopographicBackground from "../components/TopographicBackground";

export default function Home() {
	return (
		<div className="h-screen overflow-y-auto snap-y snap-mandatory bg-[var(--background)] text-[var(--foreground)] relative">
			<TopographicBackground />
			<ThemeToggle />
			<LanguageSwitcher />
			<main className="relative z-10">
				<section className="snap-start">
					<HeroSection />
				</section>
				<section className="snap-start">
					<AboutSection />
				</section>
				<section className="snap-start">
					<SkillsSection />
				</section>
				<section className="snap-start">
					<ProjectsSection />
				</section>
				<section className="snap-start h-screen flex flex-col">
					<ContactSection />
					<Footer />
				</section>
			</main>
		</div>
	);
}
