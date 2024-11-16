import { FC, useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { useInfoStore } from '../hooks/useInfoStore'
import { CoverArt } from './CoverArt'
import { Text } from './Text'

interface Props {
	artist: {
		name: string
		coverArt: string
	}
}

export const ArtistPreview: FC<Props> = ({ artist }) => {
	const containerWidth = useInfoStore(state => state.width)
	const itemWidth = useMemo(() => containerWidth / 2 - 20 - 5, [containerWidth])

	return (
		<View style={[{ width: itemWidth }, style.container]}>
			<CoverArt id={artist.coverArt} size={itemWidth} borderRadius={500} />
			<Text variant="primary" numberOfLines={1}>
				{artist.name}
			</Text>
		</View>
	)
}

const style = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: 5
	}
})
