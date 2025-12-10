"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
	const t = useTranslations("footer");

	return (
		<footer className="relative py-8 px-4 border-t-4 border-purple-500 dark:border-pink-400">
			<div className="max-w-6xl mx-auto text-center text-purple-600 dark:text-pink-300">
				<p className="font-medium">© 2025 codingdrone04. {t("builtWith")}</p>
			</div>
		</footer>
	);
}
