import React from 'react'
import TreeNode from './TreeNode'
import { Row } from '../../features/row/types'

interface TreeProps {
  rows: Row[]
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
  rows,
  add,
  del,
  edit,
  save,
  editingNodeId,
  inputValue,
  inputChange,
  inputKeyDown,
}) => {
  const renderTree = (nodes: Row[], level = 0) => {
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

  return <>{renderTree(rows)}</>
}

export default Tree
