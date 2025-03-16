import React from 'react'
import { TreeNode as TreeNodeType } from './types'
import TreeNode from './TreeNode'

interface TreeProps {
  nodes: TreeNodeType[]
  add: (id: number) => void
  del: (id: number) => void
  edit: (id: number, name: string) => void
  save: (id: number) => void
  editingNodeId: number | null
  inputValue: string
  inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, id: number) => void
}

const Tree: React.FC<TreeProps> = ({
  nodes,
  add,
  del,
  edit,
  save,
  editingNodeId,
  inputValue,
  inputChange,
  inputKeyDown,
}) => {
  const renderTree = (nodes: TreeNodeType[], level = 0) => {
    return nodes.map((node) => (
      <TreeNode
        key={node.id}
        node={node}
        level={level}
        add={add}
        del={del}
        edit={edit}
        save={save}
        editingNodeId={editingNodeId}
        inputValue={inputValue}
        inputChange={inputChange}
        inputKeyDown={inputKeyDown}
      />
    ))
  }

  return <>{renderTree(nodes)}</>
}

export default Tree
