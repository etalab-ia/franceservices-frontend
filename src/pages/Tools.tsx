import { MFSressourcesTiles } from '@constants/inputFields'
import { GlobalTitle } from '../components/Global/GlobalTitle'
import { HomeTiles } from '../components/Home/HomeTiles'

export function Tools() {
  console.log('logos')
  return (
    <div className="fr-container fr-mb-12w flex flex-col gap-4 fr-pt-4w">
      <img src="../../artwork/logo/LogoA+.png" alt="Logo A+" className="w-24 h-24" />
      <GlobalTitle>Mes ressources</GlobalTitle>
      <HomeTiles tiles={MFSressourcesTiles} />
    </div>
  )
}
