import { render, screen, userEvent } from '@testing-library/react-native'
import { Button } from '../Button'

describe('Button component', () => {
	it('render Button component', () => {
		render(<Button>Press</Button>)
		expect(screen.getByRole('button')).toHaveTextContent('Press')
	})

	it('check button on press event', async () => {
		jest.useFakeTimers()

		const onPress = jest.fn()
		render(<Button onPress={onPress}>Press</Button>)

		const { press } = userEvent.setup()
		await press(screen.getByRole('button'))

		expect(onPress).toHaveBeenCalled()
	})
})
