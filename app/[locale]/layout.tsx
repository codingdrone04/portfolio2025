import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ThemeProvider from "../components/ThemeProvider";
import "../globals.css";
import GlorpWidget from "../components/GlorpWidget";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
			>
				<ThemeProvider>
					<NextIntlClientProvider messages={messages}>
						{children}
						<GlorpWidget />
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
