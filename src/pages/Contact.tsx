import { Dispatch, SetStateAction } from 'react'
import { UserAuth } from 'src/utils/auth'
import { ContactForm } from '../components/Contact/ContactForm'
import { GlobalDiv } from '../components/Global/GlobalDiv'
import { GlobalRowContainer } from '../components/Global/GlobalRowContainer'

export function Contact({
  setUserAuth,
}: { setUserAuth: Dispatch<SetStateAction<UserAuth>> }) {
  return (
    <div className="ft-container">
      <ContactForm setUserAuth={setUserAuth} />
    </div>
  )
}
