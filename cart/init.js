const fetchPlatforms = require('./fetchPlatforms')

const init = async () => {
	console.log('Initializing Cartridge')

	// ToDo: Seed database

	// ToDo: Generate JWT secret

	// Fetch all platforms from IGDB and store in database
	await fetchPlatforms()
}

module.exports = init
