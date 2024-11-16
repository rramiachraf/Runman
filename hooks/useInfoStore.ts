import { createStore } from 'zustand'
import { createBoundedUseStore } from './store'

interface InfoStoreState {
	width: number
	setWidth: (width: number) => void
}

export const infoStore = createStore<InfoStoreState>(set => ({
	width: 0,
	setWidth: (width: number) => set({ width })
}))

export const useInfoStore = createBoundedUseStore(infoStore)
