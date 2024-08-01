import { useState } from 'react'
import { ContactFormInput } from './ContactFormInput'
import { ContactFormSubmitButton } from './ContactFormSubmitButton'
import { UserInformation } from './UserInformation'

export type formDataTypes = {
  title: string
  administration: string
  message: string
  name: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<formDataTypes>({
    title: '',
    administration: '',
    message: '',
    name: '',
  })
  const clearForm = () => {
    setFormData({ title: '', administration: '', message: '', name: '' })
  }
  return (
    <div className="fr-container fr-my-3w">
      <UserInformation formData={formData} setFormData={setFormData} />
      <ContactFormInput message={formData.message} setFormData={setFormData} />
      <ContactFormSubmitButton formData={formData} clearForm={clearForm} />
    </div>
  )
}
