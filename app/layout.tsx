import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Samuel - Full-Stack Developer",
	description:
		"Full-stack developer building scalable systems from frontend to microservices",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
