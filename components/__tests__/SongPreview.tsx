import { render, screen, userEvent, waitFor } from '@testing-library/react-native'
import crypto from 'crypto'
import { SongPreview } from '../SongPreview'
import { setupGlobalStore } from './__helpers__'

describe('SongPreview component', () => {
	beforeEach(() => {
		setupGlobalStore()
	})

	const song = {
		id: crypto.randomUUID(),
		artist: 'Flo Rida',
		title: 'My House',
		coverArt: crypto.randomUUID(),
		duration: 193
	}

	it('render SongPreview component', () => {
		waitFor(() => {
			render(<SongPreview song={song} />)
		})

		screen.getByText('My House')
	})

	it('handle onPress events', async () => {
		jest.useFakeTimers()

		const onPress = jest.fn()

		waitFor(() => {
			render(<SongPreview song={song} onPress={onPress} />)
		})

		const { press } = userEvent.setup()
		await press(screen.getByText('My House'))

		expect(onPress).toHaveBeenCalled()
	})
})
