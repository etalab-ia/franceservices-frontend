import { Accordion } from "@codegouvfr/react-dsfr/Accordion";
import { Pagination } from "@codegouvfr/react-dsfr/Pagination";
import { DisplayChunks } from "./DisplayChunks";
import { useState } from "react";

export const ResponseExplanation = ({ chunks }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const getPageLinkProps = (pageNumber) => {
    const linkProps = {
      href: `#page-${pageNumber}`,
      title: `Page ${pageNumber}`,
      onClick: () => setCurrentPage(pageNumber),
    };

    return linkProps;
  };

  return (
    <div>
      <Accordion
        className="fr-mt-3v"
        label="Quelles sont les sources utilisées pour générer cette réponse ?"
        onExpandedChange={function noRefCheck(){}}
      >
        <>
          <DisplayChunks chunks={chunks} />
          <Pagination
            count={4}
            defaultPage={currentPage}
            getPageLinkProps={getPageLinkProps}
          />
        </>
      </Accordion>
    </div>
  );
};
