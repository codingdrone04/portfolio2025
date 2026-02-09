"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
	const t = useTranslations("footer");

	return (
		<footer className="relative py-8 px-6 md:px-12 lg:px-20 border-t border-[var(--border)]">
			<div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
				<p className="text-[var(--text-muted)] text-sm">
					© 2025 codingdrone04
				</p>
				<p className="text-[var(--text-muted)] text-sm">{t("builtWith")}</p>
			</div>
		</footer>
	);
}
