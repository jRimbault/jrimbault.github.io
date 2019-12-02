import { makeSidebar, switchTheme } from 'sidebar'
import { makeContent } from 'content'
import { Resume } from 'types'

async function fetchResume(url: string) {
  const resume = await (await fetch<Resume>(url)).json()
  makeSidebar(resume)
  makeContent(resume)
  return resume
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
