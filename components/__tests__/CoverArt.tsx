import { render, screen, waitFor } from '@testing-library/react-native'
import crypto from 'crypto'
import { CoverArt } from '../CoverArt'
import { setupGlobalStore } from './__helpers__'

test('CoverArt component', async () => {
	await waitFor(() => {
		setupGlobalStore()
		render(<CoverArt size={150} id={crypto.randomUUID()} />)
	})

	expect(screen.getByRole('img')).toBeOnTheScreen()
})
