import { render, waitFor, screen, userEvent } from '@testing-library/react-native'
import { AlbumPreview } from '../AlbumPreview'
import crypto from 'crypto'
import { setupGlobalStore } from './__helpers__'

describe('AlbumPreview component', () => {
	beforeEach(() => {
		setupGlobalStore()
	})

	const album = {
		id: crypto.randomUUID(),
		artist: 'Quincy Jones',
		title: 'Greatest Hits',
		coverArt: crypto.randomUUID()
	}

	const width = 200

	it('render component correctly', () => {
		waitFor(() => {
			render(<AlbumPreview size={width} album={album} />)
		})

		expect(screen.getByRole('link')).toHaveStyle({ width })
	})

	it('handle onPress event', async () => {
		jest.useFakeTimers()

		const onPress = jest.fn()
		const { press } = userEvent.setup()

		waitFor(() => {
			render(<AlbumPreview size={width} album={album} onPress={onPress} />)
		})

		await press(screen.getByText(album.artist))

		expect(onPress).toHaveBeenCalled()
	})
})
