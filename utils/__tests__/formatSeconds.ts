import { formatSeconds } from '../formatSeconds'

test('properly covert seconds into a human readable mm:ss format', () => {
	expect(formatSeconds(337)).toBe('05:37')
})
