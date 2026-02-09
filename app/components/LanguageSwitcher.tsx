"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { useState } from "react";

export default function LanguageSwitcher() {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	const languages = [
		{ code: "en", name: "EN" },
		{ code: "fr", name: "FR" },
	];

	const handleLanguageChange = (newLocale: string) => {
		router.replace(pathname, { locale: newLocale });
		setIsOpen(false);
	};

	return (
		<div className="fixed top-6 left-6 z-50">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="p-2.5 border border-[var(--border)] bg-[var(--background)] hover:border-[var(--accent)] transition-colors flex items-center gap-2"
				aria-label="Change language"
			>
				<Languages className="w-5 h-5" />
				<span className="text-sm font-medium uppercase">{locale}</span>
			</button>

			{isOpen && (
				<div className="absolute top-12 left-0 bg-[var(--background)] border border-[var(--border)] overflow-hidden">
					{languages.map((lang) => (
						<button
							type="button"
							key={lang.code}
							onClick={() => handleLanguageChange(lang.code)}
							className={`w-full px-4 py-2 text-sm font-medium text-left hover:bg-[var(--accent-muted)] transition-colors ${
								locale === lang.code
									? "text-[var(--accent)]"
									: "text-[var(--foreground)]"
							}`}
						>
							{lang.name}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
