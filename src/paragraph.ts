import { Paragraph } from 'types'
import { createNode } from 'utils'
import { makeAtom } from 'atom'

function makeParagraphTitle(paragraph: Paragraph) {
  return createNode('h3', {
    classList: 's-title',
    children: [
      createNode('a', {
        classList: 'anchor',
        attributes: {
          href: '#' + paragraph.id,
          'aria-hidden': 'true',
        },
        textContent: '#',
      }),
      createNode('span', { textContent: paragraph.name }),
    ],
  })
}

export function makeParagraph(paragraph: Paragraph) {
  return createNode('div', {
    id: paragraph.id,
    classList: 'container',
    children: [
      makeParagraphTitle(paragraph),
      ...(paragraph.elements ? paragraph.elements.map(makeAtom) : []),
    ],
  })
}
