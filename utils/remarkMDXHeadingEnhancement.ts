import { valueToEstree } from 'estree-util-value-to-estree'
import type { Root } from 'mdast'
import { toString } from 'mdast-util-to-string'
import type { Plugin } from 'unified'
import { define } from 'unist-util-mdx-define'
import { visit } from 'unist-util-visit'
import type { ToC } from '../app/global'

export const createToCTree = (headings: Omit<ToC, 'children'>[]): ToC[] => {
  const root = { depth: 0, value: '', id: '', children: [] }
  const parents: ToC[] = []
  let previous: ToC = root
  headings.forEach((heading) => {
    if (heading.depth > previous.depth) {
      if (previous.children === undefined) {
        previous.children = []
      }
      parents.push(previous)
    } else if (heading.depth < previous.depth) {
      while (parents[parents.length - 1].depth >= heading.depth) {
        parents.pop()
      }
    }
    parents[parents.length - 1].children?.push(heading)
    previous = heading
  })

  return root.children
}

export const remarkMDXHeadingEnhancement: Plugin<[], Root> = () => {
  return (tree, file) => {
    const headings: Omit<ToC, 'children'>[] = []

    visit(tree, 'heading', (node, index, parent) => {
      if (index === undefined || parent === undefined) {
        return
      }

      const nodeString = toString(node)
      const idMatch = nodeString.match(/#([^#]+)$/)
      let id = nodeString
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/ /g, '-')

      if (idMatch) {
        id = idMatch[1]
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9 ]/g, '')
          .replace(/ /g, '-')

        node.children.forEach((child) => {
          if (child.type === 'text' && child.value.includes(idMatch[0])) {
            child.value = child.value.replace(idMatch[0], '').trim()
          }
        })
      }
      node.data = node.data || {}
      node.data.hProperties = node.data.hProperties || {}
      node.data.hProperties.id = id
      node.data.hProperties.title = nodeString
      headings.push({
        depth: node.depth,
        value: toString(node),
        id,
      })
    })

    const tocTree = createToCTree(headings)
    define(
      tree,
      file,
      { tableOfContents: valueToEstree(tocTree, { preserveReferences: true }) },
      {
        export: 'module',
      }
    )
  }
}
