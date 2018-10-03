export const folderConcat = (node) => {
    // file or empty
  if (node.list === undefined || node.list.length === 0 || (node.href !== null && node.href !== undefined)) {
    return node
  }

  if (node.list.length === 1) {
    let collapsed = folderConcat(node.list[0])
        // if the last collapsed thing is a folder merge into one.
    if (collapsed.href === null || collapsed.href === undefined) {
      node.nodeLabel = node.nodeLabel + '/' + collapsed.nodeLabel
      node.hasComments = collapsed.hasComments || node.hasComments
      node.list = collapsed.list
    }
    return node
  }
  node.list.map(x => folderConcat(x))
  return node
}
