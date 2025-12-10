"use client";

import { Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { useState } from "react";
import { usePathname, useRouter } from "@/i18n/routing";

export default function LanguageSwitcher() {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	const languages = [
		{ code: "en", name: "English", flag: "🇬🇧" },
		{ code: "fr", name: "Français", flag: "🇫🇷" },
	];

	const currentLanguage = languages.find((lang) => lang.code === locale);

	const handleLanguageChange = (newLocale: string) => {
		router.replace(pathname, { locale: newLocale });
		setIsOpen(false);
	};

	return (
		<div className="fixed top-6 left-6 z-50">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="p-3 rounded-full bg-white dark:bg-slate-800 border-4 border-orange-500 shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95 flex items-center gap-2"
				aria-label="Change language"
			>
				<Languages className="w-6 h-6 text-orange-500" />
				<span className="text-lg">{currentLanguage?.flag}</span>
			</button>

			{isOpen && (
				<div className="absolute top-16 left-0 bg-white dark:bg-slate-800 border-4 border-orange-500 rounded-2xl shadow-xl overflow-hidden">
					{languages.map((lang) => (
						<button
							key={lang.code}
							onClick={() => handleLanguageChange(lang.code)}
							className={`w-full px-6 py-3 flex items-center gap-3 hover:bg-orange-100 dark:hover:bg-slate-700 transition-colors ${
								locale === lang.code ? "bg-orange-50 dark:bg-slate-700" : ""
							}`}
						>
							<span className="text-2xl">{lang.flag}</span>
							<span className="font-semibold text-slate-800 dark:text-white">
								{lang.name}
							</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
