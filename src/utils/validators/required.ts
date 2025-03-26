export const required =
	(message = 'This field is required') =>
	(value: any) =>
		!!value ? null : message
