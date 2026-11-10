/**
 * Vite schreibt Pfade aus der Frontmatter nicht um. Ohne das Präfix würden sie
 * auf einem Unterpfad wie /repo-name/ ins Leere zeigen.
 */
export function withBase(path?: string) {
  if (!path || /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(path))
    return path
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}
