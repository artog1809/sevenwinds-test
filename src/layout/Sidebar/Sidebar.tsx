import { ChevronDown, ChevronUp, TableCellsMerge } from 'lucide-react';
import styles from './Sidebar.module.scss'
import { useState } from 'react';

const elems = [
    { id: 1, name: 'По проекту' },
    { id: 2, name: 'Объекты' },
    { id: 3, name: 'Поручения' },
    { id: 4, name: 'Контрагенты' },
    { id: 5, name: 'РД' },
    { id: 6, name: 'МТО' },
    { id: 7, name: 'СМР' },
    { id: 8, name: 'График' },
    { id: 9, name: 'МиМ' },
    { id: 10, name: 'Рабочие' },
    { id: 11, name: 'Капвложения' },
    { id: 12, name: 'Бюджет' },
    { id: 13, name: 'Финансирование' },
    { id: 14, name: 'Панорамы' },
    { id: 15, name: 'Камеры' },
  ];

const Sidebar = () => {
    const [open, setOpen] = useState<boolean>(false)
    const toggleSidebar = () => {
        setOpen(!open);
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar_top}>
                <div className={styles.name}>
                    <div className={styles.name_top}>Название проекта</div>
                    <div className={styles.name_bot}>Аббревиатура</div>
                </div>
                {
                    open ? 
                    <ChevronUp onClick={toggleSidebar} size={24} color="white" />
                    :
                    <ChevronDown onClick={toggleSidebar} size={24} color="white" />
                }
            </div>
            {open && 
                <div className={styles.list}>
                {elems.map((el) => 
                    <div key={el.id} className={styles.list_elem}>
                        <TableCellsMerge size={24} color='white' />
                        <div className={styles.list_elem_name}>{el.name}</div>
                </div>
            )}
        </div>}
            
        </div>
    )
}

export default Sidebar;