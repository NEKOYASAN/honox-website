import type { Root } from 'mdast'
import type { Plugin } from 'unified'
import { is } from 'unist-util-is'
import { visit } from 'unist-util-visit'

const ghAlertRe = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)]/i

export const remarkMDXGitHubBlockquoteAlert: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'blockquote', (node, index, parent) => {
      if (index === undefined || parent === undefined) {
        return
      }
      if (is(node.children[0], 'paragraph') && is(node.children[0].children[0], 'text')) {
        const typeValue = ghAlertRe.exec(node.children[0].children[0].value)?.[1]
        if (typeValue) {
          node.children[0].children[0].value = node.children[0].children[0].value.replace(
            /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)](\r\n|\r|\n)/,
            ''
          )
          parent.children[index] = {
            type: 'mdxJsxFlowElement',
            name: 'alertannotation',
            attributes: [
              {
                type: 'mdxJsxAttribute',
                name: 'type',
                value: typeValue,
              },
            ],
            children: node.children,
          }
        }
      }
    })
  }
}
