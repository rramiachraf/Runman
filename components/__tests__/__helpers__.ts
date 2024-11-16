/* istanbul ignore file */
import type { ColorSchemeName } from 'react-native'
import { configStore } from '../../hooks/useConfigStore'
import { infoStore } from '../../hooks/useInfoStore'

export function mockUseColorScheme(theme: ColorSchemeName) {
	jest.spyOn(require('react-native'), 'useColorScheme').mockReturnValue(theme)
}

export function setupGlobalStore() {
	configStore.setState(state => ({
		...state,
		credentials: {
			username: 'johndoe',
			password: '123#',
			address: 'https://music.example.com/'
		}
	}))

	infoStore.setState(state => ({
		...state,
		width: 900
	}))
}
