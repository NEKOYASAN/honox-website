import { useEffect, useState } from 'hono/jsx'
import { twMerge } from 'tailwind-merge'
import type { ToC } from '../../../../global'

export const ToCList = ({
  tableOfContents,
  className,
  currentId,
}: {
  tableOfContents: Array<ToC>
  className?: string
  currentId: string
}) => {
  return (
    <ul className={twMerge('text-gray-600 dark:text-gray-400', className)}>
      {tableOfContents.map((tableOfContent) => {
        return (
          <li key={tableOfContent.id} className={'my-2'}>
            <a
              data-active={currentId === tableOfContent.id ? '' : undefined}
              class={
                'block transition-colors hover:text-gray-900 data-active:text-orange-600 dark:hover:text-gray-100 dark:data-active:text-orange-400'
              }
              href={`#${tableOfContent.id}`}
            >
              {tableOfContent.value}
            </a>
            {tableOfContent.children && tableOfContent.depth < 3 ? (
              <ToCList
                currentId={currentId}
                tableOfContents={tableOfContent.children}
                className={'mt-1 ml-4'}
              />
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}

export const TableOfContents = ({
  tableOfContents,
  className,
}: {
  tableOfContents: Array<ToC>
  className?: string
}) => {
  const [currentId, setCurrentId] = useState('')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id
          if (entry.isIntersecting) {
            setCurrentId(id)
          }
        })
      },
      {
        threshold: 1,
        rootMargin: '120px 0px -75% 0px',
      }
    )
    function observeTableOfContents(tableOfContents: Array<ToC>) {
      tableOfContents.forEach((entry) => {
        if (entry.id) {
          const element = document.getElementById(entry.id)
          if (element) {
            observer.observe(element)
          }
        }
        if (entry.children) {
          observeTableOfContents(entry.children)
        }
      })
    }
    observeTableOfContents(tableOfContents)

    return () => {
      observer.disconnect()
    }
  }, [])
  return (
    <ToCList
      tableOfContents={tableOfContents}
      className={twMerge('my-1', className)}
      currentId={currentId}
    />
  )
}
