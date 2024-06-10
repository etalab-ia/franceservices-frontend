import type { Tile as TileType, WebService } from '@types'

/*
 * Tiles containing useful links for the meeting's response
 */
export const UsefulLinks = ({
  webservices,
  extraClass,
}: { webservices: WebService[]; extraClass?: string }) => {
  const tiles =
    !webservices || !webservices.length ? [] : setUsefulLinksTilesProps(webservices)

  return (
    <div className={`${extraClass} h-full`}>
      <h6 className={'fr-pb-2w '}>Liens pratiques</h6>

      {tiles.map((tile, key) => {
        return (
          <div className="fr-mb-2w" key={key}>
            <SmallHorizontalTile tileProps={tile} />
          </div>
        )
      })}
    </div>
  )
}

function SmallHorizontalTile({ tileProps }: { tileProps: TileType }) {
  return (
    <div
      className="fr-tile fr-tile--sm fr-tile--horizontal fr-enlarge-link  hover:bg-[#f6f6f6]"
      id="tile-6661"
    >
      <div className="fr-tile__body">
        <div className="fr-tile__content">
          <h3 className="fr-tile__title">
            <a
              href={tileProps.linkProps.href}
              style={{ backgroundImage: 'none', textDecoration: 'none' }}
            >
              {tileProps.title}
            </a>
          </h3>
          <p className="fr-tile__detail">{tileProps.desc.key}</p>
          <div className="fr-tile__start" />
        </div>
      </div>
    </div>
  )
}

/**
 * Helper function to generate tiles props from webservices
 */
const setUsefulLinksTilesProps = (webservices: WebService[]) => {
  const tiles: TileType[] = []
  webservices.map((webservice) => {
    const url = webservice.url
    const parsedUrl = new URL(url)
    let domain = parsedUrl.hostname

    domain = domain.replace(/^www\./, '')
    domain = domain.replace(/^entreprendre\./, '')

    const newTile = {
      linkProps: { href: webservice.url },
      title: (
        <>
          <p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">
            {webservice.type}
          </p>
          <p>{webservice.institution}</p>
        </>
      ),
      desc: <>{domain}</>,
    }
    tiles.push(newTile)
  })
  return tiles
}
