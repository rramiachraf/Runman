import { ActivityIndicator, ScrollView, StyleSheet, View, useColorScheme } from 'react-native'
import palette from '../constants/palette'
import { StackHeader } from '../components/StackHeader'
import { InfoCard } from '../components/InfoCard'
import { useMemo } from 'react'
import { useInfoStore } from '../hooks/useInfoStore'
import { Button } from '../components/Button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useConfigStore } from '../hooks/useConfigStore'
import { usePlayerStore } from '../hooks/usePlayerStore'

export default function Index() {
	const colorScheme = useColorScheme()
	const backgroundColor = colorScheme === 'dark' ? palette.darkBlueGray : palette.white
	const containerWidth = useInfoStore(state => state.width)
	const itemWidth = useMemo(() => containerWidth / 2 - 20 - 5, [containerWidth])
	const getURL = useConfigStore(state => state.getURL)
	const loadTrack = usePlayerStore(state => state.loadTrack)
	const playTrack = usePlayerStore(state => state.playTrack)

	const getScanStatus = useQuery({
		queryKey: ['getScanStatus'],
		queryFn: async () => fetch(await getURL('getScanStatus')).then(res => res.json())
	})

	const getGenres = useQuery({
		queryKey: ['getGenres'],
		queryFn: async () => fetch(await getURL('getGenres')).then(res => res.json())
	})

	const playRandomSong = useMutation({
		mutationKey: ['playRandomSong'],
		mutationFn: async () => {
			const url = await getURL('getRandomSongs')
			url.searchParams.set('size', String(1))

			const res = await fetch(url)
			const data = await res.json()

			await loadTrack(data['subsonic-response'].randomSongs.song[0].id)
			await playTrack()
		}
	})

	if (getScanStatus.isPending || getGenres.isPending) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator />
			</View>
		)
	}

	if (getScanStatus.error || getGenres.error) {
		return <View></View>
	}

	const status = getScanStatus.data['subsonic-response'].scanStatus
	const genresCount = getGenres.data['subsonic-response'].genres.genre.length

	return (
		<ScrollView style={[style.container, { backgroundColor }]}>
			<StackHeader>Home</StackHeader>
			<View style={style.cards}>
				<InfoCard
					title="No. songs"
					value={status.count}
					width={itemWidth}
					background="#FFAD60"
					icon="music-note-plus"
				/>
				<InfoCard
					title="No. genres"
					value={genresCount}
					width={itemWidth}
					background="#96CEB4"
					icon="tag"
				/>
			</View>
			<View style={{ marginHorizontal: 20, marginVertical: 10, gap: 5 }}>
				<Button icon="shuffle" onPress={() => playRandomSong.mutate()}>
					Play random song
				</Button>
				{/**<Button icon="refresh" onPress={() => alert('N/A')}>
					Rescan
				</Button>**/}
			</View>
		</ScrollView>
	)
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20
	},
	cards: {
		flexDirection: 'row',
		paddingHorizontal: 20,
		marginVertical: 20,
		gap: 10,
		flexWrap: 'wrap'
	}
})
