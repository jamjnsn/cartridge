import axios from 'axios'

declare type IgdbEndpoint = 'platforms' | 'games'

const igdbUrl = 'https://api.igdb.com/v4'

export const useIgdb = async ({ endpoint, body }: { endpoint: IgdbEndpoint; body?: string[] }) => {
	const config = useRuntimeConfig()

	const headers = {
		Authorization: `Bearer ${config.twitchAccessToken}`,
		'Client-ID': config.twitchClientId
	}

	// Prepare raw body string
	const bodyString = body !== undefined && body.length > 0 ? body.join('; ') + ';' : ''

	const results = await axios
		.post(`${igdbUrl}/${endpoint}`, bodyString, {
			headers
		})
		.then((res) => res.data)

	return results
}
