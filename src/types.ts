export type TagList = (string | { html: string })[][]
export type DateAside = {
  kind: 'date'
  date: string
}
export type TitleAside = {
  kind: 'title'
  text: string
  size: 'h4' | 'h5'
}
export type Aside = DateAside | TitleAside
export type Point = {
  description: string
  subPoints?: Point[]
}
export type Link = {
  text: string
  url: string
}
export type Atom = {
  aside?: Aside
  title?: string
  subTitle?: string
  subTitleDescription?: string
  resume?: string[]
  points?: Point[]
  links?: Link[]
  tags?: TagList
}
export type Paragraph = {
  name: string
  id: string
  elements?: Atom[]
}
export type Identity = {
  name: string
  shortName?: string
  description: string
  location: string
}
export type Resume = {
  identity: Identity
  paragraphs: Paragraph[]
  sidebar: Link[]
}
