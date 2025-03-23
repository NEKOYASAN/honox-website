import { expect } from 'vitest'
import { createToCTree } from './remarkMDXHeadingEnhancement'

describe('createToCTree', () => {
  it('should create a tree of headings', () => {
    const headings = [
      { value: 'Heading 1', depth: 1, id: 'heading-1' },
      { value: 'Heading 1.2', depth: 2, id: 'heading-1-2' },
      { value: 'Heading 1.2.3', depth: 3, id: 'heading-1-2-3' },
      { value: 'Heading 2', depth: 1, id: 'heading-2' },
      { value: 'Heading 2.1', depth: 2, id: 'heading-2-1' },
      { value: 'Heading 2.1.1', depth: 3, id: 'heading-2-1-1' },
      { value: 'Heading 2.1.1.1', depth: 4, id: 'heading-2-1-1-1' },
      { value: 'Heading 2.1.1.1.1', depth: 5, id: 'heading-2-1-1-1-1' },
      { value: 'Heading 2.1.1.2', depth: 4, id: 'heading-2-1-1-2' },
      { value: 'Heading 2.1.1.2.1', depth: 5, id: 'heading-2-1-1-2-1' },
      { value: 'Heading 2.1.1.2.1.1', depth: 6, id: 'heading-2-1-1-2-1-1' },
      { value: 'Heading 2.2', depth: 2, id: 'heading-2-2' },
      { value: 'Heading 2.2.1', depth: 3, id: 'heading-2-2-1' },
      { value: 'Heading 2.3', depth: 2, id: 'heading-2-3' },
    ]
    const tree = createToCTree(headings)
    expect(tree).toStrictEqual([
      {
        value: 'Heading 1',
        depth: 1,
        id: 'heading-1',
        children: [
          {
            value: 'Heading 1.2',
            depth: 2,
            id: 'heading-1-2',
            children: [
              {
                value: 'Heading 1.2.3',
                depth: 3,
                id: 'heading-1-2-3',
              },
            ],
          },
        ],
      },
      {
        value: 'Heading 2',
        depth: 1,
        id: 'heading-2',
        children: [
          {
            value: 'Heading 2.1',
            depth: 2,
            id: 'heading-2-1',
            children: [
              {
                value: 'Heading 2.1.1',
                depth: 3,
                id: 'heading-2-1-1',
                children: [
                  {
                    value: 'Heading 2.1.1.1',
                    depth: 4,
                    id: 'heading-2-1-1-1',
                    children: [
                      {
                        value: 'Heading 2.1.1.1.1',
                        depth: 5,
                        id: 'heading-2-1-1-1-1',
                      },
                    ],
                  },
                  {
                    value: 'Heading 2.1.1.2',
                    depth: 4,
                    id: 'heading-2-1-1-2',
                    children: [
                      {
                        value: 'Heading 2.1.1.2.1',
                        depth: 5,
                        id: 'heading-2-1-1-2-1',
                        children: [
                          {
                            value: 'Heading 2.1.1.2.1.1',
                            depth: 6,
                            id: 'heading-2-1-1-2-1-1',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            value: 'Heading 2.2',
            depth: 2,
            id: 'heading-2-2',
            children: [
              {
                value: 'Heading 2.2.1',
                depth: 3,
                id: 'heading-2-2-1',
              },
            ],
          },
          {
            value: 'Heading 2.3',
            depth: 2,
            id: 'heading-2-3',
          },
        ],
      },
    ])
  })
})
