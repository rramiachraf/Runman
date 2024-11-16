import { getRandomBytesAsync, digestStringAsync, CryptoDigestAlgorithm } from 'expo-crypto'

const format = 'json'
const protocolVersion = '1.16.1'
const identifier = 'Groover'

export type SubsonicMethod =
	| 'getAlbumList'
	| 'getAlbumList2'
	| 'getCoverArt'
	| 'getAlbum'
	| 'stream'
	| 'search3'
	| 'getScanStatus'
	| 'getGenres'
	| 'getRandomSongs'
	| 'getArtists'
	| 'getArtist'

export async function generateURL(username: string, password: string, address: string, method: SubsonicMethod) {
	const salt = (await getRandomBytesAsync(32)).join('')
	const token = await digestStringAsync(CryptoDigestAlgorithm.MD5, password + salt)

	const url = new URL(address)
	url.pathname = stripURL(url.pathname) + `/rest/${method}`

	url.searchParams.set('u', username)
	url.searchParams.set('t', token)
	url.searchParams.set('s', salt)
	url.searchParams.set('c', identifier)
	url.searchParams.set('f', format)
	url.searchParams.set('v', protocolVersion)

	return url
}

function stripURL(url: string) {
	return url[url.length - 1] === '/' ? url.slice(0, -1) : url
}
