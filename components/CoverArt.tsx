import { FC, useEffect, useState } from 'react'
import { StyleProp, useColorScheme, View } from 'react-native'
import { Image, ImageStyle } from 'expo-image'
import { useConfigStore } from '../hooks/useConfigStore'
import palette from '../constants/palette'

interface Props {
	id: string
	size: number
	style?: StyleProp<ImageStyle>
	borderRadius?: number
}
export const CoverArt: FC<Props> = ({ id, size, style, borderRadius }) => {
	const colorScheme = useColorScheme()
	const getURL = useConfigStore(state => state.getURL)
	const [coverURI, setCoverURI] = useState<string | null>(null)

	const backgroundColor = colorScheme === 'dark' ? palette.deepSeaBlue : palette.lightGray

	useEffect(() => {
		if (!size) return

		getURL('getCoverArt').then(url => {
			url.searchParams.set('id', id)
			url.searchParams.set('size', String(size > 100 ? size : 100))
			setCoverURI(url.toString())
		})
	}, [size])

	return (
		<View
			accessible={true}
			role="img"
			style={[
				{
					width: size,
					height: size,
					backgroundColor,
					borderRadius: borderRadius || 15,
					borderWidth: 1,
					borderColor: backgroundColor
				},
				style
			]}
		>
			{coverURI && (
				<Image
					style={[{ borderRadius: borderRadius || 15, width: '100%', height: '100%' }]}
					source={coverURI}
					contentFit="cover"
					cachePolicy="memory-disk"
				/>
			)}
		</View>
	)
}
