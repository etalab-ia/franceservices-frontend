import type { Dispatch, SetStateAction } from 'react'
import type { UserAuth } from 'utils/auth'
import { ContactForm } from '../components/Contact/ContactForm'

export function Contact({
  setUserAuth,
}: { setUserAuth: Dispatch<SetStateAction<UserAuth>> }) {
  return (
    <div className="ft-container">
      <ContactForm setUserAuth={setUserAuth} />
    </div>
  )
}
