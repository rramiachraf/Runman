import { GestureResponderEvent, Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'
import { Icon, IconType } from './Icon'
import palette from '../constants/palette'
import { FC } from 'react'
import { darken } from 'polished'

interface ButtonProps {
	icon?: IconType
	children: string
	style?: StyleProp<ViewStyle>
	onPress?: (e: GestureResponderEvent) => void
}

export const Button: FC<ButtonProps> = ({ icon, children, style: customStyle, onPress }) => {
	return (
		<Pressable role="button" style={[style.button, customStyle]} onPress={onPress}>
			{icon && <Icon name={icon} size={25} style={{ color: palette.deepSeaBlue }} />}
			<Text style={style.text}>{children}</Text>
		</Pressable>
	)
}

const style = StyleSheet.create({
	button: {
		flexDirection: 'row',
		gap: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: palette.main,
		paddingVertical: 12,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: darken(0.1, palette.main)
	},
	text: {
		fontWeight: '500',
		fontSize: 15,
		color: palette.deepSeaBlue
	}
})
