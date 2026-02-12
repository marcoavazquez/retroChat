export const sanitizeHTML = (html: string): string => {
	return html
		.replace(/<br\s*\/?>/gi, "\n")
		.replace(/<\/p>/gi, "\n")
		.replace(/<\/div>/gi, "\n")
		.replace(/<[^>]+>/g, "");
}
