import { createNode } from 'dom'
import { makeParagraph } from 'paragraph'
import { Identity, Resume } from 'types'

export function makeContent(resume: Resume) {
  return [
    makeIntroduction(resume.identity),
    ...resume.paragraphs.map(makeParagraph),
  ]
}

function makeIntroduction(identity: Identity) {
  return createNode('div', {
    id: 'introduction',
    classList: 'container',
    children: [
      createNode('h3', {
        classList: 's-title',
        children: [
          createNode('a', {
            classList: 'anchor',
            textContent: '#',
            attributes: {
              'href': '#introduction',
              'aria-hidden': 'true',
            },
          }),
          createNode('span', { textContent: identity.name }),
        ],
      }),
      createNode('h5', { textContent: identity.description }),
      createNode('h5', { textContent: identity.location }),
    ],
  })
}
