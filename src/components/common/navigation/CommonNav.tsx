import { useEffect, useState } from 'react'
import styles from './CommonNav.module.scss'
import navJson from './nav.json'
import { Link, useLocation } from 'react-router-dom'
import { useAtom } from 'jotai'
import { searchAtom } from '@/jotaiStore/primitiveAtoms/searchAtom'
import { pageAtom } from '@/jotaiStore/primitiveAtoms/pageAtom'

interface Navigation {
    index : number
    path : string
    label : string
    searchValue : string
    isActive: boolean
}

function CommonNav() {
    const location = useLocation()
    const [navigation, setNavigation] = useState<Navigation[]>(navJson)
    const [search, setSearch] = useAtom(searchAtom)
    const [page, setPage] = useAtom(pageAtom)

    useEffect(() => {
        navigation.forEach((nav:Navigation)=>{
            nav.isActive = false

            if(nav.path === location.pathname || location.pathname.includes(nav.path)){
                nav.isActive = true
                setSearch(nav.searchValue)
                setPage(1)
                setNavigation([...navigation])
            }
        })
    }, [location.pathname])

    const navLinks = navigation.map((item: Navigation) => {
        return (
            <Link to={item.path} key={item.path} className={item.isActive ? `${styles.nav__menu} ${styles.nav__active}` : `${styles.nav__menu}`}>
                <span className={styles.nav__menu__label}>{item.label}</span>
            </Link>
        ) 
    })
  return (
    <nav className={styles.nav}>
        {navLinks}
    </nav>
  )
}

export default CommonNav