import express from 'express'
import bodyParser from 'body-parser'

const makeApp = async () => {
	const app = express()

	// Use body parser
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())
	app.use(bodyParser.raw())

	return app
}

makeApp().then((app) => {
	app.listen(3000, () => console.log('Server is listening on port 3000...'))
})
