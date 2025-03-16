import React, { useState, useCallback, FC, ChangeEvent, KeyboardEvent } from 'react'
import styles from './Main.module.scss'
import { Column, TreeNode } from '../Tree/types'
import Tree from '../Tree/Tree'

const cols: Column[] = [
  { id: 0, title: 'Уровень' },
  { id: 1, title: 'Наименование работ' },
  { id: 2, title: 'Основная з/п' },
  { id: 3, title: 'Оборудование' },
  { id: 4, title: 'Накладные расходы' },
  { id: 5, title: 'Сметная прибыль' },
]

const initialTree: TreeNode[] = [
  {
    id: 1,
    name: 'Южная строительная площадка',
    children: [
      {
        id: 2,
        name: 'Фундаментальные работы',
        children: [
          { id: 3, name: 'Статья работы № 1', children: [] },
          { id: 4, name: 'Статья работы № 2', children: [] },
        ],
      },
    ],
  },
]

const Main: FC = () => {
  const [tree, setTree] = useState<TreeNode[]>(initialTree)
  const [editingNodeId, setEditingNodeId] = useState<number | null>(null)
  const [inputValue, setInputValue] = useState<string>('')

  const addNode = useCallback((nodes: TreeNode[], parentId: number): TreeNode[] => {
    return nodes.map((node) => {
      if (node.id === parentId) {
        const newId = Date.now()
        const newNode: TreeNode = {
          id: newId,
          name: `Новый элемент ${newId}`,
          children: [],
        }
        return {
          ...node,
          children: [...node.children, newNode],
        }
      } else if (node.children.length) {
        return {
          ...node,
          children: addNode(node.children, parentId),
        }
      }
      return node
    })
  }, [])

  const deleteNode = useCallback((nodes: TreeNode[], nodeId: number): TreeNode[] => {
    return nodes
      .filter((node) => node.id !== nodeId)
      .map((node) => ({
        ...node,
        children: deleteNode(node.children, nodeId),
      }))
  }, [])

  const add = (id: number) => {
    setTree((prevTree) => addNode(prevTree, id))
  }

  const del = (id: number) => {
    setTree((prevTree) => deleteNode(prevTree, id))
  }

  const edit = (id: number, name: string) => {
    setEditingNodeId(id)
    setInputValue(name)
  }

  const save = (id: number) => {
    const updateName = (nodes: TreeNode[]): TreeNode[] =>
      nodes.map((node) => {
        if (node.id === id) {
          return { ...node, name: inputValue }
        } else if (node.children.length) {
          return { ...node, children: updateName(node.children) }
        }
        return node
      })

    setTree((prevTree) => updateName(prevTree))
    setEditingNodeId(null)
  }

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const inputKeyDown = (e: KeyboardEvent<HTMLInputElement>, id: number) => {
    if (e.key === 'Enter') {
      save(id)
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.main_top}>
        <span>Строительно-монтажные работы</span>
      </div>

      <div className={styles.main_content}>
        <div className={`${styles.main_content_head} ${styles.main_content_row}`}>
          {cols.map((el) => (
            <span key={el.id}>{el.title}</span>
          ))}
        </div>

        <Tree
            nodes={tree}
            add={add}
            del={del}
            edit={edit}
            save={save}
            editingNodeId={editingNodeId}
            inputValue={inputValue}
            inputChange={inputChange}
            inputKeyDown={inputKeyDown}
        />
      </div>
    </div>
  )
}

export default Main
