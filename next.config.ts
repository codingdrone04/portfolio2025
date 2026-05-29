import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Base URL the contact form talks to — must be allowed in connect-src.
const contactApiUrl =
	process.env.NEXT_PUBLIC_CONTACT_API_URL || "https://mail.cd04.fr";

// 'unsafe-inline' is required in script-src because Next.js injects inline
// bootstrap/hydration scripts; a nonce-based policy would need middleware
// wiring. Acceptable here: the app renders no user-controlled HTML (no
// dangerouslySetInnerHTML), so the XSS surface is effectively nil.
const contentSecurityPolicy = [
	"default-src 'self'",
	"script-src 'self' 'unsafe-inline'",
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self' data:",
	"font-src 'self'",
	`connect-src 'self' ${contactApiUrl}`,
	"frame-ancestors 'none'",
	"base-uri 'self'",
	"form-action 'self'",
	"object-src 'none'",
	"upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
	{ key: "Content-Security-Policy", value: contentSecurityPolicy },
	{
		key: "Strict-Transport-Security",
		value: "max-age=31536000; includeSubDomains",
	},
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "X-Frame-Options", value: "DENY" },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
	},
];

const nextConfig: NextConfig = {
	output: "standalone",
	poweredByHeader: false,
	async headers() {
		return [{ source: "/:path*", headers: securityHeaders }];
	},
};

export default withNextIntl(nextConfig);
