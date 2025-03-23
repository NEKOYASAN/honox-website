import type { Root } from 'mdast'
import type { MdxJsxAttribute } from 'mdast-util-mdx-jsx'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const parseMetaStringToMdxJsxAttributes = (meta?: unknown) => {
  const mdxJsxAttributes: MdxJsxAttribute[] = []
  if (!meta || typeof meta !== 'string') {
    return mdxJsxAttributes
  }
  const regex = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g
  let match

  while ((match = regex.exec(meta)) !== null) {
    mdxJsxAttributes.push({
      type: 'mdxJsxAttribute',
      name: match[1],
      value: !match[2] && !match[3] && !match[4] ? 'true' : match[2] || match[3] || match[4],
    })
  }

  return mdxJsxAttributes
}

export const remarkMDXCodeMeta: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (index === undefined || parent === undefined) {
        return
      }
      parent.children[index] = {
        type: 'mdxJsxFlowElement',
        name: 'codeblock',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'language',
            value: node.lang,
          },
          ...parseMetaStringToMdxJsxAttributes(node.meta),
          {
            type: 'mdxJsxAttribute',
            name: 'children',
            value: node.value,
          },
        ],
        children: [],
      }
    })
  }
}
