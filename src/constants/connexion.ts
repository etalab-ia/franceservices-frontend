import type { ButtonProps } from '@codegouvfr/react-dsfr/Button'

export const initButtonsLogin = (onSubmit, isDisable: boolean) => {
  const buttonsLogin = [
    {
      children: 'Connexion',
      onClick: onSubmit,
      disabled: isDisable,
      priority: 'primary',
    },
    {
      children: 'Créer un compte',
      onClick: () => (window.location.href = '/signup'),
      priority: 'tertiary',
    },
    {
      children: 'Mot de passe oublié',
      onClick: () => (window.location.href = '/reset-password'),
      priority: 'tertiary',
    },
  ]

  return buttonsLogin
}

export const initButtonsSignup = (
  handleValidatePassword: (any?) => any,
  handleClick: () => void,
  children: React.ReactNode,
) => {
  const buttonsSignup: [ButtonProps, ...ButtonProps[]] = [
    {
      disabled: !handleValidatePassword(),
      children: children,
      onClick: handleClick,
    },
    {
      children: 'Retour',
      onClick: () => (window.location.href = '/login'),
      priority: 'tertiary',
    },
  ]

  return buttonsSignup
}

export const initButtonsReset = (isDisable: boolean, handleClick: () => void) => {
  const buttonsReset: [ButtonProps, ...ButtonProps[]] = [
    {
      disabled: isDisable,
      children: 'Soumettre',
      onClick: handleClick,
    },
    {
      children: 'Retour',
      onClick: () => (window.location.href = '/login'),
      priority: 'tertiary',
    },
  ]

  return buttonsReset
}
