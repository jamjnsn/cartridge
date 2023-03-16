import { Prisma } from '@prisma/client'

export type ApiError = {
	code?: number
	message?: string
}

export const HttpStatuses: any = {
	200: 'OK',
	201: 'Created',
	202: 'Accepted',
	203: 'Non-Authoritative Information',
	204: 'No Content',
	205: 'Reset Content',
	206: 'Partial Content',
	300: 'Multiple Choices',
	301: 'Moved Permanently',
	302: 'Found',
	303: 'See Other',
	304: 'Not Modified',
	305: 'Use Proxy',
	306: 'Unused',
	307: 'Temporary Redirect',
	400: 'Bad Request',
	401: 'Unauthorized',
	402: 'Payment Required',
	403: 'Forbidden',
	404: 'Not Found',
	405: 'Method Not Allowed',
	406: 'Not Acceptable',
	407: 'Proxy Authentication Required',
	408: 'Request Timeout',
	409: 'Conflict',
	410: 'Gone',
	411: 'Length Required',
	412: 'Precondition Required',
	413: 'Request Entry Too Large',
	414: 'Request-URI Too Long',
	415: 'Unsupported Media Type',
	416: 'Requested Range Not Satisfiable',
	417: 'Expectation Failed',
	418: "I'm a teapot",
	429: 'Too Many Requests',
	500: 'Internal Server Error',
	501: 'Not Implemented',
	502: 'Bad Gateway',
	503: 'Service Unavailable',
	504: 'Gateway Timeout',
	505: 'HTTP Version Not Supported'
}

// Todo: Find a way to globally intercept errors and provide error pages
//		 Probably not wrapping everything in a try/catch
export function sendError(res: any, error: ApiError) {
	const data: {
		code?: number
		status?: string
		message?: string
	} = {}

	if (error.code === undefined || !(error.code in HttpStatuses)) {
		error.code = 500
	}

	data.code = error.code
	data.status = HttpStatuses[error.code]

	if (error.message) data.message = error.message

	res.status(data.code).send(data)
}

export function getPrismaErrorCode(error: any): string | null {
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		return error.code
	} else {
		return null
	}
}
