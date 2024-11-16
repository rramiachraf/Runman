import { StyleSheet, Text, Pressable } from 'react-native'
import numbro from 'numbro'
import { darken } from 'polished'
import { Icon, IconType } from './Icon'
import palette from '../constants/palette'
import type { FC } from 'react'

interface Props {
	title: string
	value: number
	width: number
	icon?: IconType
	background: string
	foreground?: string
}

export const InfoCard: FC<Props> = ({ title, value, width, background, foreground, icon }) => {
	return (
		<Pressable
			role="listitem"
			style={[
				style.container,
				{ width, backgroundColor: background, borderColor: darken(0.1, background) }
			]}
		>
			<Text style={[style.title, { color: foreground }]}>{title}</Text>
			<Text style={[style.value, { color: foreground }]}>
				{numbro(value).format({
					thousandSeparated: true,
					mantissa: value > 10000 ? 2 : 0,
					average: value > 10000 ? true : false
				})}
			</Text>
			{icon && <Icon style={style.icon} name={icon} size={150} />}
		</Pressable>
	)
}

const style = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 15,
		height: 100,
		padding: 10,
		justifyContent: 'space-between',
		shadowColor: 'yellow',
		shadowOffset: { height: 100, width: 100 },
		position: 'relative',
		overflow: 'hidden'
	},
	title: {
		fontWeight: '300',
		fontSize: 11,
		textTransform: 'uppercase',
		color: palette.deepSeaBlue
	},
	value: {
		fontSize: 35,
		fontWeight: '600'
	},
	icon: {
		position: 'absolute',
		opacity: 0.05,
		right: -60,
		bottom: -50
	}
})
