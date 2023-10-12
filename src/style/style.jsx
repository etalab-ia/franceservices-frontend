export const	styleButton = (needle, haystack) => ({
	backgroundColor: needle === haystack || (Array.isArray(haystack) && haystack.includes(needle)) ? "#6A6AF4" : "white",
	color: "#6A6AF4",
	borderStyle: "solid"
})

export const	styleParagraph = (needle, haystack) => ({
	color: haystack.includes(needle) ? "white" : "#6A6AF4"
})