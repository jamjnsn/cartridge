import { sendError } from '../utils/error'
import userHelper from '../utils/userHelper'

export default async function (req: any, res: any) {
	const session = req.session

	if(req.session === undefined) {
		return sendError(res, {
			code: 403,
			message: "User not authorized"
		})
	}

	res.send(userHelper.serialize(session.user))
}

export const middleware = ["requireAuth"]