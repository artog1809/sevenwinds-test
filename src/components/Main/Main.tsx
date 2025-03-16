import React, { useState, useEffect, useCallback, FC, ChangeEvent, KeyboardEvent } from 'react';
import styles from './Main.module.scss';
import { Column } from '../Tree/types'; 
import Tree from '../Tree/Tree';
import { useCreateRowMutation, useDeleteRowMutation, useGetRowListQuery, useUpdateRowMutation } from '../../features/row/api';
import { Row } from '../../features/row/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const cols: Column[] = [
  { id: 0, title: 'Уровень' },
  { id: 1, title: 'Наименование работ' },
  { id: 2, title: 'Основная з/п' },
  { id: 3, title: 'Оборудование' },
  { id: 4, title: 'Накладные расходы' },
  { id: 5, title: 'Сметная прибыль' },
];

const Main: FC = () => {
    const { isLoading, isError } = useGetRowListQuery();
    const { rowList } = useSelector((state: RootState) => state.row);
    const [create] = useCreateRowMutation();
    const [update] = useUpdateRowMutation();
    const [deleteRow] = useDeleteRowMutation();
    const [editingNodeId, setEditingNodeId] = useState<number | null>(null);
    const [editingColumn, setEditingColumn] = useState<string>('')
    const [inputValue, setInputValue] = useState<string>('');
    const [tree, setTree] = useState<Row[]>([]);

    const addNode = useCallback(async (rows: Row[], parentId: number | null): Promise<Row[]> => {
        const updatedRows = await Promise.all(rows.map(async (row) => {
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
                await create(newNode);
                return {
                    ...row,
                    child: [...row.child, newNode],
                };
            } else if (row.child.length) {
                return {
                    ...row,
                    child: await addNode(row.child, parentId), 
                };
            }
            return row;
        }));
        return updatedRows;
    }, []);
    
    const deleteNode = useCallback((rows: Row[], nodeId: number): Row[] => {
        return rows
            .filter((row) => row.id !== nodeId)
            .map((row) => ({
                ...row,
                child: deleteNode(row.child, nodeId),
            }));
    }, []);

    const add = async (id: number) => {
        const updatedTree = await addNode(tree, id); 
        setTree(updatedTree); 
    };
    
    const del = async (id: number) => {
        await deleteRow({id: id})
        setTree((prevTree) => deleteNode(prevTree, id));
    };

    const edit = (id: number, column: string, value: string) => {
        setEditingNodeId(id);
        setEditingColumn(column);  
        setInputValue(value);
    };
    
    const save = (id: number) => {
        const updateNode = (rows: Row[]): Row[] =>
          rows.map((row) => {
            if (row.id === id) {
              const updatedRow = { ...row, [editingColumn]: inputValue };
              update(updatedRow);
              return updatedRow;  
            } else if (row.child.length) {
              return { ...row, child: updateNode(row.child) };
            }
            return row;
          });
      
        setTree((prevTree) => updateNode(prevTree));
        setEditingNodeId(null);
        setEditingColumn('');  
      };
      

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const inputKeyDown = (e: KeyboardEvent<HTMLInputElement>, id: number) => {
        if (e.key === 'Enter') {
            save(id);
        }
    };

    useEffect(() => {
        if (rowList.length === 0) {
            const defaultTreeNode: Row = {
            id: Date.now(),
            rowName: '',
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
            };
            setTree([defaultTreeNode]);  
        } else {
            setTree(rowList);  
        }
    }, [rowList]);

    if (isLoading) {
    return <div>Loading...</div>;
    }

    if (isError) {
    return <div>Error loading data</div>;
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
            rows={tree}  
            add={add}
            del={del}
            edit={edit}
            save={save}
            editingColumn={editingColumn}
            editingNodeId={editingNodeId}
            inputValue={inputValue}
            inputChange={inputChange}
            inputKeyDown={inputKeyDown}
        />
        </div>
    </div>
    );
};

export default Main;
