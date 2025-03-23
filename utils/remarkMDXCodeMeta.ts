import type { Plugin } from 'unified'
import { SKIP, visit } from 'unist-util-visit'

const parseMetaStringToObject = (meta?: unknown) => {
  const metaObject: {
    [key: string]: string | true
  } = {}
  if (!meta || typeof meta !== 'string') {
    return metaObject
  }
  const regex = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g
  let match

  while ((match = regex.exec(meta)) !== null) {
    metaObject[match[1]] =
      !match[2] && !match[3] && !match[4] ? true : match[2] || match[3] || match[4]
  }

  return metaObject
}

export const remarkMDXCodeMeta: Plugin = () => {
  return (tree) => {
    visit(
      tree,
      (node) => {
        return node.type === 'code'
      },
      (node) => {
        if ('value' in node) {
          node.type = 'codeblock'
          const parsedMetaObject = 'meta' in node ? parseMetaStringToObject(node.meta) : {}
          const language = 'lang' in node ? node.lang : undefined
          node.data = {
            hName: 'codeblock',
            hProperties: {
              language,
              ...parsedMetaObject,
            },
            hChildren: [
              {
                type: 'text',
                value: node.value,
              },
            ],
          }
        }
      }
    )
  }
}
