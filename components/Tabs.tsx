import { StyleSheet, useColorScheme, Keyboard } from 'react-native'
import { usePathname } from 'expo-router'
import { setBackgroundColorAsync } from 'expo-navigation-bar'
import { useEffect, useState } from 'react'
import Animated from 'react-native-reanimated'
import palette from '../constants/palette'
import { TabItem, TabItemProps } from './TabItem'

export function Tabs() {
	//const height = useSharedValue('0%')
	const [visible, setVisible] = useState(true)
	const colorScheme = useColorScheme()
	const backgroundColor = colorScheme === 'dark' ? palette.deepSeaBlue : palette.lightGray
	const pathname = usePathname()

	const tabs: TabItemProps[] = [
		{ title: 'Home', icon: 'home', to: '/' },
		{ title: 'Songs', icon: 'music-note', to: '/songs' },
		{ title: 'Albums', icon: 'disc', to: '/albums' },
		{ title: 'Artists', icon: 'account-music', to: '/artists' },
		{ title: 'Settings', icon: 'settings', to: '/settings' }
	]

	useEffect(() => {
		Keyboard.addListener('keyboardDidShow', () => setVisible(false))

		Keyboard.addListener('keyboardDidHide', () => {
			setVisible(true)
		})
	}, [])

	useEffect(() => {
		switch (colorScheme) {
			case 'light':
				setBackgroundColorAsync(palette.lightGray)
				break
			case 'dark':
				setBackgroundColorAsync(palette.deepSeaBlue)
		}
	}, [pathname, colorScheme])

	if (!visible) {
		return <></>
	}

	return (
		<Animated.View style={[styles.container, { backgroundColor }]}>
			{tabs.map(item => (
				<TabItem key={item.to} title={item.title} icon={item.icon} to={item.to} />
			))}
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '10%',
		paddingHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15
	}
})
