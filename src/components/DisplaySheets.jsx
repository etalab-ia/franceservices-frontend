import { useSelector } from 'react-redux';
import arrowRight from "../../icons/sheets/arrowRight.svg";

export function	DisplaySheets() {
	const	sheets = useSelector((state) => state.user.sheets);

	return (
		<div>
			{sheets.map((sheet, index) => {
				return <div className="user-feedback-container my-4 p-8 border-2 border-[#DD]" key={index}>
					<h1 className="text-xl font-bold text-[#000091] py-3">{sheet.title}</h1>
					<p>{sheet.introduction}</p>
					<a href={sheet.url} target="_blank">
						<button className="flex justify-end"><img src={arrowRight} alt="Accéder à la page" /></button>
					</a>
				</div>
			})}
		</div>
	);
}