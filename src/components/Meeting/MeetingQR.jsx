import { Card } from "@codegouvfr/react-dsfr/Card";
import { meetingQR } from "../../constants/meeting";

export function MeetingQR() {
	return <>
			<h3 className="text-2xl font-bold fr-pt-3w fr-pb-3w">Questions fréquentes</h3>
			{meetingQR.map((question, index) => {
				return <div className="fr-mb-3v" key={index}>
					<Card
						background
						border
						desc={question.desc}
						enlargeLink
						linkProps={{ href: '#' }}
						size="small"
						title={question.title}
						titleAs="h6"
					/>
				</div>
			})}
        </>
}