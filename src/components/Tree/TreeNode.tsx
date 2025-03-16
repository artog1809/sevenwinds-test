import React, { useState } from 'react'
import { File, Plus, Trash2 } from 'lucide-react'
import { TreeNode as TreeNodeType } from './types'
import styles from './Tree.module.scss'

interface TreeNodeProps {
  node: TreeNodeType
  level: number
  add: (id: number) => void
  del: (id: number) => void
  edit: (id: number, name: string) => void
  save: (id: number) => void
  editingNodeId: number | null
  inputValue: string
  inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, id: number) => void
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level,
  add,
  del,
  edit,
  save,
  editingNodeId,
  inputValue,
  inputChange,
  inputKeyDown,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <div className={styles.main_content_row}>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={styles.main_content_row_btn}
          style={{ paddingLeft: `${level * 20}px` }}
        >
          {!isHovered ? (
            <File size={16} />
          ) : (
            <div className={styles.main_content_row_actions}>
              <button
                onClick={() => add(node.id)}
                className={styles.main_content_row_btn}
                title="Добавить"
              >
                <Plus size={16} />
              </button>
              <button
                onClick={() => del(node.id)}
                className={styles.main_content_row_btn}
                title="Удалить"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        {editingNodeId === node.id ? (
          <input
            className={styles.main_content_row_input}
            value={inputValue}
            onChange={inputChange}
            onKeyDown={(e) => inputKeyDown(e, node.id)}
            autoFocus
          />
        ) : (
          <span
            onClick={() => edit(node.id, node.name)}
            className={styles.main_content_row_title}
          >
            {node.name}
          </span>
        )}

        <span>—</span>
        <span>—</span>
        <span>—</span>
        <span>—</span>
      </div>

      {node.children && node.children.length > 0 && (
        node.children.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            level={level + 1}
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
      )}
    </>
  )
}

export default TreeNode
