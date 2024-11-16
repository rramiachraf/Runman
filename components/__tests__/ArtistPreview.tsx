import crypto from 'crypto'
import { ArtistPreview } from '../ArtistPreview'
import { render, screen, waitFor } from '@testing-library/react-native'
import { setupGlobalStore } from './__helpers__'

test('ArtistPreview component', () => {
	const artist = {
		name: 'Quincy Jones',
		coverArt: crypto.randomUUID()
	}

	waitFor(() => {
		setupGlobalStore()
		render(<ArtistPreview artist={artist} />)
	})

	screen.getByText(artist.name)
})
