import { MeiliSearch } from 'meilisearch'

export function useMeiliSearch() {
	// ToDo: Add .env config for MeiliSearch host
	return new MeiliSearch({ host: 'http://localhost:7700' })
}
