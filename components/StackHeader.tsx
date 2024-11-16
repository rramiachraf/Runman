import { StyleSheet } from 'react-native'
import { Text } from './Text'

export function StackHeader({ children }: { children: string }) {
	return (
		<Text variant="secondary" style={style.title}>
			{children}
		</Text>
	)
}

const style = StyleSheet.create({
	title: {
		fontWeight: '700',
		fontSize: 25,
		paddingLeft: 20
	}
})
