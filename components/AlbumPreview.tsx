import { View, StyleSheet, Pressable } from 'react-native'
import { CoverArt } from './CoverArt'
import { Text } from './Text'
import { memo, FC } from 'react'

interface Props {
	album: Album
	size: number
	onPress?: () => void
}

interface Album {
	id: string
	artist: string
	title: string
	coverArt: string
}

export const AlbumPreview: FC<Props> = memo(({ album, size, onPress }) => {
	return (
		<Pressable role="link" onPress={onPress} style={[{ width: size }, style.album]}>
			<CoverArt id={album.id} size={size} />
			<View style={style.info}>
				<Text variant="secondary" numberOfLines={1} style={style.artist}>
					{album.artist}
				</Text>
				<Text variant="primary" numberOfLines={1} style={style.title}>
					{album.title}
				</Text>
			</View>
		</Pressable>
	)
})

const style = StyleSheet.create({
	album: {
		gap: 5
	},
	artwork: {
		borderRadius: 15
	},
	info: {
		justifyContent: 'center'
	},
	title: {
		textAlign: 'center',
		fontSize: 15
	},
	artist: {
		fontSize: 12,
		textAlign: 'center',
		fontWeight: '300'
	},
	artworkLoading: {
		borderRadius: 15
	}
})
