import { Pressable, View, StyleSheet } from 'react-native'
import { Text } from './Text'
import { formatSeconds } from '../utils/formatSeconds'
import type { FC } from 'react'
import palette from '../constants/palette'

interface Props {
	track: {
		id: string
		artist: string
		title: string
		track: number
		duration: number
		coverArt: string
	}
	playing?: boolean
	onPress?: () => void
}

export const AlbumTrack: FC<Props> = ({ track, onPress, playing }) => {
	return (
		<Pressable
			onPress={onPress}
			style={[
				style.track,
				{ borderBottomColor: palette.deepSeaBlue, borderBottomWidth: 1 },
				playing && { backgroundColor: palette.lightGray }
			]}
		>
			{track.track && (
				<Text variant="secondary" style={style.trackID}>
					{track.track}
				</Text>
			)}
			<View style={style.trackInfo}>
				<Text variant="primary" style={style.title} numberOfLines={1}>
					{track.title}
				</Text>
				<Text variant="secondary" style={style.artist} numberOfLines={1}>
					{track.artist}
				</Text>
			</View>
			<Text variant="secondary">{formatSeconds(track.duration)}</Text>
		</Pressable>
	)
}

const style = StyleSheet.create({
	track: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 10,
		paddingHorizontal: 20
	},
	trackID: {
		width: 20
	},
	trackInfo: {
		flex: 1
	},
	title: {
		fontWeight: '500',
		fontSize: 15
	},
	artist: {
		fontSize: 12
	}
})
