import { Aside, Point, TagList, Link, Atom } from 'types'
import { createNode, NodeOptions, notNull } from 'utils'

function makeAside(aside?: Aside) {
  if (aside === undefined) return null
  return createNode('div', {
    classList: ['col-3', 'col-md-12', 'column', 'hide-md'],
    children: [
      createNode('div', {
        classList: [
          aside.kind === 'date' ? 'cv-note' : '',
          'text-right'
        ],
        children: [
          aside.kind === 'date'
            ? createNode('span', {
              classList: ['chip', 'p-2'],
              textContent: aside.date
            })
            : createNode(aside.size, { textContent: aside.text })
        ]
      })
    ]
  })
}

function makeAtomHeader(aside?: Aside) {
  if (aside === undefined) return null
  return createNode('div', {
    classList: ['show-md', 'mb-2'],
    children: [
      aside.kind === 'date'
        ? createNode('span', {
            classList: ['chip', 'p-2'],
            textContent: aside.date
          })
        : createNode(aside.size, { textContent: aside.text })
    ]
  })
}

function makePoint(point: Point): HTMLLIElement {
  return createNode('li', {
    textContent: point.description,
    children: point.subPoints
      ? [createNode('ul', { children: point.subPoints.map(makePoint) })]
      : []
  })
}

function makePointList(points: Point[]): HTMLUListElement {
  return createNode('ul', {
    children: points.map(makePoint)
  })
}

function makeTag(tag: NodeOptions['textContent']) {
  return createNode('span', { classList: 'chip', textContent: tag })
}

function makeTagList(tagsList: TagList) {
  return createNode('div', {
    classList: 'cv-taglist',
    children: tagsList.map(
      tags => createNode('p', { children: tags.map(makeTag) })
    )
  })
}

function makeLinkList(links: Link[]) {
  return createNode('p', {
    children: links.map(link => createNode('a', {
      textContent: link.text,
      attributes: {
        href: link.url
      }
    }))
  })
}

function makeAtomContent(atom: Atom) {
  const resume = atom.resume
    ? atom.resume.map(p => createNode('p', { textContent: p }))
    : []
  return createNode('div', {
    classList: (atom.aside && atom.aside.kind === 'date') ? 'cv-note' : [],
    children: [
      makeAtomHeader(atom.aside),
      atom.title ? createNode('h4', { textContent: atom.title }) : null,
      atom.subTitle ? createNode('h5', { textContent: atom.subTitle }) : null,
      ...resume,
      atom.points ? makePointList(atom.points) : null,
      atom.links ? makeLinkList(atom.links) : null,
      atom.tags ? makeTagList(atom.tags) : null,
    ].filter(notNull)
  })
}

export function makeAtom(atom: Atom) {
  return createNode('div', {
    classList: 'columns',
    children: [
      makeAside(atom.aside),
      createNode('div', {
        classList: ['col-9', 'col-md-12', 'column'],
        children: [
          createNode('div', {
            classList: ['cv-note'],
            children: [
              makeAtomContent(atom),
            ]
          })
        ]
      })
    ].filter(notNull)
  })
}
