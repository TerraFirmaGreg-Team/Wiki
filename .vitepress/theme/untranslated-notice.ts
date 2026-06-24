export const CROWDIN_WIKI_URL = 'https://terrafirmagreg.crowdin.com/wiki'

export const CROWDIN_NAME = 'Crowdin'

export const UNTRANSLATED_BEFORE_CROWDIN = 'This page is not translated yet, contribute on '

/** Full sentence when the whole phrase is one link (edit link, 404 action). */
export const UNTRANSLATED_CROWDIN_LINK = `${UNTRANSLATED_BEFORE_CROWDIN}${CROWDIN_NAME}.`

export function isUntranslatedPage(frontmatter: Record<string, unknown>): boolean {
  return frontmatter.untranslated === true || frontmatter.translationInProgress === true
}
