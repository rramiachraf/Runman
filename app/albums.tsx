import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { StackHeader } from '../components/StackHeader'
import { AlbumPreview } from '../components/AlbumPreview'
import { useConfigStore } from '../hooks/useConfigStore'
import { useCallback, useMemo } from 'react'
import { useInfoStore } from '../hooks/useInfoStore'

export default function Albums() {
	const getURL = useConfigStore(state => state.getURL)
	const containerWidth = useInfoStore(state => state.width)
	const itemWidth = useMemo(() => containerWidth / 2 - 20 - 5, [containerWidth])
	const router = useRouter()

	const navigate = (albumID: string) => {
		router.navigate(`/album/${albumID}`)
	}

	const renderItem = useCallback(
		({ item }) => <AlbumPreview onPress={() => navigate(item.id)} album={item} size={itemWidth} />,
		[]
	)

	const { isPending, error, data, fetchNextPage } = useInfiniteQuery({
		queryKey: ['getAlbumList'],
		initialPageParam: 0,
		queryFn: async ({ pageParam }) => {
			try {
				const url = await getURL('getAlbumList')
				url.searchParams.set('type', 'alphabeticalByName')
				url.searchParams.set('size', '20')
				url.searchParams.set('offset', String(pageParam))
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

	const albums = data.pages.flatMap(page => page['subsonic-response'].albumList.album)

	return (
		<View style={style.container}>
			<>
				<StackHeader>Albums</StackHeader>
				<FlatList
					data={albums}
					keyExtractor={item => item.id}
					contentContainerStyle={style.albumsContainer}
					columnWrapperStyle={style.albumsWrapper}
					horizontal={false}
					numColumns={2}
					renderItem={renderItem}
					onEndReached={() => fetchNextPage()}
				/>
			</>
		</View>
	)
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		gap: 20,
		paddingTop: 20
	},
	albumsContainer: {
		paddingHorizontal: 20,
		gap: 10
	},
	albumsWrapper: {
		justifyContent: 'space-between',
		gap: 10
	}
})
