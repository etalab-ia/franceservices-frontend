import { GlobalTitle } from '../components/Global/GlobalTitle'
import { HomeTiles } from '../components/Home/HomeTiles'

export function Tools() {
  return (
    <div className="fr-container fr-mb-12w flex flex-col gap-4 fr-pt-4w">
      <GlobalTitle>Mes ressources</GlobalTitle>
      <HomeTiles />
    </div>
  )
}
