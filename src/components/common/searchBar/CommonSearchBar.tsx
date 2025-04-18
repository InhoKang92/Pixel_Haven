import React, { useState } from 'react';
import styles from './CommonSearchBar.module.scss'
import { searchAtom } from '@/jotaiStore/primitiveAtoms/searchAtom';
import { pageAtom } from '@/jotaiStore/primitiveAtoms/pageAtom';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

function CommonSearchBar() {
  const navigate = useNavigate()
  const [searchKeyword, setSearchKeyword] = useState<string>("")
  const [search, setSearch] = useAtom(searchAtom)
  const [page, setPage] = useAtom(pageAtom)

  const saveKeyword = (event) => {
    setSearchKeyword(event.target.value)
  }

  const searchPhoto = () => {
    navigate('/')
    if(searchKeyword === ""){
      setSearch("Korea")
      setPage(1)
    } else {
      setSearch(searchKeyword)
      setPage(1)
    }
  }

  const enterSearch = (event: React.KeyboardEvent) => {
    if(event.key === "Enter"){
      searchPhoto()
    }
  }

  return (
    <div className={styles.searchBar}>
        <div className={styles.searchBar__search}>
            <input type="text" placeholder='Search Photos' className={styles.searchBar__search__input} onChange={saveKeyword} onKeyDown={enterSearch}/>
            <span className='material-symbols-outlined' onClick={searchPhoto} style={{ cursor: 'pointer', color: 'gray'}}>Search</span>
        </div>
    </div>
  )
}

export default CommonSearchBar