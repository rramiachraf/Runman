import { useQuery } from '@tanstack/react-query'
import { View, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useConfigStore } from '../../hooks/useConfigStore'
import { Text } from '../../components/Text'
import { CoverArt } from '../../components/CoverArt'

export default function Artist() {
	const { id: artistID } = useLocalSearchParams<{ id: string }>()
	const getURL = useConfigStore(state => state.getURL)

	const { isPending, error, data } = useQuery({
		queryKey: ['getArtist', artistID],
		queryFn: async () => {
			const url = await getURL('getArtist')
			url.searchParams.set('id', artistID)
			return fetch(url).then(res => res.json())
		}
	})

	if (isPending) {
		return <View></View>
	}

	if (error) {
		return <View></View>
	}

	const artist = data['subsonic-response'].artist

	return (
		<View style={style.container}>
			<CoverArt size={200} id={artist.coverArt} borderRadius={1000} />
			<Text variant="primary">{artist.name}</Text>
		</View>
	)
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 15
	}
})
