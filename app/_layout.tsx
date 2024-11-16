import { Slot, Redirect } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SecureStore from 'expo-secure-store'
import { LayoutChangeEvent, useColorScheme } from 'react-native'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SplashScreen from 'expo-splash-screen'
import { Tabs } from '../components/Tabs'
import palette from '../constants/palette'
import { useConfigStore } from '../hooks/useConfigStore'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useInfoStore } from '../hooks/useInfoStore'

SplashScreen.preventAutoHideAsync()

const client = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity
		}
	}
})

export default function Layout() {
	const currentTheme = useColorScheme()
	const configured = useConfigStore(state => state.configured)
	const updateConfiguredStatus = useConfigStore(state => state.updateConfiguredStatus)
	const updateCredentials = useConfigStore(state => state.updateCredentials)
	const setContainerWidth = useInfoStore(state => state.setWidth)

	const statusBG = currentTheme === 'dark' ? palette.deepSeaBlue : palette.white
	const mainBG = currentTheme === 'dark' ? palette.darkBlueGray : palette.white

	const onLayout = (e: LayoutChangeEvent) => {
		setContainerWidth(e.nativeEvent.layout.width)
	}

	useEffect(() => {
		if (configured !== null) {
			SplashScreen.hideAsync()
		}
	}, [configured])

	useEffect(() => {
		AsyncStorage.getItem('configured')
			.then(async configured => {
				switch (configured) {
					case '1':
						const client = await SecureStore.getItemAsync('servers')
						if (client) {
							const data = JSON.parse(client)
							updateCredentials(data.username, data.password, data.address)
							updateConfiguredStatus(true)
						}
						break
					case null:
						updateConfiguredStatus(false)
				}
			})
			.catch(e => {
				// TODO handle errros
				console.log(e)
			})
	}, [])

	if (configured === false) {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: mainBG }}>
				<QueryClientProvider client={client}>
					<Slot />
					<Redirect href="/setup" />
					<StatusBar
						backgroundColor={statusBG}
						style={currentTheme === 'dark' ? 'light' : 'dark'}
					/>
				</QueryClientProvider>
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: mainBG }} onLayout={onLayout}>
			<QueryClientProvider client={client}>
				<Slot />
				<Tabs />
				<StatusBar
					backgroundColor={statusBG}
					style={currentTheme === 'dark' ? 'light' : 'dark'}
				/>
			</QueryClientProvider>
		</SafeAreaView>
	)
}
