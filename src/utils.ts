export function notNull<T>(value?: T | null): value is Exclude<T, null> {
  return value !== undefined && value !== null
}
