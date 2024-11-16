import { render, screen, userEvent } from '@testing-library/react-native'
import crypto from 'crypto'
import { AlbumTrack } from '../AlbumTrack'

describe('AlbumTrack component', () => {
	const track = {
		id: crypto.randomUUID(),
		artist: 'Quincy Jones',
		title: 'The Dude',
		track: 2,
		duration: 337,
		coverArt: crypto.randomUUID()
	}

	it('render AlbumTrack component', () => {
		render(<AlbumTrack track={track} />)
		expect(screen.getByText('The Dude')).toBeOnTheScreen()
	})

	it('handle onPress events', async () => {
		jest.useFakeTimers()

		const onPress = jest.fn()

		render(<AlbumTrack onPress={onPress} track={track} />)

		const { press } = userEvent.setup()
		await press(screen.getByText('The Dude'))

		expect(onPress).toHaveBeenCalled()
	})

	// TODO test if playing prop is truthy
})
