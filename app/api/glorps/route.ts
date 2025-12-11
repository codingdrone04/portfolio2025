import { readdir } from "node:fs/promises";
import { NextResponse } from "next/server";
import { join } from "node:path";

export async function GET() {
	try {
		const glorpsDirectory = join(process.cwd(), "public", "glorps");
		const files = await readdir(glorpsDirectory);

		const glorpImages = files.filter(
			(file) =>
				file.endsWith(".png") &&
				file !== "glorpbox.png" &&
				!file.startsWith("."),
		);

		return NextResponse.json({ images: glorpImages });
	} catch (error) {
		console.error("Error reading glorp images:", error);
		return NextResponse.json(
			{ error: "Failed to load glorp images" },
			{ status: 500 },
		);
	}
}
