import Header from './Header/Header';
import styles from './Layout.module.scss'
import Sidebar from './Sidebar/Sidebar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {

    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.main_content}>
                <Sidebar />
                {children}
            </div>
        </div>
    )
}

export default Layout;