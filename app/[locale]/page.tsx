"use client";

import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import InteractiveBackground from "../components/InteractiveBackground";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 relative overflow-hidden">
			<InteractiveBackground />
			<ThemeToggle />
			<LanguageSwitcher />
			<HeroSection />
			<AboutSection />
			<SkillsSection />
			<ProjectsSection />
			<ContactSection />
			<Footer />
		</div>
	);
}
