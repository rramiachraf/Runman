import { View, StyleSheet, Pressable } from 'react-native'
import { formatSeconds } from '../utils/formatSeconds'
import { CoverArt } from './CoverArt'
import { Text } from './Text'
import { FC, memo } from 'react'

interface Song {
	artist: string
	title: string
	duration: number
	coverArt: string
}

interface Props {
	song: Song
	onPress?: () => void
}

export const SongPreview: FC<Props> = memo(({ song, onPress }) => {
	return (
		<Pressable onPress={onPress}>
			<View style={[style.song]}>
				<CoverArt id={song.coverArt} size={50} borderRadius={10} />
				<View style={style.info}>
					<Text numberOfLines={1} style={style.artist} variant="secondary">
						{song.artist}
					</Text>
					<Text numberOfLines={1} style={style.title} variant="primary">
						{song.title}
					</Text>
				</View>
				<Text variant="secondary">{formatSeconds(song.duration)}</Text>
			</View>
		</Pressable>
	)
})

const style = StyleSheet.create({
	song: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 10,
		paddingHorizontal: 20
	},
	info: {
		flex: 1,
		gap: 2
	},
	title: {
		fontSize: 16,
		textAlign: 'left'
	},
	artist: {
		fontWeight: '300',
		fontSize: 13,
		textAlign: 'left'
	}
})
