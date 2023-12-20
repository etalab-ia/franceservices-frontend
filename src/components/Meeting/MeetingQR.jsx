import { Card } from "@codegouvfr/react-dsfr/Card";
import { Tag } from "@codegouvfr/react-dsfr/Tag";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { meetingQRTitle } from "../../constants/meeting";
import { GlobalSecondaryTitle } from "../Global/GlobalSecondaryTitle";

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
				const	object = updatedQuestions.some(obj => {
					return obj.sid === qr.sid;
				});

				if (!object)
					updatedQuestions = [...updatedQuestions, { question: qr.question, sid: qr.sid, url: qr.url }];
			});
		});
		setRelatedQuestions(updatedQuestions);
	}, [sheets]);
	
	
	return <>
			{relatedQuestions.length !== 0 && <GlobalSecondaryTitle extraClass='fr-pt-3w fr-pb-3w'>{meetingQRTitle}</GlobalSecondaryTitle> }
			{relatedQuestions.map((rq, index) => {
				return <div className="fr-mb-3v" key={index}>
					<Card
						background
						border
						end={<Tag>{rq.sid}</Tag>}
						enlargeLink
						linkProps={{ href: rq.url }}
						size="small"
						title={rq.question}
						titleAs="h6"
					/>
				</div>
			})}
        </>
}