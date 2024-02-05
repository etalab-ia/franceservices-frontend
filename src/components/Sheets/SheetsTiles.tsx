import { Tile } from '@codegouvfr/react-dsfr/Tile'
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
