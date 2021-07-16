const fs = require('fs')
const path = require('path')
const sanitizeHtml = require('sanitize-html')
const { createFileTree } = require('./lib')

Object.defineProperty(global.Element.prototype, 'innerText', {
  get () {
    return sanitizeHtml(this.textContent, {
      allowedTags: [],
      allowedAttributes: {}
    })
  },
  configurable: true
})

const loadDocumentFromFile = (file) => {
  document.body.innerHTML = fs.readFileSync(path.join(__dirname, '__tests__', 'fixtures', file))
}

test('Tree structure for empty DOM', () => {
  const tree = createFileTree()
  expect(tree).toMatchObject({
    count: 0,
    tree: {
      diffElements: [],
      list: [],
      nodeLabel: '/'
    }
  })
})

test('Tree structure for large PR', () => {
  loadDocumentFromFile('pr.html')
  const tree = createFileTree()
  expect(tree.count).toEqual(13)
  expect(tree).toMatchObject({
    tree: {
      nodeLabel: '/',
      list: [
        {
          nodeLabel: 'packages',
          list: [
            {
              nodeLabel: 'react/src',
              list: [
                {
                  nodeLabel: '__tests__',
                  list: [
                    {
                      nodeLabel: 'ReactElementJSX-test.internal.js',
                      list: [],
                      href: 'http://localhost/#diff-704a99ac64ff37ffb3c4ab785c086e0a',
                      hasComments: false,
                      isDeleted: null,
                      diffElement: expect.any(window.HTMLElement)
                    }
                  ],
                  href: null,
                  hasComments: false,
                  isDeleted: null,
                  diffElement: expect.any(window.HTMLElement)
                },
                {
                  nodeLabel: 'React.js',
                  list: [],
                  href: 'http://localhost/#diff-a9c08afc9ba1304a73e4235b3016b97c',
                  hasComments: false,
                  isDeleted: null,
                  diffElement: expect.any(window.HTMLElement)
                },
                {
                  nodeLabel: 'ReactElement.js',
                  list: [],
                  href: 'http://localhost/#diff-d917dafee00f70f932bbee5f65d6f2a0',
                  hasComments: false,
                  isDeleted: null,
                  diffElement: expect.any(window.HTMLElement)
                },
                {
                  nodeLabel: 'ReactElementValidator.js',
                  list: [],
                  href: 'http://localhost/#diff-e1ed11a9f728e656700a09c5e5b8421a',
                  hasComments: false,
                  isDeleted: null,
                  diffElement: expect.any(window.HTMLElement)
                }
              ],
              href: null,
              hasComments: false,
              isDeleted: null,
              diffElement: expect.any(window.HTMLElement)
            },
            {
              nodeLabel: 'shared',
              list: [
                {
                  nodeLabel: 'forks',
                  list: [
                    {
                      nodeLabel: 'ReactFeatureFlags.native-fb.js',
                      list: [],
                      href: 'http://localhost/#diff-5909cd216fb0ff82eee4189e8ef7b1f7',
                      hasComments: false,
                      isDeleted: null,
                      diffElement: expect.any(window.HTMLElement)
                    },
                    {
                      nodeLabel: 'ReactFeatureFlags.native-oss.js',
                      list: [],
                      href: 'http://localhost/#diff-67a3dce2da4d4c98b273a5ffbed4ecf3',
                      hasComments: false,
                      isDeleted: null,
                      diffElement: expect.any(window.HTMLElement)
                    },
                    {
                      nodeLabel: 'ReactFeatureFlags.new-scheduler.js',
                      list: [],
                      href: 'http://localhost/#diff-0acba6beb8dfb7ac3a890e04f9330672',
                      hasComments: false,
                      isDeleted: null,
                      diffElement: expect.any(window.HTMLElement)
                    },
                    {
                      nodeLabel: 'ReactFeatureFlags.persistent.js',
                      list: [],
                      href: 'http://localhost/#diff-59d412cdab2cee911e8048f2274d7714',
                      hasComments: false,
                      isDeleted: null,
                      diffElement: expect.any(window.HTMLElement)
                    },
                    {
                      nodeLabel: 'ReactFeatureFlags.test-renderer.js',
                      list: [],
                      href: 'http://localhost/#diff-ca01894737d09fe21db1236f67674978',
                      hasComments: false,
                      isDeleted: null,
                      diffElement: expect.any(window.HTMLElement)
                    },
                    {
                      nodeLabel: 'ReactFeatureFlags.test-renderer.www.js',
                      list: [],
                      href: 'http://localhost/#diff-b3f99b384357abacceae9c7f5babef83',
                      hasComments: false,
                      isDeleted: null,
                      diffElement: expect.any(window.HTMLElement)
                    },
                    {
                      nodeLabel: 'ReactFeatureFlags.www-new-scheduler.js',
                      list: [],
                      href: 'http://localhost/#diff-674daeb2e5d6f787b0acb4ad821fbc45',
                      hasComments: false,
                      isDeleted: null,
                      diffElement: expect.any(window.HTMLElement)
                    },
                    {
                      nodeLabel: 'ReactFeatureFlags.www.js',
                      list: [],
                      href: 'http://localhost/#diff-228079017fb840664ef2da2a2dfed166',
                      hasComments: false,
                      isDeleted: null,
                      diffElement: expect.any(window.HTMLElement)
                    }
                  ],
                  href: null,
                  hasComments: false,
                  isDeleted: null,
                  diffElement: expect.any(window.HTMLElement)
                },
                {
                  nodeLabel: 'ReactFeatureFlags.js',
                  list: [],
                  href: 'http://localhost/#diff-904ceabd8a1e9a07ab1d876d843d62e1',
                  hasComments: false,
                  isDeleted: null,
                  diffElement: expect.any(window.HTMLElement)
                }
              ],
              href: null,
              hasComments: false,
              isDeleted: null,
              diffElement: expect.any(window.HTMLElement)
            }
          ],
          href: null,
          hasComments: false,
          isDeleted: null,
          diffElement: expect.any(window.HTMLElement)
        }
      ],
      diffElements: expect.any(Array)
    },
    count: 13
  })
})

test('Tree structure for PR with deletion', () => {
  loadDocumentFromFile('pr_with_deletion.html')
  const { tree } = createFileTree()
  const deletedFile = tree
    .list[1]
    .list[0]
    .list[0]
    .list[0]
  expect(deletedFile).toMatchObject({
    nodeLabel: 'closure-plugin.js',
    isDeleted: true
  })
})

test('Tree structure for PR with comments', () => {
  loadDocumentFromFile('pr_with_comment.html')
  const { tree } = createFileTree()
  const deletedFile = tree
    .list[0]
    .list[0]
  expect(deletedFile).toMatchObject({
    nodeLabel: 'ReactMemo-test.internal.js',
    hasComments: true
  })
})
