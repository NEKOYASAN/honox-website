import { valueToEstree } from 'estree-util-value-to-estree'
import type { Root } from 'mdast'
import type { Plugin } from 'unified'
import { is } from 'unist-util-is'
import { visit, SKIP } from 'unist-util-visit'

const parseMetaStringToObject = (meta?: unknown) => {
  const metaObject: { [key: string]: string | true } = {}
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

type Code = {
  language?: string
  [key: string]: string | undefined
  codeText: string
}

export const remarkMDXCodeMeta: Plugin<[], Root> = () => {
  return (tree) => {
    let parentCodeBlockIndex: number | null = null
    let codes: Code[] = []
    visit(tree, 'code', (node, index, parent) => {
      if (index === undefined || parent === undefined) {
        return
      }

      const codeObject: Code = {
        language: node.lang ? node.lang : undefined,
        ...parseMetaStringToObject(node.meta),
        codeText: node.value,
      }

      if (codeObject.switcher) {
        codes.push(codeObject)
        const nextNode = parent.children[index + 1]
        if (nextNode && is(nextNode, 'code')) {
          const nextNodeMetaObject = parseMetaStringToObject(nextNode.meta)
          if (nextNodeMetaObject.switcher) {
            if (parentCodeBlockIndex === null) {
              parentCodeBlockIndex = index
            }
            parent.children.splice(index, 1)
            return [SKIP, index]
          }
        }
        const nodeIndex = parentCodeBlockIndex !== null ? parentCodeBlockIndex : index
        parent.children[nodeIndex] = {
          type: 'mdxJsxFlowElement',
          name: 'codeblock',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'codes',
              value: {
                type: 'mdxJsxAttributeValueExpression',
                value: JSON.stringify(codes),
                data: {
                  estree: {
                    type: 'Program',
                    sourceType: 'module',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: valueToEstree(codes),
                      },
                    ],
                  },
                },
              },
            },
          ],
          children: [],
        }
        parentCodeBlockIndex = null
        codes = []
        return [SKIP, index]
      } else {
        parent.children[index] = {
          type: 'mdxJsxFlowElement',
          name: 'codeblock',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'codes',
              value: {
                type: 'mdxJsxAttributeValueExpression',
                value: JSON.stringify([codeObject]),
                data: {
                  estree: {
                    type: 'Program',
                    sourceType: 'module',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: valueToEstree([codeObject]),
                      },
                    ],
                  },
                },
              },
            },
          ],
          children: [],
        }
      }
    })
  }
}
