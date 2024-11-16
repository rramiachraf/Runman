import { View, StyleSheet, ActivityIndicator, LayoutChangeEvent, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { useConfigStore } from '../../hooks/useConfigStore'
import { useMemo, useState } from 'react'
import { CoverArt } from '../../components/CoverArt'
import { AlbumTracklist } from '../../components/AlbumTracklist'
import { Button } from '../../components/Button'
import { usePlayerStore } from '../../hooks/usePlayerStore'
import { Text } from '../../components/Text'

export default function Album() {
	const { id: albumID } = useLocalSearchParams<{ id: string }>()
	const getURL = useConfigStore(state => state.getURL)
	const [containerWidth, setContainerWidth] = useState(0)
	const visible = useMemo(() => containerWidth > 0, [containerWidth])
	const loadTrack = usePlayerStore(state => state.loadTrack)
	const playTrack = usePlayerStore(state => state.playTrack)

	const { isPending, error, data } = useQuery({
		queryKey: ['getAlbum', albumID],
		async queryFn() {
			const url = await getURL('getAlbum')
			url.searchParams.set('id', albumID)
			return fetch(url).then(res => res.json())
		}
	})

	const onLayout = (e: LayoutChangeEvent) => {
		setContainerWidth(e.nativeEvent.layout.width - 40)
	}

	const playAlbumTrack = async track => {
		await loadTrack(track.id)
		await playTrack()
	}

	if (isPending) {
		return (
			<View style={style.container}>
				<ActivityIndicator />
			</View>
		)
	}

	if (error) {
		return (
			<View style={style.container}>
				<Text variant="primary">ERROR</Text>
			</View>
		)
	}

	const album = data['subsonic-response'].album

	const playAlbum = async () => {
		await loadTrack(album.song[0].id)
		await playTrack()
	}

	return (
		<ScrollView style={style.container} onLayout={onLayout}>
			{visible && (
				<>
					<CoverArt
						id={album.coverArt}
						size={containerWidth}
						style={{ marginHorizontal: 20 }}
					/>
					<View style={style.albumInfo}>
						<Text variant="secondary" style={style.albumArtist}>
							{album.artist}
						</Text>
						<Text variant="primary" style={style.albumTitle}>
							{album.name}
						</Text>
					</View>
					<Button
						icon="play"
						style={{ marginHorizontal: 20, marginBottom: 20 }}
						onPress={playAlbum}
					>
						Play
					</Button>
					<AlbumTracklist tracks={album.song} onTrackPress={playAlbumTrack} />
				</>
			)}
		</ScrollView>
	)
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 10
	},
	albumInfo: {
		marginHorizontal: 20,
		marginVertical: 10
	},
	albumTitle: {
		fontSize: 30,
		fontWeight: '500'
	},
	albumArtist: {
		fontSize: 13
	}
})
