import { createContext, useContext, useState } from 'react'

const RegistrationContext = createContext(null)

export function RegistrationProvider({ children }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    course: 'Quran Memorization — Tajweed & Hifz',
    agreedToTerms: false,
  })

  const [currentStep, setCurrentStep] = useState(1)

  const updateForm = (fields) =>
    setFormData((prev) => ({ ...prev, ...fields }))

  return (
    <RegistrationContext.Provider
      value={{ formData, updateForm, currentStep, setCurrentStep }}
    >
      {children}
    </RegistrationContext.Provider>
  )
}

export function useRegistration() {
  return useContext(RegistrationContext)
}
