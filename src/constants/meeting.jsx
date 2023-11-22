export const	meetingTitle = `Préparer un rendez-vous`;
export const	meetingSubtitle = `Description de la situation de l’usager`;
export const	meetingParagraph = `Des consignes et bons conseil pour créer un bon “prompt”. Cela peut être en autre des informations sur quoi inclure ou non (eg. ne pas trop détailler la situation de l’usager pour ne pas la rendre identifiante), etc.`;
export const    meetingInformations = `Informations contextuelles`;
export const    meetingGenerationPage = `Générer la page guide`;
export const    meetingAppointmentInformations = `Informations sur le rendez-vous`;
export const    meetingContacts = [
    {
        linkProps: { href: "#" },
        title: <>
            <p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">Contact général</p>
            <p>Nom de l'organisme</p>
        </>,
        desc: <>
            <p>E-mail</p>
            <p>Numéro de téléphone</p>
            <p>Horaires</p>
        </>
    },
    {
        linkProps: { href: "#" },
        title: <>
            <p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">Contact A+</p>
            <p>Nom de l'organisme</p>
        </>,
        desc: <>
            <p>E-mail</p>
            <p>Numéro de téléphone</p>
            <p>Horaires</p>
        </>
    }
]