"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div className="fixed top-6 right-6 z-50 w-10 h-10 border border-[var(--border)] bg-[var(--background)]" />
		);
	}

	return (
		<button
			type="button"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="fixed top-6 right-6 z-50 p-2.5 border border-[var(--border)] bg-[var(--background)] hover:border-[var(--accent)] transition-colors"
			aria-label="Toggle theme"
		>
			{theme === "dark" ? (
				<Sun className="w-5 h-5" />
			) : (
				<Moon className="w-5 h-5" />
			)}
		</button>
	);
}
