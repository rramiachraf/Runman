import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { StyleProp, Text, TextStyle } from 'react-native'

export type IconType = keyof typeof MaterialCommunityIcons.glyphMap | keyof typeof MaterialIcons.glyphMap

interface IconProps {
	name: IconType
	style?: StyleProp<StyleProp<TextStyle>>
	size: number
}

export function Icon({ name, size, style }: IconProps) {
	const testID = 'icon-' + name

	if (MaterialCommunityIcons.glyphMap[name]) {
		return <MaterialCommunityIcons testID={testID} name={name} size={size} style={style} />
	}

	if (MaterialIcons.glyphMap[name]) {
		return <MaterialIcons testID={testID} name={name} size={size} style={style} />
	}

	return <Text>NO ICONS</Text>
}
