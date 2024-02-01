import { Tile } from '@codegouvfr/react-dsfr/Tile'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'types'
import { setTilesFromContacts } from '../../constants/meeting'

/*
 * Tiles containing useful links for the meeting's response
 */
export const UsefulLinks = () => {
  const [tiles, setTiles] = useState([])
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    setTilesFromContacts(user.webservices, setTiles)
  }, [user.webservices])

  return (
    <>
      {tiles.map((tile, key) => {
        return (
          <Tile
            key={key}
            horizontal
            className="fr-mb-3v"
            desc={tile.desc}
            linkProps={tile.linkProps}
            title={tile.title}
          />
        )
      })}
    </>
  )
}
