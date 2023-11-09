import { useSelector } from 'react-redux';
import { TagSheets } from './TagSheets';
import arrowRight from "../../../icons/sheets/arrowRight.svg";
import { getSheetId } from '../../utils/setData';
import { OpenUrlInNewTab } from '../../utils/manageEffects';

export function	DisplaySheets() {
	const	sheets = useSelector((state) => state.user.sheets);

	return (
		<div>
			{sheets.map((sheet, index) => {
				return <div className="sheets-container" key={index}>
					<TagSheets sheetId={getSheetId(sheet.url)}/>
					<h1 className="sheet-title">{sheet.title}</h1>
					<p className='py-3'>{sheet.introduction}</p>
					<div className='sheet-url'>
						<a onClick={() => OpenUrlInNewTab(sheet.url)}>
							<img className='hover:cursor-pointer' src={arrowRight} alt="Accéder à la page"/>
						</a>
					</div>
				</div>
			})}
		</div>
	);
}