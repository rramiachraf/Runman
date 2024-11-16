export function formatSeconds(seconds: number) {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = seconds - minutes * 60

	const ss = remainingSeconds >= 0 && remainingSeconds <= 9 ? '0' + remainingSeconds : remainingSeconds
	const mm = minutes >= 0 && minutes <= 9 ? '0' + minutes : minutes

	return `${mm}:${ss}`
}
