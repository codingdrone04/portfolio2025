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
		<div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative">
			<TopographicBackground />
			<ThemeToggle />
			<LanguageSwitcher />
			<main className="relative z-10">
				<HeroSection />
				<AboutSection />
				<SkillsSection />
				<ProjectsSection />
				<ContactSection />
			</main>
			<Footer />
		</div>
	);
}
