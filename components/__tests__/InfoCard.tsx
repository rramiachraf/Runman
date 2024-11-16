import { render, screen } from '@testing-library/react-native'
import { InfoCard } from '../InfoCard'

describe('InfoCard component', () => {
	const title = 'NO. Tests'
	const value = 1200
	const width = 200
	const backgroundColor = '#86AB89'

	it('render InfoCard component', () => {
		render(<InfoCard title={title} value={value} background={backgroundColor} width={width} />)
		screen.getByText(title)
	})

	it('check appropriate styling', () => {
		render(<InfoCard title={title} value={value} background={backgroundColor} width={width} />)
		expect(screen.getByRole('listitem')).toHaveStyle({ width, backgroundColor })
	})

	it('check numbers presentations', () => {
		render(<InfoCard title={title} value={value} background={backgroundColor} width={width} />)
		screen.getByText('1,200')
	})
})
