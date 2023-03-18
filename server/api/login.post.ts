import prisma from '../utils/prisma'
import { getPrismaErrorCode, sendError } from '../utils/error'

import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

import userHelper from '../utils/userHelper'

export default async function (req: any, res: any) {
	const { username, password } = req.body

	if (username === undefined || password === undefined) {
		throw sendError(res, {
			code: 400,
			message: 'Username and password are required'
		})
	}

	const user = await prisma.user.findUnique({
		where: {
			username
		}
	})

	if (user === null) {
		throw sendError(res, {
			code: 404,
			message: 'User not found'
		})
	}

	if (!userHelper.comparePassword(password, user.password)) {
		throw sendError(res, {
			code: 403,
			message: 'Invalid password'
		})
	}

	const payload = {
		userId: user.id
	}

	if (process.env.JWT_SECRET === null) {
		throw new Error('No JWT secret defined in .env')
	}

	// Todo: Add config for token duration
	const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
		expiresIn: '7d'
	})

	// Get expiry date
	const expiryDate = new Date()
	expiryDate.setDate(expiryDate.getDate() + 7)

	const session = await prisma.session.create({
		data: {
			token,
			expiryDate,
			userId: user.id
		}
	})

	res.send(session)
}
