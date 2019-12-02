import { createNode } from 'dom'
import { makeParagraph } from 'paragraph'
import { Identity, Resume } from 'types'

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

export function makeContent(resume: Resume) {
  const contentDiv = document.querySelector('#content')
  if (contentDiv) {
    contentDiv.appendChild(makeIntroduction(resume.identity))
    for (const paragraph of resume.paragraphs) {
      contentDiv.appendChild(makeParagraph(paragraph))
    }
  }
  return resume
}
