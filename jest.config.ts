import type { Config } from 'jest'

export default {
	preset: 'jest-expo',
	setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
	collectCoverage: true,
	coverageReporters: ['html', 'text'],
	testPathIgnorePatterns: ['__helpers__.ts']
} satisfies Config
