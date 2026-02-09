import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = {
	width: 32,
	height: 32,
}

export const contentType = 'image/png'

export default async function Icon() {
	// Lire l'image depuis le système de fichiers
	const imageData = await readFile(join(process.cwd(), 'app', 'chibi-sam.jpeg'))
	const base64Image = `data:image/jpeg;base64,${imageData.toString('base64')}`

	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: '50%',
					overflow: 'hidden',
				}}
			>
				<img
					src={base64Image}
					alt="Icon"
					width={32}
					height={32}
					style={{
						objectFit: 'cover',
					}}
				/>
			</div>
		),
		{
			...size,
		},
	)
}
