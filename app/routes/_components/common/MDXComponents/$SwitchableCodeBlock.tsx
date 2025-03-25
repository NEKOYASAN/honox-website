import type { JSX } from 'hono/jsx'
import { useMemo, useState } from 'hono/jsx'
import { twMerge } from 'tailwind-merge'
import { CodeLanguageIcon } from '../../icons/CodeLanguageIcon'
import { CopyButton } from './$CopyButton'
import { getCodeLanguageLabel } from './util'

type CodeBlockInnerProps = {
  codes: {
    language?: string
    switcher?: string | boolean
    [key: string]: string | boolean | undefined
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
            <CodeLanguageIcon
              colored={true}
              language={selectedCode.language}
              switcher={selectedCode.switcher}
              className={'size-4'}
            />
            {selectedCode.filename ? <span>{selectedCode.filename}</span> : null}
          </div>
          <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
            {codes.length > 1 ? (
              <select
                className={
                  'cursor-pointer rounded-sm py-1 pr-1.5 transition-colors hover:bg-black/20 dark:hover:bg-white/20'
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
                      {code.switcher && typeof code.switcher === 'string'
                        ? code.switcher
                        : getCodeLanguageLabel(code.language)}
                    </option>
                  )
                })}
              </select>
            ) : null}

            <CopyButton text={selectedCode.codeText} />
          </div>
        </div>
      ) : codes.length > 1 ? (
        <div
          className={
            'flex items-center overflow-x-auto border-b border-gray-300 px-2 dark:border-gray-700'
          }
        >
          {codes.map((code, index) => {
            return (
              <button
                data-active={index === codeIndex}
                className='relative flex cursor-pointer items-center gap-2 px-3 py-3 text-sm text-gray-600 transition-colors after:absolute after:right-1 after:bottom-0 after:left-1 after:h-[2px] after:bg-orange-600 after:opacity-0 after:transition-opacity after:content-[""] data-active:text-gray-800 data-active:after:opacity-100 dark:text-gray-300 dark:after:bg-orange-400 data-active:dark:text-gray-100'
                key={index}
                onClick={() => {
                  setCodeIndex(index)
                }}
              >
                <CodeLanguageIcon
                  colored={true}
                  language={code.language}
                  switcher={code.switcher}
                  className={'size-3'}
                />
                {code.switcher && typeof code.switcher === 'string'
                  ? code.switcher
                  : (code.language ?? null)}
              </button>
            )
          })}
        </div>
      ) : null}
      <div className={'relative'}>
        {selectedCode.highlightedCodeHTML ? (
          <div
            className={
              '[&_pre]:overflow-x-auto [&_pre]:px-4 [&_pre]:py-4 dark:[&_pre]:!bg-(--shiki-dark-bg) dark:[&_span]:!bg-(--shiki-dark-bg) dark:[&_span]:!text-(--shiki-dark)'
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
        {!(selectedCode.language && selectedCode.filename) ? (
          <CopyButton
            text={selectedCode.codeText}
            className={
              'absolute top-2 right-2 opacity-0 transition-[opacity_backgroud-color] group-hover:opacity-100'
            }
          />
        ) : null}
      </div>
    </div>
  )
}
