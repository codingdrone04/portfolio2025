"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function TopographicBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { theme } = useTheme();

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animationId: number;
		let width = window.innerWidth;
		let height = window.innerHeight;

		const resize = () => {
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = width;
			canvas.height = height;
		};

		window.addEventListener("resize", resize);
		resize();

		// Simplex Noise 3D implementation
		const perm = new Uint8Array(512);
		const p = new Uint8Array(256);
		for (let i = 0; i < 256; i++) p[i] = i;
		for (let i = 0; i < 256; i++) {
			const r = (Math.random() * (256 - i) + i) | 0;
			const t = p[i];
			p[i] = p[r];
			p[r] = t;
			perm[i] = perm[i + 256] = p[i];
		}

		const F3 = 1.0 / 3.0;
		const G3 = 1.0 / 6.0;

		const grad3 = [
			[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
			[1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
			[0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
		];
		const dot = (g: number[], x: number, y: number, z: number) => g[0] * x + g[1] * y + g[2] * z;

		const noise3D = (xin: number, yin: number, zin: number) => {
			let n0, n1, n2, n3;
			const s = (xin + yin + zin) * F3;
			const i = Math.floor(xin + s);
			const j = Math.floor(yin + s);
			const k = Math.floor(zin + s);
			const t = (i + j + k) * G3;
			const X0 = i - t;
			const Y0 = j - t;
			const Z0 = k - t;
			const x0 = xin - X0;
			const y0 = yin - Y0;
			const z0 = zin - Z0;

			let i1, j1, k1, i2, j2, k2;
			if (x0 >= y0) {
				if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
				else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
				else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
			} else {
				if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
				else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
				else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
			}

			const x1 = x0 - i1 + G3;
			const y1 = y0 - j1 + G3;
			const z1 = z0 - k1 + G3;
			const x2 = x0 - i2 + 2.0 * G3;
			const y2 = y0 - j2 + 2.0 * G3;
			const z2 = z0 - k2 + 2.0 * G3;
			const x3 = x0 - 1.0 + 3.0 * G3;
			const y3 = y0 - 1.0 + 3.0 * G3;
			const z3 = z0 - 1.0 + 3.0 * G3;

			const ii = i & 255;
			const jj = j & 255;
			const kk = k & 255;

			const gi0 = perm[ii + perm[jj + perm[kk]]] % 12;
			const gi1 = perm[ii + i1 + perm[jj + j1 + perm[kk + k1]]] % 12;
			const gi2 = perm[ii + i2 + perm[jj + j2 + perm[kk + k2]]] % 12;
			const gi3 = perm[ii + 1 + perm[jj + 1 + perm[kk + 1]]] % 12;

			let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
			if (t0 < 0) n0 = 0.0;
			else {
				t0 *= t0;
				n0 = t0 * t0 * dot(grad3[gi0], x0, y0, z0);
			}

			let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
			if (t1 < 0) n1 = 0.0;
			else {
				t1 *= t1;
				n1 = t1 * t1 * dot(grad3[gi1], x1, y1, z1);
			}

			let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
			if (t2 < 0) n2 = 0.0;
			else {
				t2 *= t2;
				n2 = t2 * t2 * dot(grad3[gi2], x2, y2, z2);
			}

			let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
			if (t3 < 0) n3 = 0.0;
			else {
				t3 *= t3;
				n3 = t3 * t3 * dot(grad3[gi3], x3, y3, z3);
			}

			return 32.0 * (n0 + n1 + n2 + n3);
		};

		let time = 0;
		const cellSize = 5; // Smaller cells = smoother lines

		const animate = () => {
			time += 0.0005; // Much slower animation (was 0.002)

			ctx.clearRect(0, 0, width, height);

			const isDark = theme === 'dark' || document.documentElement.classList.contains("dark");
			// Gold/Bronzish color from reference #C4A574
			// Light mode: clearer gold, Dark mode: muted gold
			const strokeColor = isDark ? "rgba(196, 165, 116, 0.2)" : "rgba(154, 123, 79, 0.3)";

			ctx.strokeStyle = strokeColor;
			ctx.lineWidth = 1;
			// Join style round helps with smoothness at vertices
			ctx.lineJoin = "round";
			ctx.lineCap = "round";

			const cols = Math.ceil(width / cellSize) + 1;
			const rows = Math.ceil(height / cellSize) + 1;

			// Helper to get noise value at px, py
			const getValue = (px: number, py: number) => {
				// Pure ambient noise without mouse interaction
				// Higher frequency = more zoomed out (more contours visible)
				return noise3D(px * 0.006, py * 0.006, time);
			};

			// Marching Squares Algorithm
			ctx.beginPath();

			// We'll draw contours at values: -0.6, -0.3, 0, 0.3, 0.6
			const levels = [-0.6, -0.3, 0, 0.3, 0.6];

			// Precompute values for the grid to save noise calls
			const values = new Float32Array(cols * rows);
			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					values[y * cols + x] = getValue(x * cellSize, y * cellSize);
				}
			}

			// For each cell
			for (let y = 0; y < rows - 1; y++) {
				for (let x = 0; x < cols - 1; x++) {
					// Corners of the square
					const tl = values[y * cols + x];
					const tr = values[y * cols + x + 1];
					const dl = values[(y + 1) * cols + x];
					const dr = values[(y + 1) * cols + x + 1];

					// Check each level
					for (const level of levels) {
						let cornerMask = 0;
						if (tl > level) cornerMask |= 8;
						if (tr > level) cornerMask |= 4;
						if (dr > level) cornerMask |= 2;
						if (dl > level) cornerMask |= 1;

						// Skip if fully inside or outside
						if (cornerMask === 0 || cornerMask === 15) continue;

						// Linear interpolation for exact edge position
						// edge top: x + (level - tl) / (tr - tl)
						// edge right: (x+1), y + (level - tr) / (dr - tr)
						// ... etc

						const getX = (v1: number, v2: number) => x * cellSize + cellSize * (level - v1) / (v2 - v1);
						const getY = (v1: number, v2: number) => y * cellSize + cellSize * (level - v1) / (v2 - v1);

						const a = { x: getX(tl, tr), y: y * cellSize }; // Top edge
						const b = { x: (x + 1) * cellSize, y: getY(tr, dr) }; // Right edge
						const c = { x: getX(dl, dr), y: (y + 1) * cellSize }; // Bottom edge
						const d = { x: x * cellSize, y: getY(tl, dl) }; // Left edge

						switch (cornerMask) {
							case 1: ctx.moveTo(d.x, d.y); ctx.lineTo(c.x, c.y); break;
							case 2: ctx.moveTo(b.x, b.y); ctx.lineTo(c.x, c.y); break;
							case 3: ctx.moveTo(d.x, d.y); ctx.lineTo(b.x, b.y); break;
							case 4: ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); break;
							case 5: ctx.moveTo(a.x, a.y); ctx.lineTo(d.x, d.y); ctx.moveTo(b.x, b.y); ctx.lineTo(c.x, c.y); break;
							case 6: ctx.moveTo(a.x, a.y); ctx.lineTo(c.x, c.y); break;
							case 7: ctx.moveTo(d.x, d.y); ctx.lineTo(a.x, a.y); break;
							case 8: ctx.moveTo(d.x, d.y); ctx.lineTo(a.x, a.y); break;
							case 9: ctx.moveTo(a.x, a.y); ctx.lineTo(c.x, c.y); break;
							case 10: ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.moveTo(c.x, c.y); ctx.lineTo(d.x, d.y); break;
							case 11: ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); break;
							case 12: ctx.moveTo(d.x, d.y); ctx.lineTo(b.x, b.y); break;
							case 13: ctx.moveTo(b.x, b.y); ctx.lineTo(c.x, c.y); break;
							case 14: ctx.moveTo(d.x, d.y); ctx.lineTo(c.x, c.y); break;
						}
					}
				}
			}

			ctx.stroke();

			animationId = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			window.removeEventListener("resize", resize);
			cancelAnimationFrame(animationId);
		};
	}, [theme]);

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 pointer-events-none z-0"
		/>
	);
}
