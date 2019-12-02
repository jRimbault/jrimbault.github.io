export type TagList = (string | { html: string })[][]
export interface DateAside {
  kind: 'date'
  date: string
}
export interface TitleAside {
  kind: 'title'
  text: string
  size: 'h4' | 'h5'
}
export type Aside = DateAside | TitleAside
export interface Point {
  description: string
  subPoints?: Point[]
}
export interface Link {
  text: string
  url: string
}
export interface Atom {
  aside?: Aside
  title?: string
  subTitle?: string
  subTitleDescription?: string
  resume?: string[]
  points?: Point[]
  links?: Link[]
  tags?: TagList
}
export interface Paragraph {
  name: string
  id: string
  elements?: Atom[]
}
export interface Identity {
  name: string
  shortName?: string
  description: string
  location: string
}
export interface Resume {
  identity: Identity
  paragraphs: Paragraph[]
  sidebar: Link[]
}
