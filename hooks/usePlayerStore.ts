import { createStore } from 'zustand'
import { Audio } from 'expo-av'
import { configStore } from './useConfigStore'
import { createBoundedUseStore } from './store'

const sound = new Audio.Sound()

interface PlayerStore {
	playing: boolean
	currentTrack: string
	loadTrack: (url: string) => Promise<void>
	playTrack: () => Promise<void>
	pauseTrack: () => Promise<void>
}

export const playerStore = createStore<PlayerStore>(set => ({
	playing: false,
	currentTrack: '',
	async loadTrack(songID: string) {
		const { getURL } = configStore.getState()
		const url = await getURL('stream')
		url.searchParams.set('id', songID)

		set({ currentTrack: songID })

		const status = await sound.getStatusAsync()
		if (status.isLoaded) {
			await sound.unloadAsync()
		}

		await sound.loadAsync({ uri: url.toString() })
		set({ playing: false })
	},
	async playTrack() {
		await sound.playAsync()
		set({ playing: true })
	},
	async pauseTrack() {
		await sound.pauseAsync()
		set({ playing: false })
	}
}))

export const usePlayerStore = createBoundedUseStore(playerStore)
