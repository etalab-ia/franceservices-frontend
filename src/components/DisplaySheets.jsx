import { useSelector } from 'react-redux';
import { TagSheets } from './TagSheets';
import arrowRight from "../../icons/sheets/arrowRight.svg";
import { getSheetId } from '../utils/setData';

export function	DisplaySheets() {
	const	sheets = useSelector((state) => state.user.sheets);

	return (
		<div>
			{sheets.map((sheet, index) => {
				return <div className="user-feedback-container sheets-container" key={index}>
					<TagSheets sheetId={getSheetId(sheet.url)}/>
					<h1 className="sheet-title">{sheet.title}</h1>
					<p className='py-3'>{sheet.introduction}</p>
					<div className='sheet-url'>
						<a href={sheet.url}><img src={arrowRight} alt="Accéder à la page" /></a>
					</div>
				</div>
			})}
		</div>
	);
}