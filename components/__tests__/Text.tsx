import { render, screen } from '@testing-library/react-native'
import { Text } from '../Text'
import palette from '../../constants/palette'
import { mockUseColorScheme } from './__helpers__'

describe('Text component', () => {
	it('render Text component', () => {
		render(<Text variant="primary">Hello World</Text>)
		screen.getByText('Hello World')
	})

	it('check text color on light theme', () => {
		mockUseColorScheme('light')
		render(<Text variant="primary">Hello World</Text>)
		expect(screen.getByText('Hello World')).toHaveStyle({ color: palette.deepSeaBlue })
	})

	it('check text color on dark theme', () => {
		mockUseColorScheme('dark')
		render(<Text variant="secondary">Hello World</Text>)
		expect(screen.getByText('Hello World')).toHaveStyle({ color: palette.lightGray })
	})
})
