import { View, StyleSheet } from 'react-native'
import { usePlayerStore } from '../hooks/usePlayerStore'
import { AlbumTrack } from './AlbumTrack'
import { FC } from 'react'

interface Track {
	id: string
	artist: string
	title: string
	track: number
	duration: number
	coverArt: string
}

interface Props {
	tracks: Track[]
	onTrackPress?: (track: Track) => void
}

export const AlbumTracklist: FC<Props> = ({ tracks, onTrackPress }) => {
	const currentTrack = usePlayerStore(state => state.currentTrack)

	return (
		<View style={style.container}>
			{tracks.map(track => (
				<AlbumTrack
					key={track.id}
					track={track}
					onPress={onTrackPress && (() => onTrackPress(track))}
					playing={track.id === currentTrack}
				/>
			))}
		</View>
	)
}

const style = StyleSheet.create({
	container: {}
})
