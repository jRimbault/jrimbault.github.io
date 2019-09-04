import { Resume, Identity, Link } from 'types'
import { createNode } from 'utils'


function makeTopSidebar(identity: Identity) {
  return createNode('div', {
    classList: 'cv-brand',
    children: [
      createNode('a', {
        classList: 'cv-logo',
        attributes: { href: '.' },
        children: [
          createNode('h2', { textContent: identity.shortName || identity.name })
        ]
      })
    ]
  })
}

function makeSidebarList(title: string, links: Link[]) {
  const localTitle = title + '-accordion'
  return createNode('div', {
    classList: 'accordion',
    children: [
      createNode('input', {
        id: localTitle,
        attributes: {
          name: localTitle + '-checkbox',
          checked: '',
          hidden: '',
          type: 'checkbox',
        },
      }),
      createNode('label', {
        textContent: title,
        classList: ['accordion-header', 'c-hand'],
        attributes: { for: localTitle },
      }),
      createNode('div', {
        classList: 'accordion-body',
        children: [
          createNode('ul', {
            classList: ['menu', 'menu-nav'],
            children: links.map(link => {
              return createNode('li', {
                classList: 'menu-item',
                children: [
                  createNode('a', {
                    textContent: link.text,
                    attributes: { href: link.url },
                  })
                ]
              })
            })
          })
        ]
      }),
    ],
  })
}

function makeContact(links: Link[]) {
  return createNode('div', {
    classList: 'accordion-container',
    children: [makeSidebarList('contact', links)]
  })
}

export function switchTheme(shouldSwitch: boolean=true) {
  type Theme = 'dark' | 'light'
  const link = document.querySelector('link#color-mode') as Element
  const href = (mode: Theme) => `./assets/css/${mode}.css`
  const normalize = (mode: Theme | null) => mode === 'dark'
    ? 'dark'
    : 'light'
  const inverse = (mode: Theme | null) => !shouldSwitch
    ? normalize(mode)
    : mode === 'dark'
      ? 'light'
      : 'dark'
  return () => {
    const current = localStorage.getItem('theme') as Theme | null
    if (current) {
      link.setAttribute('href', href(inverse(current)))
    } else {
      link.setAttribute('href', href('light'))
    }
    localStorage.setItem('theme', inverse(current))
  }
}

function makeThemeSwitcher() {
  const label = createNode('label', {
    textContent: 'Theme',
    classList: ['accordion-header', 'c-hand'],
  })
  label.addEventListener('click', switchTheme())
  return createNode('div', {
    classList: 'accordion',
    children: [
      createNode('input', {
        id: 'theme-switcher-input',
        attributes: {
          name: 'theme-checkbox',
          checked: '',
          hidden: '',
          type: 'checkbox',
        }
      }),
      label,
    ],
  })
}

export function makeSidebar(resume: Resume) {
  const sidebarDiv = document.querySelector('#sidebar')
  if (sidebarDiv) {
    const about = resume.paragraphs
      ? resume.paragraphs.map(p => ({ text: p.name, url: '#' + p.id }))
      : []
    const nav = createNode('div', {
      classList: 'cv-nav',
      children: [
        makeSidebarList('À propos', about),
        makeContact(resume.sidebar),
        makeThemeSwitcher(),
      ]
    })
    sidebarDiv.appendChild(makeTopSidebar(resume.identity))
    sidebarDiv.appendChild(nav)
  }
  return resume
}
