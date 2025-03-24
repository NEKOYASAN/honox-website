import type { JSX } from 'hono/jsx'
import { useMemo, useState } from 'hono/jsx'
import { twMerge } from 'tailwind-merge'
import { CodeLanguageIcon } from '../../icons/CodeLanguageIcon'
import { CopyButton } from './$CopyButton'
import { getCodeLanguageLabel } from './util'

type CodeBlockInnerProps = {
  codes: {
    language?: string
    [key: string]: string | undefined
    codeText: string
    highlightedCodeHTML?: string
  }[]
} & JSX.IntrinsicElements['pre']

export const SwitchableCodeBlock = ({ codes, className, ...props }: CodeBlockInnerProps) => {
  const [codeIndex, setCodeIndex] = useState(0)

  const selectedCode = useMemo(() => {
    return codes[codeIndex]
  }, [codes, codeIndex])

  return (
    <div
      className={twMerge(
        'group relative my-4 w-full overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700',
        className
      )}
      {...props}
    >
      {selectedCode.language && selectedCode.filename ? (
        <div
          className={
            'flex items-center justify-between border-b border-gray-300 py-2 pr-2 pl-4 dark:border-gray-700'
          }
        >
          <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
            {selectedCode.language ? (
              <CodeLanguageIcon language={selectedCode.language} className={'size-4'} />
            ) : null}
            {selectedCode.filename ? <span>{selectedCode.filename}</span> : null}
          </div>
          <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
            {codes.length > 1 ? (
              <select
                className={
                  'cursor-pointer rounded-md py-1 pr-1.5 transition-colors hover:bg-black/20 dark:hover:bg-white/20'
                }
                value={codeIndex}
                onChange={(e) => {
                  if (e.currentTarget && 'value' in e.currentTarget) {
                    const index = Number(e.currentTarget.value ?? '0')
                    setCodeIndex(index)
                  }
                }}
              >
                {codes.map((code, index) => {
                  return (
                    <option key={index} value={index}>
                      {getCodeLanguageLabel(code.language)}
                    </option>
                  )
                })}
              </select>
            ) : null}

            <CopyButton text={selectedCode.codeText} />
          </div>
        </div>
      ) : (
        <CopyButton
          text={selectedCode.codeText}
          className={
            'absolute top-2 right-2 opacity-0 transition-[opacity_backgroud-color] group-hover:opacity-100'
          }
        />
      )}
      {selectedCode.highlightedCodeHTML ? (
        <div
          className={
            '[&_pre]:overflow-x-auto [&_pre]:px-2 [&_pre]:py-4 dark:[&_pre]:!bg-(--shiki-dark-bg) dark:[&_span]:!bg-(--shiki-dark-bg) dark:[&_span]:!text-(--shiki-dark)'
          }
          dangerouslySetInnerHTML={{
            __html: selectedCode.highlightedCodeHTML,
          }}
        />
      ) : (
        <pre className={'overflow-x-auto bg-gray-100 px-2 py-4 dark:bg-gray-900'}>
          <code className={'block'}>{selectedCode.codeText}</code>
        </pre>
      )}
    </div>
  )
}
