export default defineEventHandler(async (event) => {
	// Return authorized user determined by auth middleware
	return event.context.auth.user
})
