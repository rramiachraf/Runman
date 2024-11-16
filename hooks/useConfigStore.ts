import { createStore } from 'zustand'
import { generateURL, SubsonicMethod } from '../utils/subsonic'
import { createBoundedUseStore } from './store'

export interface ConfigState {
	configured: boolean | null
	credentials: {
		username: string
		password: string
		address: string
	}
	getURL: (method: SubsonicMethod) => Promise<URL>
	updateConfiguredStatus(newState: boolean): void
	updateCredentials(username: string, password: string, address: string): void
}

export const configStore = createStore<ConfigState>((set, get) => ({
	configured: null,
	credentials: {
		username: '',
		password: '',
		address: ''
	},
	async getURL(method: SubsonicMethod) {
		const { username, password, address } = get().credentials
		const url = await generateURL(username, password, address, method)

		return url
	},
	updateConfiguredStatus: (newState: boolean) => set({ configured: newState }),
	updateCredentials: (username: string, password: string, address: string) => {
		set({ credentials: { username, password, address } })
	}
}))

export const useConfigStore = createBoundedUseStore(configStore)
