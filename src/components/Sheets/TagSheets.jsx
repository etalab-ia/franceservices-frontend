export function	TagSheets(props) {

	const	{ sheetId } = props;
	const	tags = ['Allocations destinées aux familles', 'Particulier', sheetId];

	return (
		<div className="flex flex-wrap">
			{tags.map((tag, index) => {
				return <div className="bg-light-grey px-2 m-1 rounded-[90px]" key={index}>
					{tag}
				</div>
			})}
		</div>
	);
}