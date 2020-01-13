import { createNode } from 'dom'

function proxy(url: string) {
  return 'https://urlreq.appspot.com/req?method=GET&url=' + url
}

const colorMappings: Partial<Record<string, string>> = {
  '#ebedf0': 'var(--darker-background)',
  '#c6e48b': 'var(--very-light-brand-color)',
  '#7bc96f': 'var(--light-brand-color)',
  '#196127': 'var(--brand-color)',
  '#239a3b': 'var(--dark-brand-color)',
}

export async function getCalendar(user: string): Promise<HTMLElement> {
  const response = (
    await fetch(proxy(`https://github.com/users/${user}/contributions`))
  ).text()
  const doc = document.createElement('div')
  doc.innerHTML = await response // parse HTML
  const calendar = doc.getElementsByClassName('js-calendar-graph')[0]
  calendar.removeAttribute('class')
  const legends = [
    ...Array.from(calendar.getElementsByClassName('month')),
    ...Array.from(calendar.getElementsByClassName('wday')),
  ]
  legends.map(h => h.remove())
  Array.from(calendar.getElementsByClassName('day')).forEach(mapColor)
  const activyGraph = createNode('div', { classList: 'container' })
  activyGraph.append(calendar)
  calendar.setAttribute('style', 'cursor: pointer;')
  calendar.addEventListener('click', () => window.open('https://github.com/' + user))
  return activyGraph
}

function mapColor(day: Element) {
  const originalColor = day.getAttribute('fill')
  if (originalColor) {
    const brandColor = colorMappings[originalColor]
    if (brandColor) {
      day.setAttribute('fill', brandColor)
    }
  }
}
