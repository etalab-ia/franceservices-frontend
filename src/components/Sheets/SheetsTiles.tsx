import { Tile } from '@codegouvfr/react-dsfr/Tile'
import { Tile as TileType } from '@types'
import { useDispatch } from 'react-redux'

export const SheetsTiles = ({
  tiles,
  isModifiable,
  type,
}: {
  tiles: any[]
  isModifiable: boolean
  type: string
}) => {
  const text = type === 'main' ? 'X Supprimer' : '+ Ajouter'
  const dispatch = useDispatch()
  const handleClick = (key: number) => {
    if (type === 'main') dispatch({ type: 'REMOVE_SHEETS', indexToRemove: key })
    else dispatch({ type: 'ADD_SHEETS', indexToAdd: key })
  }

  return (
    <>
      {tiles.map((tile, key) => (
        <div key={key} className="flex w-full fr-mb-3v">
          <Tile
            horizontal
            className="w-full fr-pl-2w font-bold cursor-pointer"
            desc={tile.desc}
            linkProps={tile.linkProps}
            title={tile.title}
          />
          {isModifiable && (
            <div
              className="fr-pl-2w font-bold fr-text--xs cursor-pointer"
              onClick={() => handleClick(key)}
            >
              {text}
            </div>
          )}
        </div>
      ))}
    </>
  )
}

function TileTest() {
  return (
    <div id="card-rejoindre-la-communaute" className="fr-card  fr-card--horizontal">
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h3 className="fr-card__title">
            <a
              href="/communaute/rejoindre-la-communaute"
              className="fr-card__link"
              id="card__link-rejoindre-la-communaute"
            >
              Rejoindre la communauté
            </a>
          </h3>
          <p className="fr-card__desc">
            Le Système de Design réunit 550 membres experts du numérique : designers,
            développeurs, chefs de produit ou chefs de projet. Rejoignez-nous !
          </p>
        </div>
      </div>{' '}
      <div className="fr-card__header">
        <div className="fr-card__img">
          <img
            src="/img/placeholder.16x9.png"
            alt=""
            className="fr-responsive-img"
            data-fr-js-ratio="true"
          />
        </div>
      </div>
    </div>
  )
}
