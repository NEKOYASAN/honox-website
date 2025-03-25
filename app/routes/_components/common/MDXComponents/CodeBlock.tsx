import type { JSX } from 'hono/jsx'
import { createHighlighter, makeSingletonHighlighter } from 'shiki'
import { SwitchableCodeBlock } from './$SwitchableCodeBlock'

type CodeBlockProps = {
  codes: {
    language?: string
    switcher?: string | boolean
    [key: string]: string | boolean | undefined
    codeText: string
  }[]
} & JSX.IntrinsicElements['pre']

const getHighlighter = makeSingletonHighlighter(createHighlighter)

export const CodeBlock = async ({ codes, ...props }: CodeBlockProps) => {
  const highlighter = await getHighlighter({
    themes: ['one-light', 'one-dark-pro'],
    langs: codes
      .map(({ language }) => language)
      .filter((language) => {
        return typeof language === 'string'
      }),
  })

  const highlightedCodes = codes.map(
    (
      value
    ): {
      language?: string
      switcher?: string | boolean
      [key: string]: string | boolean | undefined
      codeText: string
      highlightedCodeHTML?: string
    } => {
      return {
        ...value,
        highlightedCodeHTML: value.language
          ? highlighter.codeToHtml(value.codeText, {
              themes: {
                light: 'one-light',
                dark: 'one-dark-pro',
              },
              lang: value.language,
            })
          : undefined,
      }
    }
  )

  return <SwitchableCodeBlock codes={highlightedCodes} {...props} />
}
