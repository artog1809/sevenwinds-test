import React, { useState, useCallback, FC, ChangeEvent, KeyboardEvent } from 'react'
import styles from './Main.module.scss'
import { Column } from '../Tree/types' // Здесь теперь не нужен тип TreeNode, только Column
import Tree from '../Tree/Tree'
import { useGetRowListQuery } from '../../features/row/api'
import { Row } from '../../features/row/types'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const cols: Column[] = [
  { id: 0, title: 'Уровень' },
  { id: 1, title: 'Наименование работ' },
  { id: 2, title: 'Основная з/п' },
  { id: 3, title: 'Оборудование' },
  { id: 4, title: 'Накладные расходы' },
  { id: 5, title: 'Сметная прибыль' },
]

const initialTree: Row[] = [
    {
      id: 1,
      rowName: 'Root Node',
      child: [],
      salary: 0,
      equipmentCosts: 0,
      estimatedProfit: 0,
      mainCosts: 0,
      materials: 0,
      mimExploitation: 0,
      overheads: 0,
      parentId: null,
      supportCosts: 0,
      machineOperatorSalary: 0,
    },
  ];


const Main: FC = () => {
  const {isLoading, isError } = useGetRowListQuery()
  const { rowList } = useSelector((state: RootState) => state.row)
  const [editingNodeId, setEditingNodeId] = useState<number | null>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [tree, setTree] = useState(initialTree);

  const addNode = useCallback((rows: Row[], parentId: number | null): Row[] => {
    return rows.map((row) => {
      if (row.id === parentId) {
        const newId = Date.now();
        const newNode: Row = {  
          id: newId,
          rowName: `Новый элемент ${newId}`,
          child: [],  
          salary: 0,
          equipmentCosts: 0,
          estimatedProfit: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          overheads: 0,
          parentId: parentId,
          supportCosts: 0,
          machineOperatorSalary: 0,
        };
        return {
          ...row,
          child: [...row.child, newNode],  
        };
      } else if (row.child.length) {
        return {
          ...row,
          child: addNode(row.child, parentId),  
        };
      }
      return row;
    });
  }, []);
  
  
  const deleteNode = useCallback((rows: Row[], nodeId: number): Row[] => {
    return rows
      .filter((row) => row.id !== nodeId)
      .map((row) => ({
        ...row,
        child: deleteNode(row.child, nodeId),
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
    const updateName = (rows: Row[]): Row[] =>
      rows.map((row) => {
        if (row.id === id) {
          return { ...row, rowName: inputValue }
        } else if (row.child.length) {
          return { ...row, child: updateName(row.child) }
        }
        return row
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading data</div>
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
          rows={rowList}  
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
