import { isMFSContext } from '@utils/context/isMFSContext'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { createRouter, defineRoute } from 'type-route'

export function navFunc() {
  const isMFS = useContext(isMFSContext)
  const location = useLocation()
  const currentPath = location.pathname

  const navDefs: any[] = isMFS
    ? [
        {
          text: 'Accueil',
          linkProps: {
            to: '/home',
          },
          isActive: currentPath === '/home',
        },
        {
          text: 'Mes outils',
          isActive: currentPath === '/chat' || currentPath === '/meeting',
          menuLinks: [
            {
              text: 'Échanger avec Albert',
              linkProps: {
                to: '/meeting',
              },
              isActive: currentPath === '/meeting',
            },
            {
              text: 'Mon historique',
              linkProps: {
                to: '/history',
              },
              isActive: currentPath === '/history',
            },
          ],
        },
        {
          text: 'Aide',
          linkProps: {
            to: '/FAQ',
          },
          isActive: currentPath === '/FAQ',
        },
        {
          text: 'Contact',
          linkProps: {
            to: '/contact',
          },
          isActive: currentPath === '/contact',
        },
      ]
    : [
        {
          text: 'Accueil',
          linkProps: {
            to: '/home',
          },
          isActive: currentPath === '/home',
        },
        {
          text: 'Mes outils',
          isActive: currentPath === '/chat',
          menuLinks: [
            {
              text: 'Poser une question',
              linkProps: {
                to: '/chat',
              },
              isActive: currentPath === '/chat',
            },
          ],
        },
        {
          text: 'Contact',
          linkProps: {
            to: '/contact',
          },
          isActive: currentPath === '/contact',
        },
      ]

  return navDefs
}

const routeDefs = {
  home: defineRoute('/home'),
  meeting: defineRoute('/meeting'),
  chat: defineRoute('/chat'),
  contact: defineRoute('/contact'),
  history: defineRoute('/history'),
  faq: defineRoute('/FAQ'),
}

export const { RouteProvider, useRoute, routes } = createRouter(routeDefs)
