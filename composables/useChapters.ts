import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { cleanTitle } from '../utils/cleanTitle'

export type ChapterColor = 'yellow' | 'green' | 'red' | 'blue'

export interface Chapter {
  /** Foliennummer des section-Layouts */
  no: number
  /** Letzte Foliennummer, die zum Kapitel gehört */
  lastNo: number
  index: number
  title: string
  color: ChapterColor
}

// Reihenfolge wie bei den Kacheln auf der Startseite der Hochschule.
const CHAPTER_COLORS: ChapterColor[] = ['yellow', 'green', 'red', 'blue']

export const chapterColor = (index: number) => CHAPTER_COLORS[index % CHAPTER_COLORS.length]

/** Ein Kapitel beginnt mit jeder Folie im Layout `section`. */
export function useChapters() {
  const { slides } = useNav()

  const chapters = computed<Chapter[]>(() => {
    const out: Chapter[] = []
    for (const route of slides.value as any[]) {
      const slide = route.meta?.slide
      const fm = slide?.frontmatter ?? {}
      if (fm.layout === 'section') {
        const index = out.length
        // Ohne eigene Farbe folgt ein Kapitel auf die Farbe des vorigen, damit
        // zwei Kapitel nie gleich aussehen.
        const previous = out.at(-1)?.color
        out.push({
          no: route.no,
          lastNo: route.no,
          index,
          title: cleanTitle(slide.title) || `Kapitel ${index + 1}`,
          color: CHAPTER_COLORS.includes(fm.color) ? fm.color : chapterColor(previous ? CHAPTER_COLORS.indexOf(previous) + 1 : 0),
        })
      }
      else if (out.length) {
        out[out.length - 1].lastNo = route.no
      }
    }
    return out
  })

  return { chapters }
}
