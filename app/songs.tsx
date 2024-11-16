import { View, StyleSheet, FlatList, useColorScheme, ActivityIndicator } from 'react-native'
import { SongPreview } from '../components/SongPreview'
import palette from '../constants/palette'
import { StackHeader } from '../components/StackHeader'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useConfigStore } from '../hooks/useConfigStore'

export default function Songs() {
	const getURL = useConfigStore(state => state.getURL)
	const colorScheme = useColorScheme()
	const backgroundColor = colorScheme === 'dark' ? palette.darkBlueGray : palette.white

	const { isPending, error, data, fetchNextPage } = useInfiniteQuery({
		queryKey: ['songList'],
		initialPageParam: 0,
		queryFn: async ({ pageParam }) => {
			try {
				const url = await getURL('search3')
				url.searchParams.set('artistCount', '0')
				url.searchParams.set('albumCount', '0')
				url.searchParams.set('size', '20')
				url.searchParams.set('songOffset', String(pageParam))
				return fetch(url).then(res => res.json())
			} catch (e) {
				console.error(e)
			}
		},
		getNextPageParam: (_, __, lastPageParam) => lastPageParam + 20,
		getPreviousPageParam: (_, __, lastPageParam) => lastPageParam - 20
	})

	if (isPending) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator />
			</View>
		)
	}

	if (error) {
		return <View style={style.container}></View>
	}

	const songs = data.pages.flatMap(page => page['subsonic-response'].searchResult3.song)
	const renderItem = ({ item }) => <SongPreview song={item} onPress={() => alert(item.id)} />

	return (
		<View style={[style.container, { backgroundColor }]}>
			<StackHeader>Songs</StackHeader>
			<FlatList
				contentContainerStyle={[style.songs]}
				data={songs}
				keyExtractor={item => item.id}
				renderItem={renderItem}
				onEndReached={() => fetchNextPage()}
			/>
		</View>
	)
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		gap: 20,
		paddingTop: 20
	},
	songs: {
		gap: 10
	}
})
