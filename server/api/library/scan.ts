import { spawn } from 'node:child_process'

export default async function (req: any, res: any) {
	const scan = spawn('node', ['cart.js'])
	scan.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`)
	})

	scan.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`)
	})

	scan.on('close', (code) => {
		console.log(`child process exited with code ${code}`)
		res.send('Done scanning')
	})
}

export const middleware = ['requireAuth']
