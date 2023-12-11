export const    askingSheetsNeeded = `Souhaitez-vous obtenir les liens vers les sources utilisées dans ce résultat ?`;
export const    accordionDescription = `Accordéon proposant les différentes fiches service-public.fr associées à la réponse générée`;
export const	accordionLabel = `Fiches service-public.fr associées à la réponse générée`;
export const	sheetsImgDescription = `Accéder à la page`;
export const    sheetsTitle = <h3 className="text-2xl font-bold">Aller plus loin</h3>;
export const    spSheetsUrl = `https://www.service-public.fr/particuliers/vosdroits/`;
export const    numberOfSelectedSheets = (len) =>  len === 0 ? <></> : len > 1 ? 
    <p className="fr-mt-1w">{len} fiches sélectionnées</p> : <p className="fr-mt-1w">{len} fiche sélectionnée</p>;