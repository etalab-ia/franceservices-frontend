import { useSelector } from 'react-redux';
import { TagSheets } from './TagSheets';
import arrowRight from "../../../icons/sheets/arrowRight.svg";
import { getSheetId } from '../../utils/setData';
import { OpenUrlInNewTab } from '../../utils/manageEffects';
import { accordionLabel, sheetsImgDescription } from '../../constants/sheets';

export function	DisplaySheets() {
	const	sheets = useSelector((state) => state.user.sheets);

	return (
		<>
			{sheets.length ?
				<div className='mt-5 w-[700px] pr-6 pt-2 max-h-[610px] overflow-y-auto overflow-x-hidden'>
						<p>{accordionLabel}</p>
						{sheets.map((sheet, index) => {
							return <div className="sheets-container" key={index}>
								<TagSheets sheet={sheet} sheetId={getSheetId(sheet.url)}/>
								<h1 className="sheet-title">{sheet.title}</h1>
								<p className='py-3'>{sheet.introduction}</p>
								<div className='sheet-url'>
									<a onClick={() => OpenUrlInNewTab(sheet.url)}>
										<img className='hover:cursor-pointer' src={arrowRight} alt={sheetsImgDescription}/>
									</a>
								</div>
							</div>
						})}
				</div>
				:
				<></>
			}
		</>
		
	);
}