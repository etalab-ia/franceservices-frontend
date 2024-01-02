import { Accordion } from "@codegouvfr/react-dsfr/Accordion";
import { Pagination } from "@codegouvfr/react-dsfr/Pagination";
import { DisplayChunks } from "./DisplayChunks";
import { useState } from "react";

export const ResponseExplanation = ({ chunks }) => {
  const	chunksPerPage = 2;
  const	[currentPage, setCurrentPage] = useState(1);

	const	getPageLinkProps = (pageNumber) => {
		const linkProps = {
			href: `#page-${pageNumber}`,
			title: `Page ${pageNumber}`,
			onClick: () => {
				setCurrentPage(pageNumber);
			},
		};

		return linkProps;
	};

  const	startIndex = (currentPage - 1) * chunksPerPage;
  const	endIndex = startIndex + chunksPerPage;

  return (
    <div>
		{chunks && <>
			<Accordion
				className="fr-mt-3v"
				label="Quelles sont les sources utilisées pour générer cette réponse ?"
				onExpandedChange={function noRefCheck() {}}
			>
			<>
				<DisplayChunks chunks={chunks.slice(startIndex, endIndex)} />
				<Pagination
					count={Math.ceil(chunks.length / chunksPerPage)}
					defaultPage={currentPage}
					getPageLinkProps={getPageLinkProps}
					className='fr-mt-3v'
				/>
			</>
			</Accordion>
		</>}
    </div>
  );
};
