import { MFSressourcesTiles } from '@constants/inputFields'
import { GlobalTitle } from '../components/Global/GlobalTitle'
import { HomeTiles } from '../components/Home/HomeTiles'

export function Tools() {
  console.log('logos')
  return (
    <div className="fr-container fr-mb-12w flex flex-col gap-4 fr-pt-4w">
      <GlobalTitle>Mes ressources</GlobalTitle>
      <HomeTiles tiles={MFSressourcesTiles} />
    </div>
  )
}
