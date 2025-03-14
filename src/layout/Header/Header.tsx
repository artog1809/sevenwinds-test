import { ArrowBigLeft, Grip } from 'lucide-react';
import styles from './Header.module.scss'
import { useState } from 'react';


const Header = () => {
    const [selected, setSelected] = useState<'view' | 'manage'>('view')

    return (
        <div className={styles.header}>
            <div className={styles.actions}>
                <Grip size={24} color='#A1A1AA' />
                <ArrowBigLeft size={24} color='#A1A1AA' />
            </div>
            <div className={styles.views}>
                <div onClick={() => setSelected('view')} className={selected==='view' ? styles.active_view : styles.view}>Просмотр</div>
                <div onClick={() => setSelected('manage')} className={selected==='manage' ? styles.active_view : styles.view}>Управление</div>
            </div>
        </div>
    )
}

export default Header;