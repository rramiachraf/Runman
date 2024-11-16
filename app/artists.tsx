import { useQuery } from '@tanstack/react-query'
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import { useConfigStore } from '../hooks/useConfigStore'
import { ArtistPreview } from '../components/ArtistPreview'
import { StackHeader } from '../components/StackHeader'
import { Link } from 'expo-router'

export default function Artists() {
	const getURL = useConfigStore(state => state.getURL)

	const { isPending, error, data } = useQuery({
		queryKey: ['getArtists'],
		queryFn: async () => fetch(await getURL('getArtists')).then(res => res.json())
	})

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
				<Text>ERROR</Text>
			</View>
		)
	}

	const artists = data['subsonic-response'].artists.index.flatMap(i => i.artist)

	return (
		<View style={style.container}>
			<StackHeader>Artists</StackHeader>
			<FlatList
				data={artists}
				keyExtractor={item => item.id}
				numColumns={2}
				horizontal={false}
				contentContainerStyle={style.list}
				columnWrapperStyle={style.column}
				renderItem={({ item }) => (
					<Link href={`/artist/${item.id}`}>
						<ArtistPreview artist={item} />
					</Link>
				)}
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
	list: {
		paddingHorizontal: 20,
		gap: 10
	},
	column: {
		gap: 10
	}
})
