import { FC } from 'react'
import { Text as BaseText, StyleProp, TextStyle, useColorScheme } from 'react-native'
import palette from '../constants/palette'

interface Props {
	children: string | number
	variant: 'primary' | 'secondary'
	style?: StyleProp<TextStyle>
	numberOfLines?: number
}

export const Text: FC<Props> = ({ children, style, variant, numberOfLines }) => {
	const colorScheme = useColorScheme()

	const primaryColor = colorScheme === 'dark' ? palette.white : palette.deepSeaBlue
	const secondaryColor = colorScheme === 'dark' ? palette.lightGray : palette.darkBlueGray

	return (
		<BaseText
			numberOfLines={numberOfLines}
			style={[{ color: variant === 'primary' ? primaryColor : secondaryColor }, style]}
		>
			{children}
		</BaseText>
	)
}
