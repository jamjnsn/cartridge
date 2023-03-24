import { sendError } from "../utils/error"

export default async function (req: any, res: any, next: any) {
	if(req.session === undefined || !req.session.user.isAdmin) {
		return sendError(res, {
			code: 403,
			message: "User not authorized"
		})
	}

	next()
}
