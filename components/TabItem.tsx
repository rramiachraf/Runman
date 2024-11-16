import { FC, useMemo } from 'react'
import { Icon, IconType } from './Icon'
import { Link, usePathname } from 'expo-router'
import { useSharedValue, withSpring } from 'react-native-reanimated'
import { Pressable, StyleSheet, useColorScheme } from 'react-native'
import { Text } from './Text'
import palette from '../constants/palette'

export interface TabItemProps {
	title: string
	to: string
	icon: IconType
}

export const TabItem: FC<TabItemProps> = ({ title, icon, to }) => {
	const pathname = usePathname()
	const highlighted = useMemo(() => pathname === to, [pathname])
	const iconOpacity = useSharedValue(highlighted ? 1 : 0)
	const colorScheme = useColorScheme()

	const iconColor = colorScheme === 'dark' ? palette.lightGray : palette.darkBlueGray

	const onPress = () => {
		if (!highlighted) {
			iconOpacity.value = 0
			iconOpacity.value = withSpring(1)
		}
	}

	return (
		<Link href={to} asChild>
			<Pressable style={styles.container} onPress={onPress}>
				<Icon
					name={icon}
					size={24}
					style={[
						styles.icon,
						{ color: iconColor },
						highlighted && [styles.highlightedIcon]
					]}
				/>
				{highlighted && (
					<Text variant="primary" style={styles.text}>
						{title}
					</Text>
				)}
			</Pressable>
		</Link>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: 2,
		paddingVertical: 12
	},
	text: {
		fontWeight: '500'
	},
	icon: {
		paddingHorizontal: 15,
		paddingVertical: 4,
		color: '#1A2130'
	},
	highlightedIcon: {
		backgroundColor: palette.main,
		borderRadius: 100
	}
})
