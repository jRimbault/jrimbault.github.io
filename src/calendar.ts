import { makeParagraph } from 'paragraph'

function proxy(url: string) {
  return 'https://urlreq.appspot.com/req?method=GET&url=' + url
}

const colorMappings: Record<string, string> = {
  '#ebedf0': '--darker-background',
  '#c6e48b': '--very-light-brand-color',
  '#7bc96f': '--light-brand-color',
  '#196127': '--brand-color',
  '#239a3b': '--dark-brand-color',
}

export async function getCalendar(user: string): Promise<HTMLElement> {
  const response = (
    await fetch(proxy(`https://github.com/users/${user}/contributions`))
  ).text()
  const doc = document.createElement('div')
  doc.innerHTML = await response
  const calendar = doc.getElementsByClassName('js-calendar-graph')[0]
  calendar.removeAttribute('class')
  const legends = [
    ...Array.from(calendar.getElementsByClassName('month')),
    ...Array.from(calendar.getElementsByClassName('wday')),
  ]
  legends.map(h => h.remove())
  Array.from(calendar.getElementsByClassName('day')).forEach(mapColor)
  const paragraph = makeParagraph({
    id: 'github-activy',
    name: 'Commits',
  })
  paragraph.append(calendar)
  return paragraph
}

function mapColor(day: Element) {
  const color = day.getAttribute('fill')
  if (color) {
    day.setAttribute('fill', `var(${colorMappings[color]})`)
  }
}
