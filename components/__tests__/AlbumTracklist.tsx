import { render, screen, userEvent } from '@testing-library/react-native'
import crypto from 'crypto'
import { AlbumTracklist } from '../AlbumTracklist'

describe('AlbumTracklist component', () => {
	const tracks = [
		{
			id: crypto.randomUUID(),
			artist: 'Queen',
			title: 'The Show Must Go On',
			track: 16,
			duration: 263,
			coverArt: crypto.randomUUID()
		}
	]

	it('render AlbumTracklist component', () => {
		render(<AlbumTracklist tracks={tracks} />)
		screen.getByText('Queen')
	})

	it('handle onTrackPress event', async () => {
		jest.useFakeTimers()

		const onTrackPress = jest.fn()
		render(<AlbumTracklist tracks={tracks} onTrackPress={onTrackPress} />)

		const { press } = userEvent.setup()
		await press(screen.getByText('Queen'))

		expect(onTrackPress).toHaveBeenCalledWith(tracks[0])
	})
})
