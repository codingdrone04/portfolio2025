"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle, Loader2, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

interface FormErrors {
	name?: string;
	email?: string;
	subject?: string;
	message?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
	initial: {},
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const API_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL || "http://localhost:8080";

export default function ContactSection() {
	const t = useTranslations("contact");

	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [status, setStatus] = useState<FormStatus>("idle");

	function validate(): FormErrors {
		const errs: FormErrors = {};

		if (!formData.name.trim()) {
			errs.name = t("form.nameRequired");
		} else if (formData.name.length > 100) {
			errs.name = t("form.nameMaxLength");
		}

		if (!formData.email.trim()) {
			errs.email = t("form.emailRequired");
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			errs.email = t("form.emailInvalid");
		}

		if (formData.subject.length > 200) {
			errs.subject = t("form.subjectMaxLength");
		}

		if (!formData.message.trim()) {
			errs.message = t("form.messageRequired");
		} else if (formData.message.length > 5000) {
			errs.message = t("form.messageMaxLength");
		}

		return errs;
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const validationErrors = validate();
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length > 0) return;

		setStatus("submitting");

		try {
			const res = await fetch(`${API_URL}/send`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (res.status === 429) {
				setStatus("error");
				setErrors({ name: t("form.rateLimit") });
				return;
			}

			if (!res.ok) {
				setStatus("error");
				return;
			}

			setStatus("success");
			setFormData({ name: "", email: "", subject: "", message: "" });
			setTimeout(() => setStatus("idle"), 5000);
		} catch {
			setStatus("error");
		}
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	}

	const inputStyle =
		"w-full px-4 py-3 bg-transparent border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors";

	return (
		<section id="contact" className="relative flex-1 flex items-center py-12 px-6 md:px-12 lg:px-20 overflow-y-auto">
			<div className="max-w-3xl mx-auto w-full">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="border-t border-[var(--border)] pt-16"
				>
					<p className="text-[var(--accent)] font-medium tracking-wide mb-3 text-sm uppercase">
						Contact
					</p>
					<h2
						className="text-4xl md:text-5xl tracking-tight mb-6"
						style={{ fontFamily: "var(--font-display), sans-serif" }}
					>
						{t("title")}
					</h2>
					<p className="text-[var(--text-muted)] text-lg mb-10 max-w-xl leading-relaxed">
						{t("description")}
					</p>

					<AnimatePresence mode="wait">
						{status === "success" ? (
							<motion.div
								key="success"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								className="flex items-center gap-3 p-6 border border-[var(--accent)] text-[var(--foreground)]"
							>
								<CheckCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
								<p>{t("form.success")}</p>
							</motion.div>
						) : (
							<motion.form
								key="form"
								onSubmit={handleSubmit}
								initial="initial"
								whileInView="animate"
								viewport={{ once: true }}
								variants={staggerContainer}
								className="space-y-6"
							>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<motion.div variants={fadeInUp}>
										<label htmlFor="name" className="text-sm font-medium mb-1.5 block">
											{t("form.name")}
										</label>
										<input
											type="text"
											id="name"
											name="name"
											value={formData.name}
											onChange={handleChange}
											placeholder={t("form.namePlaceholder")}
											className={inputStyle}
										/>
										{errors.name && (
											<p className="text-red-500 text-xs mt-1">{errors.name}</p>
										)}
									</motion.div>

									<motion.div variants={fadeInUp}>
										<label htmlFor="email" className="text-sm font-medium mb-1.5 block">
											{t("form.email")}
										</label>
										<input
											type="email"
											id="email"
											name="email"
											value={formData.email}
											onChange={handleChange}
											placeholder={t("form.emailPlaceholder")}
											className={inputStyle}
										/>
										{errors.email && (
											<p className="text-red-500 text-xs mt-1">{errors.email}</p>
										)}
									</motion.div>
								</div>

								<motion.div variants={fadeInUp}>
									<label htmlFor="subject" className="text-sm font-medium mb-1.5 block">
										{t("form.subject")}
									</label>
									<input
										type="text"
										id="subject"
										name="subject"
										value={formData.subject}
										onChange={handleChange}
										placeholder={t("form.subjectPlaceholder")}
										className={inputStyle}
									/>
									{errors.subject && (
										<p className="text-red-500 text-xs mt-1">{errors.subject}</p>
									)}
								</motion.div>

								<motion.div variants={fadeInUp}>
									<label htmlFor="message" className="text-sm font-medium mb-1.5 block">
										{t("form.message")}
									</label>
									<textarea
										id="message"
										name="message"
										value={formData.message}
										onChange={handleChange}
										placeholder={t("form.messagePlaceholder")}
										rows={6}
										className={`${inputStyle} min-h-[150px] resize-y`}
									/>
									{errors.message && (
										<p className="text-red-500 text-xs mt-1">{errors.message}</p>
									)}
								</motion.div>

								<motion.div variants={fadeInUp} className="flex flex-col gap-4">
									<button
										type="submit"
										disabled={status === "submitting"}
										className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--foreground)] text-[var(--background)] font-medium transition-all duration-300 hover:bg-[var(--accent)] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
									>
										{status === "submitting" ? (
											<>
												<Loader2 className="w-4 h-4 animate-spin" />
												{t("form.sending")}
											</>
										) : (
											<>
												<Send className="w-4 h-4" />
												{t("form.send")}
											</>
										)}
									</button>

									{status === "error" && (
										<div className="flex items-center gap-2 text-red-500 text-sm">
											<AlertCircle className="w-4 h-4 flex-shrink-0" />
											<p>{t("form.error")}</p>
										</div>
									)}
								</motion.div>
							</motion.form>
						)}
					</AnimatePresence>

					<div className="mt-10 pt-6 border-t border-[var(--border)]">
						<p className="text-[var(--text-muted)] text-sm">
							{t("fallback")}{" "}
							<a
								href="mailto:codingdronecontact@proton.me"
								className="group inline-flex items-center gap-1 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
							>
								codingdronecontact@proton.me
								<ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
							</a>
						</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
