import { useNavigate } from 'react-router-dom'
import styles from './CommonHeader.module.scss'
import { useAtom } from 'jotai'
import { searchAtom } from '@/jotaiStore/primitiveAtoms/searchAtom'
import { pageAtom } from '@/jotaiStore/primitiveAtoms/pageAtom'

function CommonHeader() {
  const navigate = useNavigate()
  const [search, setSearch] = useAtom(searchAtom)
  const [page, setPage] = useAtom(pageAtom)
  const moveToMainPage = () => {
    setSearch("Korea")
    setPage(1)
    navigate('/')
  }
  return (
    <header className={styles.header}>
        <div className={styles.header__logoBox} onClick={moveToMainPage}>
            <span className={styles.header__logoBox__title}>PIXEL</span>
            <div className={styles.header__logoBox__logo}>
              <img src="/src/assets/images/logo.png" alt="" className={styles.logo} />
            </div>
            <span className={styles.header__logoBox__title}>HAVEN</span>
        </div>
    </header>
  )
}

export default CommonHeader