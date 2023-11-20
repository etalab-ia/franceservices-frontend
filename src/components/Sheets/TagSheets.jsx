export function	TagSheets({ sheet, sheetId }) {
	const	themesArray = sheet.theme.split(', ');
	const	uniqueThemesSet = new Set(themesArray);
	const	uniqueThemesArray = Array.from(uniqueThemesSet);
	const	tags = [ sheet.surtitre, ...uniqueThemesArray, sheetId ];

	return (
		<div className="wrap-message mb-4">
				{tags.map((tag, index) => {
					return <div className="sheets-tags" key={index}>
						{tag}
					</div>
				})}
		</div>
	);
}