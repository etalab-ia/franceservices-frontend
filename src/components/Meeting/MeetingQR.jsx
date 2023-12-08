import { Card } from "@codegouvfr/react-dsfr/Card";
import { Tag } from "@codegouvfr/react-dsfr/Tag";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { spSheetsUrl } from "../../constants/sheets";
import { meetingQRTitle } from "../../constants/meeting";

export function MeetingQR({ archive }) {
	const	sheets = archive ? archive.sheets : useSelector((state) => state.user.sheets);
	const	[relatedQuestions, setRelatedQuestions] = useState([]);

	useEffect(() => {
		if (!sheets)
			return ;

		let	updatedQuestions = [];
		setRelatedQuestions([]);

		sheets.forEach((sheet) => {
			sheet.related_questions && sheet.related_questions.forEach((qr) => {
				// Navigate to new url if !qr.sid ?
				updatedQuestions = [...updatedQuestions, {title: qr.question, url: qr.sid ? spSheetsUrl + qr.sid : '', id: qr.sid}];
			});
		});
		setRelatedQuestions(updatedQuestions);
	}, [sheets]);
	
	
	return <>
			{meetingQRTitle}
			{relatedQuestions.map((question, index) => {
				return <div className="fr-mb-3v" key={index}>
					<Card
						background
						border
						end={<Tag>{question.id}</Tag>}
						enlargeLink
						linkProps={{ href: question.url }}
						size="small"
						title={question.title}
						titleAs="h6"
					/>
				</div>
			})}
        </>
}