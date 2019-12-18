import { makeContent } from 'content'
import { createNode } from 'dom'
import { makeSidebar, switchTheme } from 'sidebar'
import { Resume } from 'types'

async function fetchResume(url: string) {
  const resume = await (await fetch<Resume>(url)).json()
  const noscript = document.querySelector('noscript')
  if (noscript) {
    document.body.removeChild(noscript)
  }
  document.body.append(buildBody(resume))
  return resume
}

function buildBody(resume: Resume) {
  return createNode('div', {
    classList: ['cv-container', 'off-canvas', 'off-canvas-sidebar-show'],
    children: [
      createNode('div', {
        id: 'sidebar',
        classList: ['cv-sidebar', 'off-canvas-sidebar'],
        children: makeSidebar(resume),
      }),
      createNode('a', {
        classList: ['off-canvas-overlay'],
        attributes: { href: '#close' },
      }),
      createNode('div', {
        id: 'content',
        classList: ['cv-content', 'off-canvas-content'],
        children: makeContent(resume),
      }),
    ],
  })
}

const username = 'jRimbault'
const gistId = 'ddbe04c43dba075e0da9ddb9ebda6926'
const filename = 'resume.json'

window.onload = async () => {
  switchTheme(false)()
  try {
    await fetchResume(
      `https://gist.githubusercontent.com/${username}/${gistId}/raw/${filename}`,
    )
  } catch (error) {
    console.error(error)
    fetchResume('assets/data/resume.json').catch(console.log)
  }
}
