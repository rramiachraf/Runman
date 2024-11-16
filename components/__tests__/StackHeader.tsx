import { render, screen } from '@testing-library/react-native'
import { StackHeader } from '../StackHeader'

test('StackHeader component', () => {
	render(<StackHeader>Home</StackHeader>)
	expect(screen.getByText('Home')).toHaveStyle({ fontWeight: '700', fontSize: 25 })
})
