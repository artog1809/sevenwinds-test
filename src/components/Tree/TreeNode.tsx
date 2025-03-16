import React, { useState } from 'react';
import { File, Plus, Trash2 } from 'lucide-react';
import styles from './Tree.module.scss';
import { Row } from '../../features/row/types';

interface TreeNodeProps {
  node: Row;
  level: number;
  add: (id: number) => void;
  del: (id: number) => void;
  edit: (id: number, column: string, value: string) => void;  // Modified to accept column name and value
  save: (id: number) => void;
  editingNodeId: number | null;
  editingColumn: string | null;  // Keep track of which column is being edited
  inputValue: string;
  inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, id: number) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level,
  add,
  del,
  edit,
  save,
  editingNodeId,
  editingColumn,
  inputValue,
  inputChange,
  inputKeyDown,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleEdit = (id: number, column: string, value: string) => {
    edit(id, column, value);  // Edit now takes column name and value
  };

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
              >
                <Plus size={16} />
              </button>
              <button
                onClick={() => del(node.id)}
                className={styles.main_content_row_btn}
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Editable column logic */}
        {editingNodeId === node.id && editingColumn === 'rowName' ? (
          <input
            className={styles.main_content_row_input}
            value={inputValue}
            onChange={inputChange}
            onKeyDown={(e) => inputKeyDown(e, node.id)}
            autoFocus
          />
        ) : (
          <span
            onClick={() => handleEdit(node.id, 'rowName', node.rowName)}  // Editable for rowName
            className={styles.main_content_row_title}
          >
            {node.rowName}
          </span>
        )}

        {editingNodeId === node.id && editingColumn === 'salary' ? (
          <input
            className={styles.main_content_row_input}
            value={inputValue}
            onChange={inputChange}
            onKeyDown={(e) => inputKeyDown(e, node.id)}
            autoFocus
          />
        ) : (
          <span
            onClick={() => handleEdit(node.id, 'salary', String(node.salary))}  // Editable for salary
            className={styles.main_content_row_title}
          >
            {node.salary}
          </span>
        )}

        {editingNodeId === node.id && editingColumn === 'equipmentCosts' ? (
          <input
            className={styles.main_content_row_input}
            value={inputValue}
            onChange={inputChange}
            onKeyDown={(e) => inputKeyDown(e, node.id)}
            autoFocus
          />
        ) : (
          <span
            onClick={() => handleEdit(node.id, 'equipmentCosts', String(node.equipmentCosts))}  // Editable for equipmentCosts
            className={styles.main_content_row_title}
          >
            {node.equipmentCosts}
          </span>
        )}

        {editingNodeId === node.id && editingColumn === 'overheads' ? (
          <input
            className={styles.main_content_row_input}
            value={inputValue}
            onChange={inputChange}
            onKeyDown={(e) => inputKeyDown(e, node.id)}
            autoFocus
          />
        ) : (
          <span
            onClick={() => handleEdit(node.id, 'overheads', String(node.overheads))}  // Editable for overheads
            className={styles.main_content_row_title}
          >
            {node.overheads}
          </span>
        )}

        {editingNodeId === node.id && editingColumn === 'estimatedProfit' ? (
          <input
            className={styles.main_content_row_input}
            value={inputValue}
            onChange={inputChange}
            onKeyDown={(e) => inputKeyDown(e, node.id)}
            autoFocus
          />
        ) : (
          <span
            onClick={() => handleEdit(node.id, 'estimatedProfit', String(node.estimatedProfit))}  // Editable for estimatedProfit
            className={styles.main_content_row_title}
          >
            {node.estimatedProfit}
          </span>
        )}
      </div>

      {node.child && node.child.length > 0 && (
        node.child.map((el) => (
          <TreeNode
            key={el.id}
            node={el}
            level={level + 1}
            add={add}
            del={del}
            edit={edit}
            save={save}
            editingNodeId={editingNodeId}
            editingColumn={editingColumn}
            inputValue={inputValue}
            inputChange={inputChange}
            inputKeyDown={inputKeyDown}
          />
        ))
      )}
    </>
  );
};

export default TreeNode;
