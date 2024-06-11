import { nextImgDescription } from '@constants/chatbotProps'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import next from '../../../icons/usertools/next.svg'
import previous from '../../../icons/usertools/previous.svg'

export function DisplayMessageTab({
  isDisplayable,
  tabsLen,
  activeTab,
  setActiveTab,
  extraClass,
}) {
  const dispatch = useDispatch()

  useEffect(() => setActiveTab(tabsLen), [tabsLen])
  useEffect(() => {
    dispatch({ type: 'SWITCH_TAB', nextTab: activeTab })
  }, [activeTab])

  const handleClick = (
    activeTab: number,
    setActiveTab: React.Dispatch<React.SetStateAction<number>>,
    step: number
  ) => {
    setActiveTab(activeTab + step)
  }

  return (
    <>
      {isDisplayable && (
        <div className={`${extraClass} flex flex-row fr-mb-4w`}>
          {activeTab > 1 && (
            <button
              type="button"
              className="fr-mr-1w"
              onClick={() => handleClick(activeTab, setActiveTab, -1)}
            >
              <img
                src={previous}
                alt="Bouton d'accès au message précédent généré par le robot."
              />
            </button>
          )}
          <p className="streaming-tabs">
            {activeTab} / {tabsLen}
          </p>
          {activeTab < tabsLen && (
            <button
              type="button"
              className="fr-ml-1w"
              onClick={() => handleClick(activeTab, setActiveTab, 1)}
            >
              <img
                src={next}
                alt="Bouton d'accès au message suivant généré par le robot."
              />
            </button>
          )}
        </div>
      )}
    </>
  )
}
